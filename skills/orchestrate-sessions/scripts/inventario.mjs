import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { executavel, FORNECEDORES, pastaBase, PRINCIPAL } from "./fornecedores.mjs";

const ESTADOS_PORTAL = ["ligado", "indisponivel", "ausente"];
const ESTADOS_MODELO = ["disponivel", "indisponivel", "por-verificar"];
const ACESSOS = ["subscricao", "api", "local"];
const FUNCOES = ["planeador", "executor", "verificador"];
export const ID_FORNECEDOR = /^[a-z0-9][a-z0-9-]{0,39}$/;
const ID_CONTA = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/;
const ID_MODELO = /^[a-zA-Z0-9][a-zA-Z0-9._:+/@-]{0,159}$/;
const texto = (valor, max = 160) =>
  typeof valor === "string" && valor.length > 0 && valor.length <= max && !/[\p{Cc}]/u.test(valor);

export const chaveModelo = ({ fornecedor, conta, acesso, modelo }) =>
  JSON.stringify([fornecedor, acesso, conta, modelo]);

export function normalizarModelo(item) {
  if (
    typeof item?.fornecedor !== "string" || !ID_FORNECEDOR.test(item.fornecedor) ||
    typeof item.conta !== "string" || !ID_CONTA.test(item.conta) ||
    !texto(item.ligacao) || !ACESSOS.includes(item.acesso) ||
    (item.modelo !== null && !texto(item.modelo)) || !ESTADOS_MODELO.includes(item.estado) ||
    !Array.isArray(item.capacidades)
  ) return null;
  return {
    fornecedor: item.fornecedor,
    conta: item.conta,
    ligacao: item.ligacao,
    acesso: item.acesso,
    modelo: item.modelo,
    estado: item.estado,
    ...(texto(item.motivo, 500) ? { motivo: item.motivo } : {}),
    capacidades: [...new Set(item.capacidades.filter((capacidade) => texto(capacidade, 50)))],
  };
}

export function normalizarInventario(inventario) {
  const portal = inventario?.portal;
  if (inventario?.versao !== 1 || !ESTADOS_PORTAL.includes(portal?.estado) ||
      !Array.isArray(inventario.modelos)) return null;
  const modelos = new Map();
  for (const item of inventario.modelos) {
    const modelo = normalizarModelo(item);
    if (modelo) modelos.set(chaveModelo(modelo), modelo);
  }
  return {
    versao: 1,
    portal: {
      estado: portal.estado,
      ...(texto(portal.maquina) ? { maquina: portal.maquina } : {}),
      // O nome da máquina e o motivo do estado, para a pergunta os mostrar (o id é um UUID, não se mostra).
      ...(texto(portal.nome, 120) ? { nome: portal.nome } : {}),
      ...(texto(portal.motivo, 300) ? { motivo: portal.motivo } : {}),
    },
    modelos: [...modelos.values()],
  };
}

export function inventarioDoAgente({ caminho, soLocal, env = process.env, executar = execFileSync }) {
  const configurado = caminho || env.CID_AGENTE;
  const agente = configurado ? resolve(configurado) : join(pastaBase(env), "cid", "agente", "agente.mjs");
  if (!existsSync(agente)) return { inventario: null, agente: null, estado: configurado ? "indisponivel" : "ausente" };
  try {
    const resposta = executar(process.execPath, [agente, "orquestracao", "inventario", ...(soLocal ? ["--local"] : [])], {
      encoding: "utf8",
      timeout: 25_000,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
      env,
    });
    const inventario = normalizarInventario(JSON.parse(resposta));
    if (inventario) return { inventario, agente, estado: inventario.portal.estado };
  } catch {
    // Uma versão anterior do agente ou uma falha no sinal deixa a descoberta local disponível.
  }
  return { inventario: null, agente: null, estado: "indisponivel" };
}

async function modelosOllama(pedir) {
  try {
    const r = await pedir("http://127.0.0.1:11434/api/tags", {
      redirect: "error",
      signal: AbortSignal.timeout(1_500),
    });
    if (r.ok) {
      const dados = await r.json();
      if (Array.isArray(dados?.models))
        return dados.models.flatMap((modelo) => texto(modelo?.name) ? [{
          fornecedor: "ollama", conta: "local", ligacao: "Ollama deste PC", acesso: "local",
          modelo: modelo.name, estado: "disponivel", capacidades: ["manual", "planeador", "verificador"],
        }] : []);
    }
  } catch {
    // O Ollama pode estar ausente ou parado.
  }
  return [];
}

function perfisLocais(env) {
  return Object.entries(FORNECEDORES).filter(([id]) => id !== "local").flatMap(([fornecedor, adaptador]) => {
    const comando = executavel(adaptador, env);
    const existe = comando !== adaptador.comando && existsSync(comando);
    const registadas = adaptador.contas(env);
    const contas = existe ? [{ id: PRINCIPAL, nome: "Principal" }, ...registadas] : registadas;
    return contas.map((conta) => ({
      fornecedor, conta: conta.id, ligacao: conta.nome, acesso: adaptador.variavelConta ? "subscricao" : "api", modelo: null,
      estado: existe ? "por-verificar" : "indisponivel",
      motivo: existe ? "Perfis encontrados no PC. Confirma o login e o modelo escolhido." : "Ferramenta indisponível neste PC.",
      capacidades: [],
    }));
  });
}

export function validarModeloManual(fornecedor, conta, acesso, modelo) {
  if (!ID_FORNECEDOR.test(fornecedor) || !ID_CONTA.test(conta) ||
      !ACESSOS.includes(acesso) || !ID_MODELO.test(modelo)) return null;
  return {
    fornecedor, conta, ligacao: conta, acesso, modelo, estado: "disponivel",
    capacidades: ["manual", ...FUNCOES],
  };
}

export async function obterInventario({
  caminho, soLocal = false, manuais = [], env = process.env,
  lerAgente = inventarioDoAgente, pedir = fetch,
} = {}) {
  const resultado = lerAgente({ caminho, soLocal, env });
  const inventario = resultado.inventario ?? {
    versao: 1,
    portal: { estado: soLocal ? "ausente" : resultado.estado },
    modelos: [...perfisLocais(env), ...await modelosOllama(pedir)],
  };
  const modelos = new Map(inventario.modelos.map((modelo) => [chaveModelo(modelo), modelo]));
  for (const modelo of manuais) {
    const chave = chaveModelo(modelo);
    if (!modelos.has(chave)) {
      const perfil = modelos.get(chaveModelo({ ...modelo, modelo: null }));
      modelos.set(chave, { ...modelo, ligacao: perfil?.ligacao ?? modelo.ligacao });
    }
  }
  return {
    ...inventario,
    origem: soLocal || inventario.portal.estado !== "ligado" ? "local" : "ligacoes",
    agente: resultado.agente,
    modelos: [...modelos.values()],
  };
}

' Corre o retomar.mjs sem abrir janela. E este ficheiro que o Agendador de Tarefas chama (ver agendar-retoma.mjs).
' Uso: wscript.exe retomar.vbs <caminho do node.exe> <argumentos do retomar.mjs>
Dim fso, pasta, linha, i
Set fso = CreateObject("Scripting.FileSystemObject")
pasta = fso.GetParentFolderName(WScript.ScriptFullName)
linha = """" & WScript.Arguments(0) & """ """ & pasta & "\retomar.mjs"""
For i = 1 To WScript.Arguments.Count - 1
  linha = linha & " """ & WScript.Arguments(i) & """"
Next
CreateObject("WScript.Shell").Run linha, 0, False

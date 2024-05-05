import * as vscode from "vscode";

const dc = vscode.Uri.file('E:/GITSPACE/vscodeExtensionWorkSpace/vscode-decoration/src/icons8-heart-14.png');

const showIconStyle = vscode.window.createTextEditorDecorationType({
  after: {
    contentIconPath:dc,
  },
});



function showIcon(editor: vscode.TextEditor, line: number) {
  const sourceCode = editor.document.getText();

  const decorationsArray: vscode.DecorationOptions[] = [];

  const sourceCodeArr = sourceCode.split("\n");

  const codeLine = sourceCodeArr[line];

  const range = new vscode.Range(
    new vscode.Position(line, codeLine.length),
    new vscode.Position(line, codeLine.length+2)
  );

  const decoration = { range };

  decorationsArray.push(decoration);

  editor.setDecorations(showIconStyle, decorationsArray);
}

export default showIcon;

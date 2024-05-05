import * as vscode from 'vscode';

const decorationType = vscode.window.createTextEditorDecorationType({
	backgroundColor: 'green',
	border: '2px solid white',
});


function decorate(editor: vscode.TextEditor) {
	const sourceCode = editor.document.getText();
	const regex = /(console\.log)/;

	const decorationsArray: vscode.DecorationOptions[] = [];

	const sourceCodeArr = sourceCode.split('\n');

	for (let line = 0; line < sourceCodeArr.length; line++) {
		const match = sourceCodeArr[line].match(regex);

		if (match !== null && match.index !== undefined) {
			const range = new vscode.Range(
				new vscode.Position(line, match.index),
				new vscode.Position(line, match.index + match[1].length)
			);

			const decoration = { range };

			decorationsArray.push(decoration);
		}
	}

	editor.setDecorations(decorationType, decorationsArray);
}

export default decorate;
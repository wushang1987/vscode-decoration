// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
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

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World5!');
	});

	context.subscriptions.push(disposable);

	vscode.workspace.onWillSaveTextDocument(event => {
		const openEditor = vscode.window.visibleTextEditors.filter(
			editor => editor.document.uri === event.document.uri
		)[0];
		decorate(openEditor);
	});

}


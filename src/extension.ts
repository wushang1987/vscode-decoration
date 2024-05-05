import * as vscode from 'vscode';
import decorate from './decorate';
import showIcon from './showIcon';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World5!');
	});
	context.subscriptions.push(disposable);

	vscode.workspace.onWillSaveTextDocument(event => {
		const openEditor = vscode.window.visibleTextEditors.filter(
			editor => {
				console.log(event.document.uri);	
				vscode.window.showInformationMessage("c"+event.document.uri);
				return editor.document.uri === event.document.uri;
			}
		)[0];
		decorate(openEditor);
	});

	const disposable2 = vscode.commands.registerCommand('extension.rowClicked', () => {
        // Handle row click event
        vscode.window.showInformationMessage('Row clicked!');
    });

	const editor = vscode.window.activeTextEditor;
    if (editor) {
        const disposable3 = vscode.window.onDidChangeTextEditorSelection(event => {
            // Check if cursor position is on a specific row
            const position = editor.selection.active;
            const lineNumber = position.line;
			showIcon(editor,lineNumber);
            if (lineNumber === 5) { // Example: row number 5
                vscode.commands.executeCommand('extension.rowClicked');
            }

			
        });
        context.subscriptions.push(disposable3);
    }
}


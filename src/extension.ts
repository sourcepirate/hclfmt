'use strict';
import * as vscode from 'vscode';
import { HclClient } from './hclClient';

export function activate(context: vscode.ExtensionContext) {

    let config = vscode.workspace.getConfiguration('hclfmt');
    let client = new HclClient(config);
    let formatDoc = (doc: vscode.TextDocument) => {
        client.formatFile(doc.fileName).catch((err) => {
            vscode.window.showErrorMessage("hclfmt: error " + err);
        });
    };

    vscode.workspace.onDidSaveTextDocument(formatDoc);

    let disposable = vscode.commands.registerCommand('extension.hclfmt', () => {
        // get the current active document and 
        // and apply the formater now.
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            formatDoc(editor.document);
        }
    });

    // apply the format operation on save event.

    context.subscriptions.push(disposable);
}

export function deactivate() {
}
'use strict';
import * as vscode from 'vscode';
import {HclClient} from './hclClient';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('extension.hclfmt', () => {
        let config = vscode.workspace.getConfiguration('hclfmt');
        let client = new HclClient(config);
        // get the current active document and 
        // and apply the formater now.
        let editor = vscode.window.activeTextEditor;
        if(editor){
            let doc : vscode.TextDocument = editor.document;
            client.formatFile(doc.fileName).then((success) => {
                vscode.window.showInformationMessage("Format success!!");
            }).catch((err) => {
                vscode.window.showInformationMessage("Format Failed!");
            })
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}
'use strict';
import * as vscode from 'vscode';
import {HclClient} from './hclClient';

export function activate(context: vscode.ExtensionContext) {

    let config = vscode.workspace.getConfiguration('hclfmt');
    let client = new HclClient(config);

    let disposable = vscode.commands.registerCommand('extension.hclfmt', () => {
        
        // get the current active document and 
        // and apply the formater now.
        let editor = vscode.window.activeTextEditor;
        if(editor){
            let doc : vscode.TextDocument = editor.document;
            client.formatFile(doc.fileName).then((success) => {
                vscode.window.showInformationMessage("Format success!!");
            }).catch((err) => {
                vscode.window.showInformationMessage("Format Failed!!");
            })
        }
    });

    // apply the format operation on save event.
    let saveDisposer = vscode.commands.registerCommand('extension.executeOnSave', () => {
        const onSave = vscode.workspace.onDidSaveTextDocument((doc: vscode.TextDocument) => {
            let fileName = doc.fileName;
            client.formatFile(fileName).then((success) => {
                vscode.window.showInformationMessage("Format Success!!");
            }).then((err)=> {
                vscode.window.showInformationMessage("Format Failed!!");
            });
        });
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(saveDisposer);
}

export function deactivate() {
}
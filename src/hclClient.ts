
import * as cp from 'child_process';
import * as vs from 'vscode';
/**
 * Formats the given file with hclfmt binary
 * please visit https://github.com/fatih/hclfmt
 * and install this binary
 */
function runFormat(binaryPath: string, path: string): Promise<Number> {
    let process = cp.spawn(binaryPath, ["-w", path]);
    return new Promise((resolve, reject) => {
        process.on('close', (code: Number) => {
            if(code != 0){
                reject(code);
            } else {
                resolve(code);
            }
        });
    })
}

/**
 * Responsible to format the given file in path
 */
export class HclClient {
    private config: vs.WorkspaceConfiguration;
    private hclPath: string;

    constructor(config: vs.WorkspaceConfiguration) {
        this.config = config;
        this.hclPath = this.config.get('path', 'hclfmt') || 'hclfmt';
        console.log(this.hclPath);
    }

    formatFile(path: string) : Promise<Number> {
       return runFormat(this.hclPath, path);
    }
}
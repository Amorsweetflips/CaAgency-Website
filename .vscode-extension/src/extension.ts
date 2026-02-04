import * as vscode from 'vscode';
import { GitExtension, API } from './api/git';

export function activate(context: vscode.ExtensionContext) {
	// Get the Git extension API
	const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git')?.exports;

	if (!gitExtension) {
		vscode.window.showErrorMessage('Git extension is not available');
		return;
	}

	const git = gitExtension.getAPI(1);

	if (!git) {
		vscode.window.showErrorMessage('Git API version 1 is not available');
		return;
	}

	// Example: Log all repositories
	console.log('Git repositories:', git.repositories.map(repo => repo.rootUri.fsPath));

	// Example: Listen for repository changes
	git.onDidOpenRepository((repository) => {
		console.log('Repository opened:', repository.rootUri.fsPath);
	});

	git.onDidCloseRepository((repository) => {
		console.log('Repository closed:', repository.rootUri.fsPath);
	});

	// Example command: Get current branch
	const disposable = vscode.commands.registerCommand('extension.getCurrentBranch', async () => {
		const repository = git.repositories[0];
		if (repository) {
			const branch = repository.state.HEAD?.name || 'No branch';
			vscode.window.showInformationMessage(`Current branch: ${branch}`);
		} else {
			vscode.window.showWarningMessage('No Git repository found');
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

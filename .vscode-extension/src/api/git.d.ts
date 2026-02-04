/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Uri, Event, Disposable, ProviderResult } from 'vscode';

export interface GitExtension {

	readonly enabled: boolean;
	readonly onDidChangeEnablement: Event<boolean>;

	/**
	 * Returns a specific API version.
	 *
	 * @param version Version number. Must be exactly 1 for now.
	 * @return API instance
	 */
	getAPI(version: 1): API;
}

export interface API {
	readonly repositories: Repository[];
	readonly onDidOpenRepository: Event<Repository>;
	readonly onDidCloseRepository: Event<Repository>;
	readonly state: APIState;
}

export interface APIState {
	readonly enabled: boolean;
	readonly onDidChangeEnablement: Event<boolean>;
}

export interface Repository {
	readonly rootUri: Uri;
	readonly inputBox: InputBox;
	readonly state: RepositoryState;
	readonly ui: RepositoryUIState;

	readonly onDidChangeState: Event<void>;
	readonly onDidChangeOperations: Event<void>;

	getConfigs(): Promise<{ key: string; value: string }[]>;
	getConfig(key: string): Promise<string>;
	setConfig(key: string, value: string): Promise<string>;
	getGlobalConfig(key: string): Promise<string>;

	getObjectDetails(treeish: string, path: string): Promise<{ mode: string; object: string; size: number }>;
	detectObjectType(object: string): Promise<{ mimetype: string; encoding?: string }>;
	buffer(ref: string, path: string): Promise<Buffer>;
	show(ref: string, path: string): Promise<string>;
	getCommit(ref: string): Promise<Commit>;

	add(paths: string[]): Promise<void>;
	revert(paths: string[]): Promise<void>;
	clean(paths: string[]): Promise<void>;

	apply(patch: string, reverse?: boolean): Promise<void>;
	diff(cached?: boolean): Promise<string>;
	diffWithHEAD(path: string): Promise<string>;
	diffWith(ref: string, path: string): Promise<string>;
	diffIndexWithHEAD(path: string): Promise<string>;
	diffIndexWith(ref: string, path: string): Promise<string>;
	diffBlobs(object1: string, object2: string): Promise<string>;
	diffBetween(ref1: string, ref2: string, path: string): Promise<string>;

	hashObject(data: string): Promise<string>;

	createBranch(name: string, checkout: boolean, ref?: string): Promise<void>;
	deleteBranch(name: string, force?: boolean): Promise<void>;
	getBranch(name: string): Promise<Branch>;
	getBranches(query: BranchQuery): Promise<Branch[]>;
	setBranchUpstream(name: string, upstream: string): Promise<void>;

	getRefs(query: RefQuery, cancellationToken?: CancellationToken): Promise<Ref[]>;

	getRemotes(query?: RemoteQuery): Promise<Remote[]>;
	addRemote(name: string, url: string): Promise<void>;
	removeRemote(name: string): Promise<void>;
	renameRemote(name: string, newName: string): Promise<void>;

	fetch(remote?: string, ref?: string, depth?: number): Promise<void>;
	pull(unshallow?: boolean): Promise<void>;
	push(remote?: string, ref?: string, setUpstream?: boolean): Promise<void>;

	blame(path: string): Promise<string>;
	log(options?: LogOptions): Promise<Commit[]>;

	status(): Promise<void>;
	checkout(treeish: string): Promise<void>;

	exec(args: string[], options?: ExecutionOptions): Promise<ExecutionResult>;

	postCommitCommand(command: PostCommitCommand): void;
}

export interface ExecutionOptions {
	cancellationToken?: CancellationToken;
}

export interface ExecutionResult {
	stdout: string;
	stderr: string;
	exitCode: number;
}

export interface InputBox {
	value: string;
	readonly onDidChange: Event<string>;
}

export interface RepositoryState {
	readonly HEAD: Branch | undefined;
	readonly refs: Ref[];
	readonly remotes: Remote[];
	readonly submodules: Submodule[];
	readonly rebaseCommit: Commit | undefined;

	readonly mergeChanges: Change[];
	readonly indexChanges: Change[];
	readonly workingTreeChanges: Change[];

	readonly onDidChange: Event<void>;
}

export interface RepositoryUIState {
	readonly selected: boolean;
	readonly onDidChange: Event<void>;
}

export interface Branch {
	readonly name: string;
	readonly commit: string;
	readonly type: RefType;
	readonly remote?: string;
	readonly upstream?: Branch;
	readonly ahead?: number;
	readonly behind?: number;
}

export interface Ref {
	readonly type: RefType;
	readonly name?: string;
	readonly commit?: string;
	readonly remote?: string;
}

export interface UpstreamRef {
	readonly remote: string;
	readonly name: string;
}

export interface Remote {
	readonly name: string;
	readonly fetchUrl?: string;
	readonly pushUrl?: string;
	readonly isReadOnly: boolean;
}

export interface Submodule {
	readonly name: string;
	readonly path: string;
	readonly url: string;
}

export interface Change {
	readonly uri: Uri;
	readonly originalUri: Uri;
	readonly renameUri: Uri | undefined;
	readonly status: Status;
}

export interface Commit {
	readonly hash: string;
	readonly message: string;
	readonly parents: string[];
	readonly authorDate: Date;
	readonly authorName: string;
	readonly authorEmail: string;
	readonly commitDate: Date;
	readonly committerName: string;
	readonly committerEmail: string;
}

export interface RefQuery {
	readonly contains?: string;
	readonly count?: number;
	readonly pattern?: string;
	readonly path?: string;
	readonly query?: string;
	readonly remote?: string;
	readonly sort?: 'alphabetically' | 'date';
}

export interface BranchQuery {
	readonly pattern?: string;
	readonly count?: number;
	readonly contains?: string;
	readonly remote?: boolean;
	readonly sort?: 'alphabetically' | 'date';
}

export interface RemoteQuery {
	readonly pattern?: string;
}

export interface LogOptions {
	readonly maxEntries?: number;
	readonly path?: string;
	readonly ref?: string;
	readonly author?: string;
	readonly skip?: number;
	readonly reverse?: boolean;
	readonly sortBy?: 'date' | 'topo';
}

export enum RefType {
	Head = 0,
	RemoteHead = 1,
	Tag = 2
}

export enum Status {
	INDEX_MODIFIED = 0,
	INDEX_ADDED = 1,
	INDEX_DELETED = 2,
	INDEX_RENAMED = 3,
	INDEX_COPIED = 4,

	MODIFIED = 5,
	DELETED = 6,
	UNTRACKED = 7,
	IGNORED = 8,
	INTENT_TO_ADD = 9,
	INTENT_TO_RENAME = 10,
	TYPE_CHANGED = 11,

	ADDED_BY_US = 12,
	ADDED_BY_THEM = 13,
	DELETED_BY_US = 14,
	DELETED_BY_THEM = 15,
	BOTH_ADDED = 16,
	BOTH_DELETED = 17,
	BOTH_MODIFIED = 18
}

export enum PostCommitCommand {
	Push = 'push',
	Sync = 'sync'
}

export interface CancellationToken {
	readonly isCancellationRequested: boolean;
	readonly onCancellationRequested: Event<any>;
}

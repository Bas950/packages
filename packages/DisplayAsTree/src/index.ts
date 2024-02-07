export class Tree {
	/**
	 * Name of the tree.
	 */
	name: string;
	/**
	 * Branches of the tree.
	 */
	branches: Branch[] = [];
	private headChar = "● ";
	private treeChar = "├─ ";
	private lineChar = "│  ";
	private lastChar = "╰─ ";

	/**
	 * Make a new tree.
	 *
	 * @param name The root name of your tree.
	 * @param options Custom line characters
	 */
	constructor(
		name: string,
		options?: {
			headChar?: string;
			treeChar?: string;
			lineChar?: string;
			lastChar?: string;
		},
	) {
		this.name = name;
		if (options?.headChar) this.headChar = options.headChar;
		if (options?.treeChar) this.treeChar = options.treeChar;
		if (options?.lineChar) this.lineChar = options.lineChar;
		if (options?.lastChar) this.lastChar = options.lastChar;

		if (this.treeChar.length !== this.lineChar.length && this.lineChar.length !== this.lastChar.length)
			throw new Error("treeChar, midChar, and endChar must have the same length.");
	}

	/**
	 * Add branches to the main tree.
	 *
	 * @param branches Branches to add to the tree.
	 */
	addBranch(branches: (Branch | string)[]) {
		for (const branch of branches) {
			if (typeof branch === "string") this.branches.push(new Branch(branch));
			else this.branches.push(branch);
		}
		return this;
	}

	private getData(name: string, branches: Branch[]) {
		let output: string[] = [];
		const { length } = branches;

		output.push(name);

		if (!length) return output;

		for (let index = 0; index < length; index++) {
			const branch = branches[index],
				isLast = index === length - 1;
			/* c8 ignore next */
			if (!branch) continue;

			let char: string | undefined = "";

			char = isLast ? this.lastChar : this.treeChar;

			output = [
				...output,
				...this.getData(branch.name, branch.branches).map((s) => {
					const c = char;
					char = undefined;
					return (c ?? (isLast ? this.getSpacesOfLength(this.treeChar.length) : this.lineChar)) + s;
				}),
			];
		}
		return output;
	}

	private getSpacesOfLength(length: number) {
		return " ".repeat(length);
	}

	private getAsStringList() {
		return this.getData(this.headChar + this.name, this.branches);
	}

	/**
	 * Get the tree as an string.
	 */
	toString() {
		return this.getAsStringList().join("\n");
	}

	/**
	 * Console.log() the tree.
	 */
	log() {
		// eslint-disable-next-line no-console
		console.log(this.toString());
	}
}

export class Branch {
	/**
	 * Name of the tree branch.
	 */
	name: string;
	/**
	 * Branches of the tree section.
	 */
	branches: Branch[] = [];

	/**
	 * Make a new tree branch.
	 *
	 * @param name The name of your tree branch.
	 */
	constructor(name: string) {
		this.name = name;
	}

	/**
	 * Add more sections to the section.
	 *
	 * @param branches Sections to add to the section.
	 */
	addBranch(branches: (Branch | string)[]) {
		for (const branch of branches) {
			if (typeof branch === "string") this.branches.push(new Branch(branch));
			else this.branches.push(branch);
		}
		return this;
	}
}

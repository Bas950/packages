import { describe, expect, test } from "vitest";
import { vitest } from "vitest";

import { Branch, Tree } from "./index.js";

describe("Tree", () => {
	test("constructor(...)", () => {
		const tree = new Tree("root");
		expect(tree.name).toBe("root");
		expect(tree.branches).toEqual([]);
		expect(tree.toString()).toBe("● root");

		const tree2 = new Tree("root", {
			headChar: "🌲 ",
			lastChar: "🌱 ",
			lineChar: "🌴 ",
			treeChar: "🌳 ",
		});
		expect(tree2.toString()).toBe("🌲 root");

		expect(
			() =>
				new Tree("root", {
					headChar: "🌲 ",
					lastChar: "🌱  ",
					lineChar: "🌴 ",
					treeChar: "🌳  ",
				}),
		).toThrowError("treeChar, midChar, and endChar must have the same length.");
	});

	test("addBranch(...)", () => {
		const tree = new Tree("root");
		tree.addBranch(["branch1", "branch2"]);
		expect(tree.branches).toEqual([
			{ branches: [], name: "branch1" },
			{ branches: [], name: "branch2" },
		]);
		expect(tree.toString()).toBe(`● root
├─ branch1
╰─ branch2`);

		const tree2 = new Tree("root");
		tree2.addBranch([new Branch("branch1"), new Branch("branch2").addBranch([new Branch("branch3"), new Branch("branch4")])]);
		expect(tree2.branches).toEqual([
			{ branches: [], name: "branch1" },
			{
				branches: [
					{ branches: [], name: "branch3" },
					{ branches: [], name: "branch4" },
				],
				name: "branch2",
			},
		]);
		expect(tree2.toString()).toBe(`● root
├─ branch1
╰─ branch2
   ├─ branch3
   ╰─ branch4`);

		const tree3 = new Tree("root");
		tree3.addBranch([
			new Branch("branch1"),
			new Branch("branch2").addBranch([new Branch("branch3"), new Branch("branch4").addBranch(["branch5"])]),
			new Branch("branch6"),
		]);
		expect(tree3.branches).toEqual([
			{ branches: [], name: "branch1" },
			{
				branches: [
					{ branches: [], name: "branch3" },
					{
						branches: [
							{
								branches: [],
								name: "branch5",
							},
						],
						name: "branch4",
					},
				],
				name: "branch2",
			},
			{ branches: [], name: "branch6" },
		]);
		expect(tree3.toString()).toBe(`● root
├─ branch1
├─ branch2
│  ├─ branch3
│  ╰─ branch4
│     ╰─ branch5
╰─ branch6`);
	});

	test("toString()", () => {
		const tree = new Tree("root");
		tree.addBranch(["branch1", "branch2"]);
		expect(tree.toString()).toBe(`● root
├─ branch1
╰─ branch2`);

		const tree2 = new Tree("root");
		tree2.addBranch([new Branch("branch1"), new Branch("branch2").addBranch([new Branch("branch3"), new Branch("branch4")])]);
		expect(tree2.toString()).toBe(`● root
├─ branch1
╰─ branch2
   ├─ branch3
   ╰─ branch4`);
	});

	test("log()", () => {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		const logSpy = vitest.spyOn(console, "log").mockImplementation(() => {}),
			tree = new Tree("root");
		tree.addBranch(["branch1", "branch2"]);
		tree.log();
		expect(logSpy).toHaveBeenCalledWith(`● root
├─ branch1
╰─ branch2`);

		const tree2 = new Tree("root");
		tree2.addBranch([new Branch("branch1"), new Branch("branch2").addBranch([new Branch("branch3"), new Branch("branch4")])]);
		tree2.log();
		expect(logSpy).toHaveBeenCalledWith(`● root
├─ branch1
╰─ branch2
   ├─ branch3
   ╰─ branch4`);

		logSpy.mockRestore();
	});
});

describe("Branch", () => {
	test("constructor(...)", () => {
		const branch = new Branch("branch");
		expect(branch.name).toBe("branch");
		expect(branch.branches).toEqual([]);
	});

	test("addBranch(...)", () => {
		const branch = new Branch("branch");
		branch.addBranch(["branch1", "branch2"]);
		expect(branch.branches).toEqual([
			{ branches: [], name: "branch1" },
			{ branches: [], name: "branch2" },
		]);

		const branch2 = new Branch("branch");
		branch2.addBranch([new Branch("branch1"), new Branch("branch2").addBranch([new Branch("branch3"), new Branch("branch4")])]);
		expect(branch2.branches).toEqual([
			{ branches: [], name: "branch1" },
			{
				branches: [
					{ branches: [], name: "branch3" },
					{ branches: [], name: "branch4" },
				],
				name: "branch2",
			},
		]);
	});
});

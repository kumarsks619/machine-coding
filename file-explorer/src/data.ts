import { FileExplorerItemType } from "./components/FileExplorerItem"

export const FILE_EXPLORER_DATA: FileExplorerItemType[] = [
	{
		id: 1,
		name: "public",
		isFolder: true,
		children: [
			{
				id: 2,
				name: "index.html",
				isFolder: false,
			},
		],
	},
	{
		id: 3,
		name: "src",
		isFolder: true,
		children: [
			{
				id: 6,
				name: "components",
				isFolder: true,
				children: [
					{
						id: 8,
						name: "List.tsx",
						isFolder: false,
					},
				],
			},
			{
				id: 4,
				name: "App.tsx",
				isFolder: false,
			},
			{
				id: 5,
				name: "index.tsx",
				isFolder: false,
			},
		],
	},
]

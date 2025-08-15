import { FileExplorerItemType } from './FileExplorerItem'

const ActionButtons = ({
	selectedFileExplorerItem,
	fileExplorerData,
	setFileExplorerData,
}: {
	selectedFileExplorerItem: FileExplorerItemType | null
	fileExplorerData: FileExplorerItemType[]
	setFileExplorerData: React.Dispatch<React.SetStateAction<FileExplorerItemType[]>>
}) => {
	const isAnyFileExplorerItemSelected = selectedFileExplorerItem !== null
	const isFolderSelected = isAnyFileExplorerItemSelected && selectedFileExplorerItem.isFolder

	const handleFileExplorerItemDeletion = () => {
		const idToDelete = selectedFileExplorerItem?.id
		if (!idToDelete) return

		const filterList = (list: FileExplorerItemType[]): FileExplorerItemType[] => {
			return list
				.filter((item) => item.id !== idToDelete)
				.map((item) => {
					if (item.children) {
						return {
							...item,
							children: filterList(item.children),
						}
					}
					return item
				})
		}
		const filteredList = filterList(fileExplorerData)
		setFileExplorerData(filteredList)
	}

	const handleFileExplorerItemAddition = (isFolder: boolean) => {
		const parentFolderId = selectedFileExplorerItem?.id
		if (!parentFolderId) return

		const fileName = prompt('Enter file name:')
		if (!fileName) return

		let newFileExplorerItem: FileExplorerItemType = {
			id: Date.now(),
			name: fileName,
			isFolder,
		}
		if (isFolder) {
			newFileExplorerItem.children = []
		}

		const updateList = (list: FileExplorerItemType[]): FileExplorerItemType[] => {
			return list.map((item) => {
				if (item.id === parentFolderId) {
					return {
						...item,
						children: [...(item?.children ?? []), newFileExplorerItem],
					}
				}
				if (item.children) {
					return {
						...item,
						children: updateList(item.children),
					}
				}
				return item
			})
		}
		const updatedList = updateList(fileExplorerData)
		setFileExplorerData(updatedList)
	}

	return (
		<div className='actionButtons__root'>
			<button
				disabled={!isFolderSelected}
				onClick={() => handleFileExplorerItemAddition(false)}>
				<img
					src='https://static.thenounproject.com/png/2044254-200.png'
					alt='create new file'
				/>
			</button>
			<button
				disabled={!isFolderSelected}
				onClick={() => handleFileExplorerItemAddition(true)}>
				<img
					src='https://static.thenounproject.com/png/2331383-200.png'
					alt='create new folder'
				/>
			</button>
			<button
				disabled={!isAnyFileExplorerItemSelected}
				onClick={handleFileExplorerItemDeletion}>
				<img
					src='https://cdn-icons-png.flaticon.com/512/3161/3161358.png'
					alt='delete file/folder'
				/>
			</button>
		</div>
	)
}

export default ActionButtons

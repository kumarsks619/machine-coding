import { useState } from 'react'

export interface FileExplorerItemType {
	id: number
	name: string
	isFolder: boolean
	children?: FileExplorerItemType[]
}

const FileExplorerItem = ({
	fileExplorerItem,
	selectedFileExplorerItem,
	setSelectedFileExplorerItem,
}: {
	fileExplorerItem: FileExplorerItemType
	selectedFileExplorerItem: FileExplorerItemType | null
	setSelectedFileExplorerItem: React.Dispatch<React.SetStateAction<FileExplorerItemType | null>>
}) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const showExpandToggle = fileExplorerItem.isFolder
	const isSelected = selectedFileExplorerItem?.id === fileExplorerItem.id

	const handleFileExplorerItemNameClick = () => {
		if (selectedFileExplorerItem?.id === fileExplorerItem.id) setSelectedFileExplorerItem(null)
		else setSelectedFileExplorerItem(fileExplorerItem)
	}

	return (
		<div className='fileExplorerItem__root'>
			<div className='fileExplorerItem__nameWrapper'>
				{showExpandToggle && <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? '-' : '+'}</button>}
				<p
					className={`${isSelected ? 'selected' : ''}`}
					onClick={handleFileExplorerItemNameClick}>
					{fileExplorerItem.name}
				</p>
			</div>
			{isExpanded &&
				fileExplorerItem?.children &&
				fileExplorerItem.children?.map((child) => (
					<FileExplorerItem
						key={child.id}
						fileExplorerItem={child}
						selectedFileExplorerItem={selectedFileExplorerItem}
						setSelectedFileExplorerItem={setSelectedFileExplorerItem}
					/>
				))}
		</div>
	)
}

export default FileExplorerItem

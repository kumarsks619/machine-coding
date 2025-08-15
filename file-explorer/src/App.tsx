import { useState } from 'react'

import './App.css'
import FileExplorerItem, { FileExplorerItemType } from './components/FileExplorerItem'
import { FILE_EXPLORER_DATA } from './data'
import ActionButtons from './components/ActionButtons'

function App() {
	const [fileExplorerData, setFileExplorerData] = useState<FileExplorerItemType[]>(FILE_EXPLORER_DATA)
	const [selectedFileExplorerItem, setSelectedFileExplorerItem] = useState<FileExplorerItemType | null>(null)

	return (
		<div className='App'>
			<ActionButtons
				selectedFileExplorerItem={selectedFileExplorerItem}
				fileExplorerData={fileExplorerData}
				setFileExplorerData={setFileExplorerData}
			/>
			<div className='app__listWrapper'>
				{fileExplorerData.map((fileExplorerItem) => (
					<FileExplorerItem
						key={fileExplorerItem.id}
						fileExplorerItem={fileExplorerItem}
						selectedFileExplorerItem={selectedFileExplorerItem}
						setSelectedFileExplorerItem={setSelectedFileExplorerItem}
					/>
				))}
			</div>
		</div>
	)
}

export default App

import { useState } from 'react'

import Checkbox, { CheckboxType } from './components/Checkbox'
import { CHECKBOXES_DATA } from './data'
import './App.css'

function App() {
	const [checkedBoxIds, setCheckedBoxIds] = useState<Record<number, boolean>>({})

	const handleCheckboxClick = (checkbox: CheckboxType, isChecked: boolean) => {
		const checkBoxIdsCopy = { ...checkedBoxIds }

		const toggleCheck = (checkbox: CheckboxType, isChecked: boolean) => {
			checkBoxIdsCopy[checkbox.id] = isChecked
			// check all children nodes if they exist
			checkbox.children?.forEach((child) => toggleCheck(child, isChecked))
		}
		toggleCheck(checkbox, isChecked)

		// check/uncheck parent node if all the children are checked
		const checkAndUpdateParent = (node: CheckboxType): boolean => {
			if (!node.children) return checkBoxIdsCopy[node.id]
			const areAllChildrenChecked = node.children?.every((child) =>
				checkAndUpdateParent(child)
			)
			checkBoxIdsCopy[node.id] = areAllChildrenChecked
			return checkBoxIdsCopy[node.id]
		}
		CHECKBOXES_DATA.forEach((checkbox) => checkAndUpdateParent(checkbox))
		setCheckedBoxIds(checkBoxIdsCopy)
	}

	return (
		<div className='App'>
			{CHECKBOXES_DATA.map((checkbox) => (
				<Checkbox
					key={checkbox.id}
					checkbox={checkbox}
					checkedBoxIds={checkedBoxIds}
					handleCheckboxClick={handleCheckboxClick}
				/>
			))}
		</div>
	)
}

export default App

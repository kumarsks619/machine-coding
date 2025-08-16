import { useState } from 'react'

import Checkbox, { CheckboxType } from './components/Checkbox'
import { CHECKBOXES_DATA } from './data'
import './App.css'

function App() {
	const [checkedBoxIds, setCheckedBoxIds] = useState<Set<number>>(new Set())

	const handleCheckboxClick = (checkbox: CheckboxType, isChecked: boolean) => {
		const checkBoxIdsCopy = new Set(checkedBoxIds)

		const toggleCheck = (checkbox: CheckboxType, isChecked: boolean) => {
			if (isChecked) {
				checkBoxIdsCopy.add(checkbox.id)
			} else {
				checkBoxIdsCopy.delete(checkbox.id)
			}
			// check all children nodes if they exist
			checkbox.children?.forEach((child) => toggleCheck(child, isChecked))
		}
		toggleCheck(checkbox, isChecked)

		// check/uncheck parent node if all the children are checked
		const checkAndUpdateParent = (node: CheckboxType): boolean => {
			if (!node.children) return checkBoxIdsCopy.has(node.id)
			const areAllChildrenChecked = node.children?.every((child) => checkAndUpdateParent(child))
			if (areAllChildrenChecked) {
				checkBoxIdsCopy.add(node.id)
			} else {
				checkBoxIdsCopy.delete(node.id)
			}
			return areAllChildrenChecked
		}
		CHECKBOXES_DATA.forEach((checkbox) => checkAndUpdateParent(checkbox))

		console.log(checkBoxIdsCopy)
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

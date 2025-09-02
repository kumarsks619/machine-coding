export interface CheckboxType {
	id: number
	label: string
	children?: CheckboxType[]
}

const Checkbox = ({
	checkbox,
	checkedBoxIds,
	handleCheckboxClick,
}: {
	checkbox: CheckboxType
	checkedBoxIds: { [checkboxId: number]: boolean }
	handleCheckboxClick: (checkbox: CheckboxType, isChecked: boolean) => void
}) => {
	const isChecked = checkedBoxIds[checkbox.id] ?? false
	return (
		<div style={{ marginLeft: '20px' }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
				<input
					type='checkbox'
					id={`${checkbox.label}-${checkbox.id}`}
					style={{ cursor: 'pointer' }}
					checked={isChecked}
					onChange={($event) =>
						handleCheckboxClick(checkbox, ($event.target as HTMLInputElement).checked)
					}
				/>
				<label
					htmlFor={`${checkbox.label}-${checkbox.id}`}
					style={{ cursor: 'pointer' }}>
					{checkbox.label}
				</label>
			</div>
			{checkbox?.children?.map((child) => (
				<Checkbox
					key={child.id}
					checkbox={child}
					checkedBoxIds={checkedBoxIds}
					handleCheckboxClick={handleCheckboxClick}
				/>
			))}
		</div>
	)
}

export default Checkbox

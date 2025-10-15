import { useState } from 'react'

interface Item {
	id: string
	label: string
	value: string
}

const LIST_HEIGHT_IN_PX = 500
const LIST_ITEM_HEIGHT_IN_PX = 50
const NUMBER_OF_DOM_ITEMS = LIST_HEIGHT_IN_PX / LIST_ITEM_HEIGHT_IN_PX + 1

const VirtualisedList = ({
	items,
	onItemClick,
}: {
	items: Item[]
	onItemClick: (item: Item) => void
}) => {
	const [startIndex, setStartIndex] = useState(0)

	const handleScroll = (e: any) => {
		const itemsScrolledOut = Math.floor(e.target.scrollTop / LIST_ITEM_HEIGHT_IN_PX)
		setStartIndex(itemsScrolledOut)
	}

	return (
		<div
			style={{
				border: '1px solid #000',
				width: '400px',
				height: LIST_HEIGHT_IN_PX,
				overflowY: 'auto',
			}}
			onScroll={handleScroll}>
			<div style={{ height: LIST_ITEM_HEIGHT_IN_PX * items.length }}>
				{items.slice(startIndex, startIndex + NUMBER_OF_DOM_ITEMS).map((item) => (
					<div
						key={item.id}
						style={{
							height: LIST_ITEM_HEIGHT_IN_PX,
							display: 'grid',
							placeItems: 'center',
							borderBottom: '1px solid gray',
							transform: `translateY(${startIndex * LIST_ITEM_HEIGHT_IN_PX}px)`,
						}}
						onClick={() => onItemClick(item)}>
						<p>{item.label}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default VirtualisedList

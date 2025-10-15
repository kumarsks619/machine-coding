import VirtualisedList from './components/VirtualisedList'
import './App.css'

const list = new Array(10000)
	.fill(0)
	.map((_, index) => ({ id: `id-${index}`, label: `Item ${index}`, value: `value-${index}` }))

function App() {
	const handleItemClick = (item: (typeof list)[0]) => {
		console.log('Clicked: ', item)
	}

	return (
		<div className='App'>
			<VirtualisedList
				items={list}
				onItemClick={handleItemClick}
			/>
		</div>
	)
}

export default App

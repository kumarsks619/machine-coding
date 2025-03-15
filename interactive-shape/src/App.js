import "./App.css"
import BoxesWrapper from "./components/BoxesWrapper"

const pattern = [
	[1, 1, 1],
	[1, 0, 0],
	[1, 1, 1],
]

function App() {
	return (
		<div style={{ width: "100vw", height: "100vh", display: "grid", placeItems: "center" }}>
			<BoxesWrapper arrays={pattern} />
		</div>
	)
}

export default App

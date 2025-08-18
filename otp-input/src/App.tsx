import OtpInput from './components/OtpInput'
import './App.css'

function App() {
	return (
		<div
			className='App'
			style={{ padding: '50px' }}>
			<h1>OTP Input</h1>
			<OtpInput digits={6} />
		</div>
	)
}

export default App

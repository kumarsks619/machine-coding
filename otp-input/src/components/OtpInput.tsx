import { useRef, useState } from 'react'

const OtpInput = ({ digits = 6 }: { digits: number }) => {
	const [otp, setOtp] = useState<{ [index: number]: string }>({ ...new Array(digits).fill('') })
	const inputsWrapperRef = useRef(null)

	const isSubmitButtonDisabled = Object.values(otp).some((val) => val === '')

	const handleInputChange = (e: any, index: number) => {
		const value = e.target.value?.trim()?.slice(-1)
		if (isNaN(Number(value))) return
		setOtp((prevOtp) => {
			const prevOtpCopy = { ...prevOtp }
			prevOtpCopy[index] = value
			return prevOtpCopy
		})
		value && updateInputFocus(index)
	}

	const updateInputFocus = (currentIndex: number, isBackspace = false) => {
		if (!inputsWrapperRef.current) return
		let nextInputIndexToFocus = 0
		if (isBackspace) {
			nextInputIndexToFocus = currentIndex > 0 ? currentIndex - 1 : currentIndex
		} else {
			nextInputIndexToFocus = currentIndex < digits - 1 ? currentIndex + 1 : currentIndex
		}
		;(inputsWrapperRef.current as any).children[nextInputIndexToFocus].focus()
	}

	const handleKeyDown = (e: any, currentIndex: number) => {
		if (e.key === 'Backspace' && e.target.value === '') {
			updateInputFocus(currentIndex, true)
		}
	}

	const handlePaste = (e: any) => {
		e.preventDefault()
		const clipboardData = e.clipboardData.getData('text')
		if (isNaN(Number(clipboardData))) return
		if (String(clipboardData).length > digits) return

		const otpCopy = { ...otp }
		clipboardData.split('').forEach((val: string, index: number) => {
			otpCopy[index] = val
		})
		setOtp(otpCopy)
		updateInputFocus(clipboardData.length - 1)
	}

	const handleOtpSubmission = () => {
		const finalOtp = Object.values(otp).reduce((acc, curr) => (acc += curr), '')
		alert(finalOtp)
	}

	return (
		<div>
			<div ref={inputsWrapperRef}>
				{new Array(digits).fill(0).map((_, index) => (
					<input
						key={index}
						type='text'
						value={otp[index]}
						autoFocus={index === 0}
						onChange={(e) => handleInputChange(e, index)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						onPaste={(e) => handlePaste(e)}
					/>
				))}
			</div>
			<button
				style={{ marginTop: '20px' }}
				disabled={isSubmitButtonDisabled}
				onClick={handleOtpSubmission}>
				Submit
			</button>
		</div>
	)
}

export default OtpInput

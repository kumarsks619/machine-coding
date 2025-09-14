document.addEventListener('DOMContentLoaded', function () {
	const editorArea = document.getElementById('input-area')
	const h1Button = document.getElementById('h1-button')
	const h2Button = document.getElementById('h2-button')
	const pButton = document.getElementById('p-button')
	const boldButton = document.getElementById('bold-button')

	if (editorArea.innerHTML.trim() === '') {
		editorArea.innerHTML = ''
	}

	function formatBlock(tag) {
		document.execCommand('formatBlock', false, `<${tag}>`)
		updateButtonStates()
	}

	function toggleBold() {
		document.execCommand('bold', false, null)
		updateButtonStates()
	}

	function updateButtonStates() {
		;[h1Button, h2Button, pButton, boldButton].forEach((btn) => {
			btn.classList.remove('active')
		})

		const selection = window.getSelection()
		if (selection.rangeCount > 0) {
			const range = selection.getRangeAt(0)
			let container = range.commonAncestorContainer

			while (container && container.nodeType !== Node.ELEMENT_NODE) {
				container = container.parentNode
			}

			if (container) {
				let blockElement = container
				while (blockElement && blockElement !== editorArea) {
					if (['H1', 'H2', 'P'].includes(blockElement.tagName)) {
						break
					}
					blockElement = blockElement.parentElement
				}

				if (blockElement && blockElement.tagName === 'H1') {
					h1Button.classList.add('active')
				} else if (blockElement && blockElement.tagName === 'H2') {
					h2Button.classList.add('active')
				} else if (blockElement && blockElement.tagName === 'P') {
					pButton.classList.add('active')
				}
			}
		}

		if (document.queryCommandState('bold')) {
			boldButton.classList.add('active')
		}
	}

	h1Button.addEventListener('click', () => formatBlock('h1'))
	h2Button.addEventListener('click', () => formatBlock('h2'))
	pButton.addEventListener('click', () => formatBlock('p'))
	boldButton.addEventListener('click', toggleBold)

	editorArea.addEventListener('selectionchange', updateButtonStates)
	editorArea.addEventListener('keyup', updateButtonStates)
	editorArea.addEventListener('mouseup', updateButtonStates)

	editorArea.focus()

	setTimeout(updateButtonStates, 100)
})

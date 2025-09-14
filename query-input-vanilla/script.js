const input = document.getElementById('queryInput')
const output = document.getElementById('queryOutput')

function parseQuery(queryStr) {
	const tokens = queryStr.split(/\s+AND\s+/i)
	const result = []

	for (let token of tokens) {
		let match

		// Match IN operator
		if ((match = token.match(/(\w+)\s+IN\s+\[([^\]]+)\]/i))) {
			const field = match[1]
			const values = match[2].split(',').map((v) =>
				v
					.trim()
					.replace(/^"(.*)"$/, '$1')
					.replace(/^'(.*)'$/, '$1')
			)
			result.push({ field, operator: 'IN', value: values })
		}
		// Match = or != operators
		else if ((match = token.match(/(\w+)\s*(=|!=)\s*("[^"]*"|'[^']*'|\w+)/))) {
			const field = match[1]
			const operator = match[2]
			let value = match[3].replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1')
			result.push({ field, operator, value })
		}
	}

	return result
}

input.addEventListener('keydown', function (e) {
	if (e.key === 'Enter') {
		const query = input.value.trim()

		if (!query) {
			output.textContent = 'Error: Please enter a query'
			return
		}

		const parsedState = parseQuery(query)

		if (parsedState.length === 0) {
			output.textContent = 'Error: Query could not be parsed.'
			return
		}

		output.textContent = JSON.stringify(parsedState, null, 2)
	}
})

let apiDebounceTimeoutId = null
let apiCache = {}

document.getElementById("search-input")?.addEventListener("input", ($event) => {
	const resultsElement = document.getElementById("results-dropdown")

	// get the entered value
	const searchedText = $event.target?.value?.trim()
	if (searchedText === "") {
		resultsElement.innerHTML = ""
		resultsElement.style.display = "none"
		return
	}

	// make api call to fetch results
	if (apiDebounceTimeoutId) {
		clearInterval(apiDebounceTimeoutId)
	}
	apiDebounceTimeoutId = setTimeout(async () => {
		const results = await fetchRecipes(searchedText)

		// render the result in UI
		resultsElement.innerHTML = ""
		resultsElement.style.display = "flex"
		results?.recipes?.forEach((product) => {
			const resultItemDiv = document.createElement("div")
			const itemSplits = product.name.toLowerCase().split(searchedText.toLowerCase())
			resultItemDiv.innerHTML = `${itemSplits[0]}<strong>${searchedText}</strong>${itemSplits.length > 0 && itemSplits[1]}`
			resultsElement.appendChild(resultItemDiv)
		})
	}, 500)
})

// only show results dropdown when input is focused
document.getElementById("search-input")?.addEventListener("focus", () => {
	const resultsElement = document.getElementById("results-dropdown")
	if (resultsElement.innerHTML) {
		resultsElement.style.display = "flex"
	}
})
document.getElementById("search-input")?.addEventListener("blur", () => {
	const resultsElement = document.getElementById("results-dropdown")
	resultsElement.style.display = "none"
})

async function fetchRecipes(query) {
	if (apiCache[query]) {
		return apiCache[query]
	}
	try {
		const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`)
		apiCache[query] = await res.json()
		return apiCache[query]
	} catch (err) {
		console.log(err)
	}
}

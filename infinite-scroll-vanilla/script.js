console.log('hello world')

class ProductPage {
	limit = 0
	page = 0
	total = 0
	products = []
	rootEl = null
	isFetchingProducts = false

	constructor(rootId, { limit = 10 } = {}) {
		const wrapperEl = document.getElementById(rootId)
		if (!wrapperEl) {
			throw new Error('Root element not found in the DOM!!!')
		}
		this.rootEl = wrapperEl
		this.limit = limit
	}

	async init() {
		try {
			const products = await this.fetchProducts()
			this.addProductsToDom(products)
			this.attachInfiniteScrollListener()
		} catch (err) {
			console.log('Error while initializing product page!', err)
		}
	}

	async fetchProducts() {
		const skip = this.page * this.limit
		try {
			this.isFetchingProducts = true
			const res = await fetch(
				`https://dummyjson.com/products?limit=${this.limit}&skip=${skip}`
			)
			const { products, total } = await res.json()
			this.total = total
			this.products = [...this.products, ...products]
			this.page += 1
			return products
		} catch (err) {
			console.log('Error fetching products: ', err)
		} finally {
			this.isFetchingProducts = false
		}
	}

	addProductsToDom(products = []) {
		products.forEach((product) => {
			const productEl = document.createElement('div')
			productEl.classList.add('product')

			const productThumbnailEl = document.createElement('img')
			productThumbnailEl.src = product.thumbnail
			productEl.append(productThumbnailEl)

			const contentWrapperEl = document.createElement('div')
			contentWrapperEl.classList.add('content-wrapper')

			const productTitleEl = document.createElement('h2')
			productTitleEl.innerText = product.title
			contentWrapperEl.append(productTitleEl)

			const productDescriptionEl = document.createElement('p')
			productDescriptionEl.innerText = product.description
			contentWrapperEl.append(productDescriptionEl)

			productEl.append(contentWrapperEl)
			this.rootEl.append(productEl)
		})
	}

	addLoaderToDom() {
		const loaderEl = document.createElement('p')
		loaderEl.classList.add('loader')
		loaderEl.innerText = 'Fetching products...'
		this.rootEl.append(loaderEl)
	}

	removeLoaderFromDom() {
		const loaderEl = document.getElementsByClassName('loader')
		if (loaderEl.length === 0) return
		loaderEl[0].remove()
	}

	attachInfiniteScrollListener() {
		const SCROLL_BUFFER = 50
		this.rootEl.addEventListener('scroll', async (e) => {
			const { offsetHeight, scrollTop, scrollHeight } = e.target
			if (offsetHeight + scrollTop >= scrollHeight - SCROLL_BUFFER) {
				if (!this.isFetchingProducts && this.products.length < this.total) {
					try {
						this.addLoaderToDom()
						const products = await this.fetchProducts()
						this.addProductsToDom(products)
					} catch (err) {
						console.log('Error loading products while scrolling: ', err)
					} finally {
						this.removeLoaderFromDom()
					}
				}
			}
		})
	}
}

const productPage = new ProductPage('products-wrapper', { limit: 50 })
productPage.init()

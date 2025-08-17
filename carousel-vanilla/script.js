console.log('Hello world')

class Carousel {
	parentEl = null
	slidesWrapperEl = null
	slideEls = []
	slidesPerPage = 3
	slidesGap = 20 // in px
	prevBtnEl = null
	nextBtnEl = null
	constructor(rootId = '', data = { images: [], slidesPerPage: 3 }) {
		this.parentEl = document.getElementById(rootId)
		if (!this.parentEl) {
			throw new Error('Root element not found!')
		}
		this.parentEl.style.position = 'relative'
		this.slidesPerPage = data.slidesPerPage
		this.init(data.images)
	}
	init(images = []) {
		this.addSlides(images)
		this.addNavBtns()
		this.setUpNavListeners()
	}
	addSlides(images) {
		if (images.length === 0) {
			throw new Error('No images passed for the carousel!')
		}
		this.slidesWrapperEl = document.createElement('div')
		this.slidesWrapperEl.classList.add('carousel-wrapper')
		this.slidesWrapperEl.style.gap = this.slidesGap + 'px'
		this.parentEl.append(this.slidesWrapperEl)

		const slideWidth = this.getSlideWidth()
		images.forEach((image, index) => {
			const imgEl = document.createElement('img')
			imgEl.classList.add('slide')
			imgEl.src = image
			imgEl.style.width = slideWidth + 'px'
			imgEl.style.left = (slideWidth + this.slidesGap) * index + 'px'
			this.slideEls.push(imgEl)
			this.slidesWrapperEl.append(imgEl)
		})
		this.setSlidesPosition()
	}
	getSlideWidth() {
		const carouselWidth = this.parentEl.clientWidth
		const eachSlideWidth =
			(carouselWidth - this.slidesGap * (this.slidesPerPage - 1)) / this.slidesPerPage
		return eachSlideWidth
	}
	addNavBtns() {
		this.prevBtnEl = document.createElement('button')
		this.prevBtnEl.innerHTML = 'Prev'
		this.prevBtnEl.style.left = '10px'
		this.parentEl.append(this.prevBtnEl)

		this.nextBtnEl = document.createElement('button')
		this.nextBtnEl.innerHTML = 'Next'
		this.nextBtnEl.style.right = '10px'
		this.parentEl.append(this.nextBtnEl)
	}
	setUpNavListeners() {
		if (!this.prevBtnEl || !this.nextBtnEl) {
			throw new Error("Couldn't add the navigation buttons in the DOM")
		}
		this.nextBtnEl.addEventListener('click', () => {
			const firstSlideEl = this.slideEls.shift()
			const cloneEl = firstSlideEl.cloneNode(true)
			this.slideEls.push(cloneEl)
			this.slidesWrapperEl.append(cloneEl)
			firstSlideEl.remove()
			this.setSlidesPosition()
		})
		this.prevBtnEl.addEventListener('click', () => {
			const lastSlideEl = this.slideEls.pop()
			const cloneEl = lastSlideEl.cloneNode(true)
			this.slideEls.unshift(cloneEl)
			this.slidesWrapperEl.prepend(cloneEl)
			lastSlideEl.remove()
			this.setSlidesPosition()
		})
	}
	setSlidesPosition() {
		const slideWidth = this.getSlideWidth()
		this.slideEls = this.slideEls.map((slide, index) => {
			slide.style.left = (slideWidth + this.slidesGap) * index + 'px'
			return slide
		})
	}
}

new Carousel('carousel', {
	images: [
		'https://images.unsplash.com/photo-1621791555783-3c169bcd7774?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1741557571786-e922da981949?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://plus.unsplash.com/premium_photo-1689518469262-6f9499412ef0?q=80&w=1445&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1749920937484-a61e6a9566a9?q=80&w=1529&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1487792679672-426a0e091886?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1516041774595-cc1b7969480c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	],
	slidesPerPage: 3,
})

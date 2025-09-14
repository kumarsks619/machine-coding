class EventEmitter {
	constructor() {
		this.subscribers = new Map()
	}
	subscribe(eventName, callback) {
		if (typeof callback !== 'function') {
			throw new Error('callback should be a function!!!')
		}
		const subscriberId = Symbol()
		if (!this.subscribers.has(eventName)) {
			this.subscribers.set(eventName, new Map())
		}
		const currentEventMap = this.subscribers.get(eventName)
		currentEventMap.set(subscriberId, callback)
		return {
			release: () => currentEventMap.delete(subscriberId),
		}
	}
	emit(eventName, ...args) {
		if (!this.subscribers.has(eventName)) {
			throw new Error('no such event exist!!!')
		}
		const currentEventMap = this.subscribers.get(eventName)
		currentEventMap.forEach((callback) => {
			callback(...args)
		})
	}
}

const emitter = new EventEmitter()

let vote = 0
const sub1 = emitter.subscribe('upvote', (upvoteBy = 1) => {
	vote += upvoteBy
})
const sub2 = emitter.subscribe('upvote', (upvoteBy = 1) => {
	vote += upvoteBy
})

emitter.emit('upvote', 5)
sub1.release()
emitter.emit('upvote', 5)

console.log(vote)

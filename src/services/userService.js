export const userService = {
	getUser
}

function getUser() {
	return {
		name: 'Daiki Gorō',
		username: 'daikig',
		moves: [],
		// coins: 100,
		crypto: {
			bitcoin: 0.01,
			ethereum: 2,
			cardano: 20
		}
	}
}

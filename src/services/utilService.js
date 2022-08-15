export const sortStr = (arr, sortBy) => {
	console.log(arr)
	return arr.sort((a, b) => {
		if (a[sortBy].toLocaleLowerCase() < b[sortBy].toLocaleLowerCase()) {
			return -1
		}
		if (a[sortBy].toLocaleLowerCase() > b[sortBy].toLocaleLowerCase()) {
			return 1
		}

		return 0
	})
}

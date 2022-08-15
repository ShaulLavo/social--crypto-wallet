import axios from 'axios'
import { storageService } from './storageService.js'

export const cryptoService = {
	getCoinList,
	getCoinById,
	getUserCoins,
	getCurrBitcoinPrice,
	formatCurrency
}

const API = 'https://api.coingecko.com/api/v3/coins'
const KEY = 'coinList'

async function getCoinList(currency = 'USD') {
	const coinList = storageService.load(KEY)
	if (coinList) return coinList

	const { data } = await axios.get(
		`${API}/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
	)
	const coins = _cleanCoins(data)
	storageService.store(KEY, coins)
	return coins
}

async function getCurrBitcoinPrice() {
	const {
		data: {
			bitcoin: { usd }
		}
	} = await axios.get(
		'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD'
	)
	return usd
}

function _cleanCoins(coins) {
	if (!Array.isArray(coins)) {
		const { id, name, image, symbol, market_cap_rank, current_price } = coins
		return {
			id,
			name,
			image,
			symbol,
			market_cap_rank,
			current_price
		}
	}
	return coins.map(
		({ id, name, image, symbol, market_cap_rank, current_price }) => ({
			id,
			name,
			image,
			symbol,
			market_cap_rank,
			current_price
		})
	)
}

async function getCoinById(coinID) {
	//without API not real time only 100 coins
	const coins = await getCoinList()
	const coin = coins.find(coin => coin.id === coinID)
	if (coin) return coin
	//real time & all coins
	const { data } = await axios.get(`${API}/${coinID}`)
	return _cleanCoins(data)
}

function getUserCoins(crypto) {
	// const coins = await getCoinList()
	const coins = Object.keys(crypto).map(id => {
		const coin = getCoinById(id).then(coin => {
			coin.amount = crypto[id]
			coin.value = formatCurrency(coin.amount * coin.current_price, 'USD')
			return coin
		})
		return coin
	})
	coins.push()
	return Promise.all(coins)
}

function formatCurrency(value, currency) {
	if (isNaN(value)) {
		console.log('NaN!')
		return '$5'
	}
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency
	})
	return formatter.format(value)
}

export const HistoricalChart = (id, days = 365, currency) =>
	`${API}/${id}/market_chart?vs_currency=${currency}&days=${days}`

export const TrendingCoins = currency =>
	`${API}/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`

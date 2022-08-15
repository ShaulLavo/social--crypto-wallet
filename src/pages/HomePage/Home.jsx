import { Component } from 'react'
import { userService } from '../../services/userService.js'
import { cryptoService } from '../../services/cryptoService.js'
import { CoinList } from '../../components/CoinCardList.jsx'
import { sortStr } from '../../services/utilService.js'

export class Home extends Component {
	state = {
		userCoins: null,
		totalValue: {
			btcValue: null,
			usdValue: null
		}
	}

	componentDidMount() {
		this.loadUserCoins()
	}
	componentDidUpdate() {}

	async loadUserCoins() {
		const crypto = userService.getUser().crypto
		const userCoins = await cryptoService.getUserCoins(crypto)
		this.setTotalValue(sortStr(userCoins, 'value').reverse())
	}

	async setTotalValue(userCoins) {
		//uncomment for real value
		// const btcPrice = await cryptoService.getCurrBitcoinPrice()
		const btcPrice = 24296
		const totalUsd = this.getTotalValueUsd(userCoins)
		const btcValue = (totalUsd / btcPrice).toFixed(5)
		const usdValue = cryptoService.formatCurrency(totalUsd, 'USD')
		this.setState({
			userCoins,
			totalValue: {
				btcValue,
				usdValue
			}
		})
	}

	getTotalValueUsd(userCoins) {
		return userCoins.reduce((acc, coin) => {
			acc += parseFloat(coin.value.replace('$', '').replace(/,/g, ''))
			return acc
		}, 0)
	}

	render() {
		const {
			userCoins,
			totalValue: { usdValue, btcValue }
		} = this.state
		if (!userCoins) return <div>Loading...</div>
		return (
			<div className="container">
				<h2>Dashboard</h2>
				<h4>Total balance:</h4>
				<h3>{usdValue}</h3>
				<h5>
					<span>&#8383;</span>
					{btcValue}
				</h5>
				<CoinList coins={userCoins} />
			</div>
		)
	}
}

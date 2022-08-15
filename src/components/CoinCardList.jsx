import { CoinPreview } from './CoinCardPreview'

export function CoinList({ coins }) {
	if (!coins) return <div>Loading...</div>
	return (
		<div className="coin-card-container flex">
			{coins.map(coin => (
				<CoinPreview key={coin.id} coin={coin} />
			))}
		</div>
	)
}

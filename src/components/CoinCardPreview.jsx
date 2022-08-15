export function CoinPreview({ coin }) {
	return (
		<div className="coin-card">
			<strong>{coin.name}</strong>
			<p>
				{coin.symbol.toUpperCase()} : {coin.amount}
			</p>
			<img src={coin.image} alt="" />
			<p>{coin.value}</p>
		</div>
	)
}

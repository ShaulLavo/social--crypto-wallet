export function Header({ user }) {
	if (!user) return <div>Loading...</div>
	return (
		<div>
			{' '}
			<h3>{user.name}</h3>
			<small>@{user.username}</small>
		</div>
	)
}

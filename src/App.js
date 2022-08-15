import { Home } from './pages/HomePage/Home.jsx'
import { Header } from './components/Header.jsx'
import { userService } from './services/userService.js'

import './assets/scss/main.scss'
function App() {
	return (
		<>
			<Header user={userService.getUser()}></Header>
			<Home></Home>
		</>
	)
}

export default App

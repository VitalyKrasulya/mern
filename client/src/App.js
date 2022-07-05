import React from "react"
import {useRoutes} from "./routes"
import useAuth from "./hooks/auth.hook"
import {AuthContext} from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Loader from "./components/Loader"


function App() {
	const {token, userId, login, logout, ready} = useAuth()
	const isAuth = !!token
	const route = useRoutes(isAuth)
	
	if (!ready) {
		return <Loader/>
	}
	
	return (
		<AuthContext.Provider value={{token, userId, login, logout, isAuth}}>
			{isAuth && <Navbar/>}
			<div className="container">
				{route}
			</div>
			
		</AuthContext.Provider>
	)
}

export default App

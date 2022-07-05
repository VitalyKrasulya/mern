import React from "react"
import {Route, Routes} from "react-router-dom"
import LinksPage from "./pages/LinksPage"
import CreatePage from "./pages/CreatePage"
import DetailPage from "./pages/DetailPage"
import AuthPage from "./pages/AuthPage"


export const useRoutes = isAuth => {
	if (isAuth) {
		return (
			<Routes>
				<Route path="*" element={<CreatePage/>}/>
				<Route path="/create" element={<CreatePage/>}/>
				<Route path="/links" element={<LinksPage/>}/>
				<Route path="/detail/:id" element={<DetailPage/>}/>
			</Routes>
		)
	}
	
	return (
		<Routes>
			<Route path="*" element={<AuthPage/>}/>
		</Routes>
	)
}
import React, {useCallback, useContext, useEffect, useState} from 'react'
import useHttp from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";

const LinksPage = () => {
	const [links, setLinks] = useState([])
	const {loading, request} = useHttp()
	const {token} = useContext(AuthContext)
	
	const fetchLinks = useCallback(async () => {
		try {
			const fetched = await request("/api/link", "GET", null, {authorization: `Bearer ${token}`})
			setLinks(fetched)
		}catch (e) {
			console.log("!!! Links page fetchLinks error", e.message)
		}
	}, [token, request])
	
	useEffect(() => {
		fetchLinks()
	}, [fetchLinks])
	
	if (loading) {
		return <Loader/>
	}
	
	return (
		<>
			<LinksList links={links}/>
		</>
	)
}

export default LinksPage
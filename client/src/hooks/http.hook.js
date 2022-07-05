import {useCallback, useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const {logout} = useContext(AuthContext)
	const navigate = useNavigate()
	
	const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
		setLoading(true)
		
		try {
			if (body) {
				body = JSON.stringify(body)
				headers["Content-Type"] = "application/json"
			}
			const response = await fetch(url, {method, body, headers})
			
			if (response.status === 500) {
				logout()
				
				navigate("/");
			}
			
			const data = await response.json()
			
			if (!response.ok) {
				throw new Error(data.message || "Something went wrong")
			}
			
			return data
		}catch (e) {
			console.log("!!! Http hooks error", e.message)
			setError(e.message)
			throw e
		} finally {
			setLoading(false)
		}
	}, [logout, navigate])
	
	
	const clearError = useCallback(() => {
	  setError(null)
	}, [])
	
	return {loading, request, error, clearError}
}


export default useHttp
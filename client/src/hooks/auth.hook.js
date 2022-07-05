import {useState, useCallback, useEffect} from 'react';

const storageName = "userData"

const useAuth = () => {
	const [token, setToken] = useState(null)
	const [userId, setUserId] = useState(null)
	const [ready, setReady] = useState(false)
	
	const login = useCallback((jwtToken, uId) => {
		setToken(jwtToken)
		setUserId(uId)
		localStorage.setItem(storageName, JSON.stringify({userId:uId, token:jwtToken}))
	}, [])
	
	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)
		localStorage.removeItem(storageName)
	}, [])
	
	useEffect(() => {
		const data = localStorage.getItem(storageName)
		if (data) {
			const jdata = JSON.parse(data)
			if (jdata && jdata.token) {
				login(jdata.token, jdata.userId)
			}
		}
		setReady(true)
	}, [login])
	
	return {token, userId, login, logout, ready}
}

export default useAuth
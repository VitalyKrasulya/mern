import React, {useContext, useEffect, useState} from 'react'
import useHttp from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";

const CreatePage = () => {
	const {token} = useContext(AuthContext)
	const {request, loading} = useHttp()
	const [link, setLink] = useState("")
	const navigate = useNavigate()
	const location = useLocation()
	
	useEffect(() => {
		window.M.updateTextFields();
	}, [])
	
	useEffect(() => {
		if (location.pathname !== "/create") {
			navigate("/create", { replace: true })
		}
	}, [location, navigate])
	
	const pressHandler = (e) => {
		if (e.key === "Enter"){
			generateLink()
		}
	}
	
	
	const generateLink = async () => {
		try {
			if (!link) {
				throw new Error("Empty link")
			}
			const data = await request("/api/link/generate", "POST", {from: link}, {authorization: `Bearer ${token}`})
			console.log(data)
			setLink("")
			navigate(`/detail/${data.link._id}`)
		}catch (e) {
			console.log("!!! Create page error", e.message)
		}
	}
	
	return (
		<div className="row">
			<div className="col s8 offset-s2" style={{marginTop:"2rem", display:"flex", alignItems:"center"}}>
				<div className="input-field col s9">
					<i className="material-icons prefix">link</i>
					<input
						placeholder="Enter link"
						type="text"
						value={link}
						onChange={e => setLink(e.target.value)}
						onKeyPress={pressHandler}
					/>
				</div>
				<div className="col s3">
					<button
						className="btn  blue-grey waves-effect waves-light"
						disabled={loading || link.length === 0}
						onClick={generateLink}
						style={{marginTop: 0}}
					>
						Create
					</button>
				</div>
			</div>
		</div>
	)
}

export default CreatePage
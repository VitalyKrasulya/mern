import React, {useContext, useEffect, useState} from 'react'
import useHttp from "../hooks/http.hook";
import useToast from "../hooks/toast.hook,js";
import {AuthContext} from "../context/AuthContext";
import "materialize-css"

const AuthPage = () => {
	const auth = useContext(AuthContext)
	const toast = useToast()
	const {loading, request, error, clearError} = useHttp()
	const [form, setForm] = useState({email: "", password: ""})
	
	useEffect(() => {
		if (error) {
			toast(error)
			clearError()
		}
	}, [error, toast, clearError])
	
	useEffect(() => {
		window.M.updateTextFields();
	}, [])
	
	const changeHandler = e => {
		setForm({...form, [e.target.name]: e.target.value})
	}
	
	const registerHandler = async () => {
		try {
			const data = await request("/api/auth/register", "POST", {...form})
			toast(data.message)
		} catch (e) {
			console.log("!!! Auth page register error", e.message)
		}
	}
	
	const loginHandler = async () => {
		try {
			const data = await request("/api/auth/login", "POST", {...form})
			if (data.token && data.userId) {
				auth.login(data.token, data.userId)
			}
		} catch (e) {
			console.log("!!! Auth page login error", e.message)
		}
	}
	
	
	return (
		<div className="row auth">
			<div className="col s6 offset-s3">
				<h2>Minify link</h2>
				
				<div className="card grey darken-2 auth-card">
					<div className="card-content white-text">
						<span className="card-title" style={{paddingBottom: 15}}>Authorization</span>
						
						<div className="row">
							<div className="input-field col s12">
								<i className="material-icons prefix">email</i>
								<input
									id="email"
									placeholder="Email"
									type="email"
									name="email"
									className="validate"
									value={form.email}
									onChange={changeHandler}
								/>
							</div>
							<div className="input-field col s12">
								<i className="material-icons prefix">lock </i>
								<input
									id="password"
									placeholder="Password"
									type="password"
									name="password"
									className="validate"
									value={form.password}
									onChange={changeHandler}
								/>
							</div>
						</div>
					</div>
					
					<div className="card-action right-align">
						<button
							className="btn blue-grey waves-effect waves-light"
							disabled={loading}
							onClick={loginHandler}
							style={{marginRight: 15}}
						>
							Sign in
						</button>
						<button
							className="btn blue-grey waves-effect waves-light"
							disabled={loading}
							onClick={registerHandler}
						>
							Sign up
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AuthPage
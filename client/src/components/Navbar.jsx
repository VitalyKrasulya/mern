import React, {useContext, useEffect, useRef} from 'react'
import {NavLink, Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


const Navbar = () => {
	const {logout} = useContext(AuthContext)
	const navigate = useNavigate()
	const sideNavRef = useRef()
	
	const logoutHandler = (e) => {
		e.preventDefault()
		logout()
		navigate("/");
	}
	
	useEffect(() => {
		window.M.Sidenav.init(sideNavRef.current, {
			closeOnClick: true
		});
	}, [])
	
	return (
		<>
			<nav>
				<div className="nav-wrapper grey darken-1" style={{padding:"0 2rem"}}>
					<span className="brand-logo">Minify link</span>
					<a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
					<ul className="right hide-on-med-and-down">
						<li><NavLink to="/create">Create</NavLink></li>
						<li><NavLink to="/links">Links</NavLink></li>
						<li><Link to="/" onClick={logoutHandler}>Logout</Link></li>
					</ul>
				</div>
			</nav>
			
			<ul className="sidenav" id="slide-out" ref={sideNavRef}>
				<li><NavLink className="sidenav-close" to="/create">Create</NavLink></li>
				<li><NavLink className="sidenav-close" to="/links">Links</NavLink></li>
				<li><Link className="sidenav-close" to="/" onClick={logoutHandler}>Logout</Link></li>
			</ul>
		</>
	);
};

export default Navbar
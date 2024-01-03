import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link aria-current="page" className="navbar-brand border-right" to="/">xd</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link aria-current="page" className="nav-link active" to="/addPizza">Új pizza</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
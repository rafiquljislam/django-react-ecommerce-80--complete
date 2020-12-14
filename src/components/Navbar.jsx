import React from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../State/stateprovider';

const Navbar = () => {
    const [{ cartproductf_uncomplit, profile }, { }] = useStateValue()
    const cartitrmlength = cartproductf_uncomplit?.cartproducts.length;
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar_class">
            <div className="container">
                <Link class="navbar-brand" to='/'>Ecommerce</Link>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        {
                            profile !== null ? (
                                <>
                                    <Link to="/card/" class="nav-link">Card({cartitrmlength ? cartitrmlength : 0})</Link>
                                    <Link class="nav-link">Logout</Link>
                                </>
                            ) :
                                (
                                    <Link to="/login/" class="nav-link">Login</Link>
                                )
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar

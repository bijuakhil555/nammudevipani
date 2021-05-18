import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './footer'
import Nav from './nav'

const Completed=()=> {
    return (
        <div>
            <Nav/>
            <div className="container orderplaced">  Your order is placed</div>
            <Link to="/">
            <button className="ml-5 mb-5 btn btn-success clr112">Continue shopping</button>
            </Link>
            <Footer/>
            
        </div>
    )
}

export default Completed

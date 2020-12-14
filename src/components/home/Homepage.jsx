import React from 'react'
import Allposts from './Allposts'
import Leftside from './Leftside'
import Rightside from './Rightside'

const Homepage = () => {
    return (
        <div className="container-fluid pt-3">
            <div className="row">
                <div className="col-md-2">
                    <Leftside />
                </div>
                <div className="col-md-7">
                    <Allposts />
                </div>
                <div className="col-md-3">
                    <Rightside />
                </div>
            </div>
        </div>
    )
}

export default Homepage

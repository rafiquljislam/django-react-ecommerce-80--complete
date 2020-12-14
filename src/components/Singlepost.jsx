import Axios from 'axios'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { domain, header } from '../env'
import { useStateValue } from '../State/stateprovider'

const Singlepost = ({ item }) => {
    const history = useHistory()
    const [{ profile }, dispatch] = useStateValue()
    const addtocart = async (id) => {
        if (profile !== null) {
            await Axios({
                method: "post",
                url: `${domain}/api/addtocart/`,
                headers: header,
                data: { "id": id }
            }).then((respos) => {
                console.log(respos);
                dispatch({
                    type: "ADD_SINGLE_PEODUCT",
                    addsingleproduct: respos
                })
            })
        }
        else {
            history.push("/login/")
        }
    }
    return (
        <div className="col-md-4 my-2">
            <div className="card">
                <img className="card-img-top allpost__cart_image" src={item.image} alt="Card image cap" />
                <div className="card-body">
                    <Link to={`/product/${item.id}/`}>
                        <h5 className="card-title">{item.name}</h5>
                    </Link>
                    <p className="card-text">
                        {(item.description).substring(0, 50)}... <Link to={`/product/${item.id}/`}> Read more</Link>
                    </p>
                    <Link onClick={() => addtocart(item.id)} className="btn btn-primary">Add to card</Link>
                </div>
            </div>
        </div>
    )
}

export default Singlepost

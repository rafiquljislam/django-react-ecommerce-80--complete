import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { domain, header } from '../../env'
import { useStateValue } from '../../State/stateprovider'

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [{ profile }, dispatch] = useStateValue()
    const { id } = useParams()
    const history = useHistory()
    useEffect(() => {
        const getdata = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/product/${id}/`
            }).then(response => {
                console.log(response.data);
                setProduct(response.data)
            })
        }
        getdata()
    }, [])
    const addtocart = async (idid) => {
        if (profile !== null) {
            await Axios({
                method: "post",
                url: `${domain}/api/addtocart/`,
                headers: header,
                data: { "id": idid }
            }).then((respos) => {
                console.log(respos);
                dispatch({
                    type: "ADD_SINGLE_PEODUCT",
                    addsingleproduct: respos
                })
            })
        } else {
            history.push("/login/")
        }
    }
    return (
        <div className="container">
            {
                product !== null && (
                    <>
                        <div className="row">
                            <img className="w-100" src={product.image} alt="" />
                            <div className="col-md-7 p-2">
                                <h1>{product.name}</h1>
                                <h2><del>{product.marcket_price}</del> {product.selling_price}</h2>
                                <h3>Warranty: {product.warranty}</h3>
                                <h3>Return_policy: {product.return_policy}</h3>
                            </div>
                            <div className="col-md-4 p-3">
                                <p onClick={() => addtocart(product.id)} className="btn btn-info">Add to Cart</p>
                            </div>
                            <p>{product.description}</p>
                        </div>
                    </>
                )
            }
        </div>

    )
}

export default ProductDetails

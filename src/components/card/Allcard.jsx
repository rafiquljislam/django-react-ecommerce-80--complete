import Axios from 'axios'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { domain, header } from '../../env'
import { useStateValue } from '../../State/stateprovider'

const Allcard = () => {
    const [{ cartproductf_uncomplit, profile }, dispatch] = useStateValue()
    let cart_productt_length = 0;
    if (cartproductf_uncomplit !== null) {
        cart_productt_length = cartproductf_uncomplit.cartproducts.length
    } else {
        cart_productt_length = 0;
    }
    console.log(cart_productt_length, "$$$$$$$$$$$$$$$$$$$$$$$");
    const history = useHistory()
    const editcartproduct = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/editcartproduct/`,
            headers: header,
            data: { "id": id }
        }).then((res) => {
            dispatch({
                type: "ADD_SINGLE_PEODUCT",
                addsingleproduct: res
            })
        })
    }
    const delaitecartproduct = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/delatecartproduct/`,
            headers: header,
            data: { "id": id }
        }).then((res) => {
            dispatch({
                type: "ADD_SINGLE_PEODUCT",
                addsingleproduct: res
            })
        })

    }
    const addcartproduct = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/updatecartproduct/`,
            headers: header,
            data: { "id": id }
        }).then((res) => {
            dispatch({
                type: "ADD_SINGLE_PEODUCT",
                addsingleproduct: res
            })
        })
    }
    const delatefullcard = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/delatefullcard/`,
            headers: header,
            data: { "id": id }
        }).then((res) => {

            dispatch({
                type: "ADD_SINGLE_PEODUCT",
                addsingleproduct: res.data
            })
            dispatch({
                type: "ADD_CARTPRODUCT_UNCOMPLIT",
                cartproductf_uncomplit: null
            })
            history.push('/')
        })
    }
    return (
        <div className="container p-3">
            {
                // cartproductf_uncomplit?.cartproducts?.length != 0 ?
                cart_productt_length !== 0 ?

                    <table className="table table-striped">
                        <thead>
                            <th>SN</th>
                            <th>Product</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {
                                cartproductf_uncomplit?.cartproducts.map((data, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{data.product[0].name}</td>
                                        <td>{data.price}</td>
                                        <td>{data.quantity}</td>
                                        <td>{data.subtotal}</td>
                                        <td>
                                            <p onClick={() => editcartproduct(data.id)} className="btn btn-info">-</p>
                                            <p onClick={() => delaitecartproduct(data.id)} className="btn btn-danger mx-1">X</p>
                                            <p onClick={() => addcartproduct(data.id)} className="btn btn-warning">+</p>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="4" className="text-right" >Total</th>
                                <th>{cartproductf_uncomplit?.total}</th>
                                <th>
                                    <Link to="/order/" className="btn btn-success" >OrderNow</Link>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                    :
                    <div>
                        <h1>Thare is no Card Go home and add some Product</h1>
                    </div>
            }
            <div className="row">
                <div className="col">
                    <Link to="/oldorders/" className="btn btn-warning" >Old Orders</Link>
                </div>
                {
                    cart_productt_length !== 0 &&
                    <>
                        <div className="col">
                            <Link onClick={() => delatefullcard(cartproductf_uncomplit.id)} className="btn btn-danger" >Delate Card</Link>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}


export default Allcard

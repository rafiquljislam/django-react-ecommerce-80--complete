import Axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../State/stateprovider'
import { header, domain } from '../../env'

const Order = () => {
    const [{ cartproductf_uncomplit }, { }] = useStateValue()
    // console.log(cartproductf_uncomplit.id);
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const orderData = {
        "cartId": cartproductf_uncomplit.id,
        "address": address,
        "mobile": mobile,
        "email": email
    }
    const ordernow = async () => {
        Axios({
            method: "post",
            url: `${domain}/api/myorder/`,
            headers: header,
            data: orderData
        }).then(response => {
            console.log(response.data);
        })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 p-2">
                    <table className="table table-striped">
                        <thead>
                            <th>SN</th>
                            <th>Product</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
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
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="4" className="text-right" >Total</th>
                                <th>{cartproductf_uncomplit?.total}</th>
                            </tr>
                            <Link to='/card/' className="btn btn-outline-secondary" >Edit Cart</Link>
                        </tfoot>
                    </table>
                </div>
                <div className="col-md-6">
                    <h1>Order Now</h1>
                    <div>
                        <div className="form-group">
                            <label>Address</label>
                            <input onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" placeholder="Address" />
                        </div>
                        <div className="form-group">
                            <label>Mobile</label>
                            <input onChange={(e) => setMobile(e.target.value)} type="text" className="form-control" placeholder="Mobile" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Email" />
                        </div>
                        <button className="btn btn-info" onClick={ordernow}>Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order

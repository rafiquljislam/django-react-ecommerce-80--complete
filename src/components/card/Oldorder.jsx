import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { domain, header } from '../../env'

const Oldorder = () => {
    const [myorder, setMyorder] = useState([])
    const [reload, setReload] = useState(null);
    useEffect(() => {
        const getdata = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/myorder/`,
                headers: header
            }).then((res) => {
                setMyorder(res.data)
            })
        }
        getdata()
    }, [reload])
    const delateorderhistory = async (id) => {
        await Axios({
            method: "delete",
            url: `${domain}/api/myorder/${id}/`,
            headers: header
        }).then((res) => {
            console.log(res.data);
            setReload(res)
        })
    }
    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Totla</th>
                        <th>Product</th>
                        <th>Order Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myorder?.map((order, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>TK. {order?.total}</td>
                                <td>{order?.cartproducts.length}</td>
                                <td>{order?.order_status}</td>
                                <td><Link to={`/oldorders/${order.id}/`} className="btn btn-info">Details</Link></td>
                                <td><p onClick={() => delateorderhistory(order.id)} className="btn btn-danger">Delate</p></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Oldorder

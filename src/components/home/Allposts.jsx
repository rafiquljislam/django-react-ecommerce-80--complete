import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { domain } from '../../env'
import Singlepost from '../Singlepost';

const Allposts = () => {
    const [products, setProducts] = useState({});
    const productlength = Object.keys(products).length

    useEffect(() => {
        const getData = async () => {
            await Axios.get(`${domain}/api/product/`)
                .then((res) => {
                    // console.log(res.data);
                    setProducts(res.data)
                })
        }
        getData()
    }, [])

    const nextclick = async () => {
        const apidata = await Axios.get(`${products.next}`)
        setProducts(apidata.data)
    }
    const postprevious = async () => {
        const apidata = await Axios.get(`${products.previous}`)
        setProducts(apidata.data)
    }

    return (
        <div className="row">
            {
                productlength !== 0 &&
                products.results.map((item, i) => (
                    <Singlepost key={i} item={item} />
                ))
            }
            <div className="pagination_allpost">
                <div>
                    {
                        products.previous && (
                            <Link className="btn btn-danger" onClick={postprevious} >Previous</Link>
                        )
                    }
                </div>
                <div>
                    {
                        products.next && (
                            <Link className="btn btn-info" onClick={nextclick} >Next</Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Allposts

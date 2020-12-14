import Axios from 'axios'
import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Allcard from './components/card/Allcard'
import Oldorder from './components/card/Oldorder'
import Order from './components/card/Order'
import Orderdetails from './components/card/Orderdetails'
import Homepage from './components/home/Homepage'
import ProductDetails from './components/home/ProductDetails'
import LoginPage from './components/LoginPage'
import Navbar from './components/Navbar'
import ProfilePage from './components/ProfilePage'
import { domain, header } from './env'
import { useStateValue } from './State/stateprovider'

const App = () => {
  const [{ addsingleproduct, profile }, dispatch] = useStateValue()
  useEffect(() => {
    const getcart = async () => {
      const fullresponse = await Axios({
        method: "get",
        url: `${domain}/api/mycart/`,
        headers: header
      })
      const allcomplit = [];
      fullresponse?.data.map((data) => {
        if (data.complit) {
          allcomplit.push(data)
          dispatch({
            type: "ADD_CARTPRODUCT_COMPLIT",
            cartproduct_complit: allcomplit
          })
        }
        else {
          dispatch({
            type: "ADD_CARTPRODUCT_UNCOMPLIT",
            cartproductf_uncomplit: data
          })
        }
      })
    }
    getcart()
  }, [addsingleproduct])
  // console.log(window.localStorage.getItem("token"));
  useEffect(() => {

    const getprofile = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/profile/`,
        headers: header
      }).then(response => {
        console.log(response.data);
      }).catch(e => {
        console.log("fdfdfddddddddddd", "###########################################");
      })
    }
    getprofile()

  })

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/product/:id/' component={ProductDetails} />
        {
          profile !== null ? (
            <>
              <Route exact path='/card/' component={Allcard} />
              <Route exact path='/oldorders/' component={Oldorder} />
              <Route exact path='/oldorders/:id/' component={Orderdetails} />
              <Route exact path='/order/' component={Order} />
              <Route exact path='/profile/' component={ProfilePage} />
            </>
          ) :
            (
              <Route exact path='/login/' component={LoginPage} />
            )
        }
      </Switch>
    </BrowserRouter>
  )
}

export default App

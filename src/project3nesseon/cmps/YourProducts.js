import { Routes, Route, Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TotalPurchased from './TotalPurchased'
import Product from './Product'


const YourProducts = () => {
    const { state: basicdata } = useSelector(state => state)
    const [products, setproducts] = useState([])
    const [date, setdate] = useState({ Date: '' })

    const [amountitem, setamountitem] = useState(0)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        let Purchased = basicdata.Purchases
        let Products = basicdata.Products
        let purchaseditem = Purchased.filter(item => item.CustomerID == id)
        // setpurchase
        setamountitem(purchaseditem.length)
        let bigtest = []
        purchaseditem.map(item => {
            Products.filter(pro => pro.ID === item.ProductID ? bigtest.push({
                ID: pro.ID,
                Name: pro.Name,
                Price: pro.Price,
                Quantity: pro.Quantity,
                DATE: item.DATE
            }) : null)
        })
        setproducts(bigtest)
    }, [])
    const add = (item) => {
        console.log(item)
    }

    return (
        <div >

            {/* <h1> Products</h1> */}
            <h1 style={{ borderStyle: 'solid', borderColor: 'black', position: 'absolute', left: '40px', top: '30px' }}>All Your Products</h1>
            <h1 style={{ borderStyle: 'solid', borderColor: 'black', position: 'absolute', left: '40px', top: '80px', marginTop: '20px' }}>{amountitem} products you bought from us</h1>
            <div style={{ width: "400px", height: 'auto', borderStyle: 'solid', borderColor: 'red', textAlign: 'left', position: 'absolute', left: '40px', top: '150px' }}>
                {products.map((item, i) => {
                    return (
                        <p key={i} style={{ marginLeft: '20px' }}>
                            <strong>Name of product :</strong><Link to={`/EditProduct/${item.ID}`}>{item.Name}</Link><br />
                            <strong>Price :</strong>{item.Price}<br />
                            <strong>Quantity :</strong>{item.Quantity}<br />
                            <strong>DATE :</strong>{item.DATE}<br />


                        </p>
                    )
                })}
                <button onClick={() => { navigate(-1) }}>Go Back</button><br />
                Buy more of our products <Link to={`/Products`}>product page</Link>
            </div>
        </div>
    )
}

export default YourProducts
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TotalPurchased from './TotalPurchased'
import Product from './Product'


const Products = () => {
    const { state: basicdata } = useSelector(state => state)
    const [products, setproducts] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        setproducts(basicdata.Products)
        // console.log(`products is:${products}`)
    }, [])

    return (
        <div style={{ borderStyle: 'solid', borderColor: 'black' }}>
            <h1> Products</h1>
            <TotalPurchased />
            <h3>All Products</h3>
            <button onClick={() => { navigate('/Menu') }} style={{ fontSize: `20px`, width: '150px', height: '30px', marginLeft: '15px', textAlign: 'center' }}>Menu Page</button>
            <button onClick={() => { navigate('/Customers') }} style={{ fontSize: `20px`, width: '200px', height: '30px', marginLeft: '15px', textAlign: 'center' }}>Customers Page</button>
            <button onClick={() => { navigate('/Purchased') }} style={{ fontSize: `20px`, width: '200px', height: '30px', marginLeft: '15px', textAlign: 'center' }}>Purchased Page</button><br /><br />
            {products.map(item => < Product key={item.ID} ProductID={item.ID} />)}
        </div>
    )
}

export default Products
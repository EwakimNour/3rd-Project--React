import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Customer from './Customer'

const Customers = () => {
    const { state: basicdata } = useSelector(state => state)
    const [customers, setcustomers] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        setcustomers(basicdata.Customers)
        // console.log(customers)
    }, [])
    return (
        <div style={{ borderStyle: 'solid', borderColor: 'black' }}>
            <h1>Customers </h1>
            <button onClick={() => { navigate('/Menu') }} style={{ fontSize: `20px`, width: '150px', height: '30px', marginLeft: '15px', textAlign: 'center' }}>Menu Page</button>
            <button onClick={() => { navigate('/Products') }} style={{ fontSize: `20px`, width: '150px', height: '30px', marginLeft: '15px', textAlign: 'center' }}>Products Page</button>
            <button onClick={() => { navigate('/Purchased') }} style={{ fontSize: `20px`, width: '200px', height: '30px', marginLeft: '15px', textAlign: 'center' }}>Purchased Page</button><br /><br />
            {customers.map(per => <Customer key={per.ID} CustomerID={per.ID} />)}
        </div >
    )
}

export default Customers
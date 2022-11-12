import { Routes, Route, Link, Outlet, useNavigate, useParams, Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UpdateProduct, DeleteProduct } from '../redux/actions'
import { textAlign } from '@mui/system'
const EditProduct = (props) => {
    const [item, setitem] = useState({ Name: '', Price: '', Quantity: '' })
    const [error, seterror] = useState({ Namerror: '', Pricerror: '', Quantityerror: '' })
    const [showhide, setshowhide] = useState({ show: true, hide: false })
    const [customers, setcustomers] = useState([])
    const { state: basicdata } = useSelector(state => state)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const Updateitem = (datauser) => dispatch(UpdateProduct(datauser))
    const Deleteitem = (datauser) => dispatch(DeleteProduct(datauser))
    useEffect(() => {
        let Products = basicdata.Products
        Products.filter(item => item.ID == id ? setitem(item) : null)
        let Purchased = basicdata.Purchases
        let Customers = basicdata.Customers
        let purchaseditem = Purchased.filter(item => item.ProductID == id)
        let bigtest = []
        purchaseditem.map(item => {
            Customers.filter(per => per.ID === item.CustomerID ? bigtest.push({
                ID: per.ID,
                FirstName: per.FirstName,
                LastName: per.LastName,
                City: per.City,
                DATE: item.DATE
            }) : null)
        })
        if (bigtest.length == 0) {
            setshowhide({ show: false, hide: true })
        } else {
            setshowhide({ show: true, hide: false })
        }
        setcustomers(bigtest)
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!(item.Name) && !(item.Price) && !(item.Quantity)) {
            alert('Missing Data!')
            seterror(prev => ({ ...prev, Namerror: 'Name mandatory', Pricerror: 'Price mandatory', Quantityerror: 'Quantity mandatory' }))
        }
        else if (!(item.Name)) {
            alert('Missing ID!')
            seterror(prev => ({ ...prev, Namerror: 'Name mandatory', Pricerror: '', Quantityerror: '' }))
        } else if (!(item.Price)) {
            alert('Missing Price!')
            seterror(prev => ({ ...prev, Namerror: '', Pricerror: 'Price mandatory', Quantityerror: '' }))
        } else if (!(item.Quantity)) {
            alert('Missing Quantity!')
            seterror(prev => ({ ...prev, Namerror: '', Pricerror: '', Quantityerror: 'Quantity mandatory' }))
        } else {
            seterror(prev => ({ ...prev, Namerror: '', Pricerror: '', Quantityerror: '' }))
            console.log("every thing is ok");
            alert('every thing is ok')

            console.log(Updateitem({
                ID: id,
                Name: item.Name,
                Price: item.Price,
                Quantity: item.Quantity
            }))
            console.log(basicdata.Products)

        }
    }
    const Deletebyid = () => {
        Deleteitem(id)
        navigate(`/Products`)
    }
    return (
        <div style={{ fontSize: `20px` }}>
            {showhide.show &&
                <div style={{ width: "400px", height: 'auto', borderStyle: 'solid', borderColor: 'white', textAlign: 'left', position: 'absolute', left: '40px', top: '50px' }}>
                    <h2>Customers bought this product</h2>
                    {customers.map((item, i) => {
                        return (
                            <p key={i} style={{ marginLeft: '20px' }}>
                                <span><strong>First Name :</strong><Link to={`/EditCustomer/${item.ID}`}>{item.FirstName}</Link></span><br />
                                <span><strong>Last Name :</strong>{item.LastName}</span><br />
                                <span><strong>DATE :</strong>{item.DATE}</span><br />
                            </p>
                        )
                    })}
                </div>
            }
            {showhide.hide &&
                <div style={{ width: "400px", height: 'auto', borderStyle: 'solid', borderColor: 'white', textAlign: 'left', position: 'absolute', left: '40px', top: '50px' }}>
                    <h2>No Customers bought this product</h2>
                </div>
            }

            <div style={{ width: "400px", height: '250px', borderStyle: 'solid', borderColor: 'white', textAlign: 'center', position: 'absolute', left: '600px', top: '50px' }}>
                <h1>Edit Product</h1>
                Product id is : {id}<br />
                Name: <input type="text" value={item.Name} onChange={e => setitem(prev => ({ ...prev, Name: e.target.value }))} style={{ margin: '20px' }} /><br />
                {error.Namerror && <div style={{ color: 'red' }}>{error.Namerror}</div>}
                Price: <input type="text" value={item.Price} onChange={e => setitem(prev => ({ ...prev, Price: e.target.value }))} style={{ margin: '20px' }} /><br />
                {error.Pricerror && <div style={{ color: 'red' }}>{error.Pricerror}</div>}
                Quantity: <input type="text" value={item.Quantity} onChange={e => setitem(prev => ({ ...prev, Quantity: e.target.value }))} style={{ margin: '20px' }} /><br />
                {error.Quantityerror && <div style={{ color: 'red' }}>{error.Quantityerror}</div>}
                <button onClick={handleSubmit} style={{ marginLeft: '20px' }}>Update</button>
                <button onClick={Deletebyid} style={{ marginLeft: '20px' }}>Delete</button>
                <button onClick={() => { navigate(`/Products`) }} style={{ marginLeft: '20px' }}>Product Page</button>
            </div>
        </div >
    )
}

export default EditProduct
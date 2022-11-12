import { Link, useNavigate, useParams, Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UpdateCustomer, DeleteCustomer } from '../redux/actions'

const EditCustomer = (props) => {
    const [item, setitem] = useState({ FirstName: '', LastName: '', City: '' })
    const [error, seterror] = useState({ FirstNamerror: '', LastNamerror: '', Cityerror: '' })
    const [showhide, setshowhide] = useState({ show: true, hide: false })
    const [products, setproducts] = useState([])
    const { state: basicdata } = useSelector(state => state)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const Updateitem = (datauser) => dispatch(UpdateCustomer(datauser))
    const Deleteitem = (datauser) => dispatch(DeleteCustomer(datauser))
    useEffect(() => {
        let Customers = basicdata.Customers
        Customers.filter(item => item.ID == id ? setitem(item) : null)
        let Purchased = basicdata.Purchases
        let Products = basicdata.Products
        let purchaseditem = Purchased.filter(item => item.CustomerID == id)
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
        if (bigtest.length == 0) {
            setshowhide({ show: false, hide: true })
        } else {
            setshowhide({ show: true, hide: false })
        }
        setproducts(bigtest)
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!(item.FirstName) && !(item.LastName) && !(item.City)) {
            alert('Missing Data!')
            seterror(prev => ({ ...prev, FirstNamerror: 'First Name mandatory', LastNamerror: 'Last Name mandatory', Cityerror: 'City mandatory' }))
        }
        else if (!(item.FirstName)) {
            alert('Missing First Name!')
            seterror(prev => ({ ...prev, FirstNamerror: 'First Name mandatory', LastName: '', Cityerror: '' }))
        } else if (!(item.LastName)) {
            alert('Missing Last Name!')
            seterror(prev => ({ ...prev, FirstNamerror: '', LastName: 'Last Name mandatory', Cityerror: '' }))
        } else if (!(item.City)) {
            alert('Missing City!')
            seterror(prev => ({ ...prev, FirstNamerror: '', LastName: '', Cityerror: 'City mandatory' }))
        } else {
            seterror(prev => ({ ...prev, FirstNamerror: '', LastName: '', Cityerror: '' }))
            console.log("every thing is ok");
            alert('every thing is ok')
            console.log(basicdata.Customers)
            console.log(Updateitem({
                ID: id,
                FirstName: item.FirstName,
                LastName: item.LastName,
                City: item.City
            }))
            console.log(basicdata.Customers)
        }
    }
    const Deletebyid = () => {
        Deleteitem(id)
        navigate(`/Customers`)
    }
    return (
        <div style={{ fontSize: `20px` }}>
            {showhide.show &&
                <div style={{ width: "400px", height: 'auto', borderStyle: 'solid', borderColor: 'white', textAlign: 'left', position: 'absolute', left: '40px', top: '50px' }}>
                    <h2>Things you bought from us</h2>
                    {products.map((item, i) => {
                        return (
                            <p key={i} style={{ marginLeft: '20px' }}>
                                <span ><strong style={{ margin: '20px' }}>Name of product :</strong><Link to={`/EditProduct/${item.ID}`}>{item.Name}</Link></span><br />
                                <span ><strong style={{ margin: '20px' }}>Price :</strong>{item.Price}</span><br />
                                <span ><strong style={{ margin: '20px' }}>Quantity :</strong>{item.Quantity}</span><br />
                                <span ><strong style={{ margin: '20px' }}>DATE :</strong>{item.DATE}</span><br />
                            </p>
                        )
                    })}
                </div>
            }
            {showhide.hide &&
                <div style={{ width: "400px", height: 'auto', borderStyle: 'solid', borderColor: 'white', textAlign: 'left', position: 'absolute', left: '40px', top: '50px' }}>
                    <h2>You have not yet bought anything from our store</h2>
                </div>
            }
            <div style={{ width: "400px", height: '300px', borderStyle: 'solid', borderColor: 'white', textAlign: 'center', position: 'absolute', left: '600px', top: '50px' }}>
                <h1>Edit Customer</h1>
                Customer id is : {id}<br />
                First Name: <input type="text" value={item.FirstName} onChange={e => setitem(prev => ({ ...prev, FirstName: e.target.value }))} style={{ margin: '20px' }} /><br />
                {error.FirstNamerror && <div style={{ color: 'red' }}>{error.FirstNamerror}</div>}
                LastName: <input type="text" value={item.LastName} onChange={e => setitem(prev => ({ ...prev, LastName: e.target.value }))} style={{ margin: '20px' }} /><br />
                {error.LastNamerror && <div style={{ color: 'red' }}>{error.LastNamerror}</div>}
                City: <input type="text" value={item.City} onChange={e => setitem(prev => ({ ...prev, City: e.target.value }))} style={{ margin: '20px' }} /><br />
                {error.Cityerror && <div style={{ color: 'red' }}>{error.Cityerror}</div>}
                <button onClick={handleSubmit} style={{ marginLeft: '20px' }}>Update</button>
                <button onClick={Deletebyid} style={{ marginLeft: '20px' }}>Delete</button>
                <button onClick={() => { navigate(`/Customers`) }} style={{ marginLeft: '20px' }}>Customer Page</button>
            </div>
        </div >
    )
}

export default EditCustomer
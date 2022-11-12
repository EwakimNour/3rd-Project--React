import { Link, useParams, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ADDPurchase } from '../redux/actions'
import { width } from '@mui/system'

const Customer = (props) => {
    const { state: basicdata } = useSelector(state => state)
    const [customer, setcustomer] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    const [purchase, setpurchase] = useState({ ID: '', CustomerID: 1, ProductID: '', DATE: '' })
    const [products, setproducts] = useState([])
    const [showhide, setshowhide] = useState({ yourorder: true, show: false, hide: true })
    const dispatch = useDispatch()
    const AddPurchase = (datauser) => dispatch(ADDPurchase(datauser))
    useEffect(() => {
        let Customers = basicdata.Customers
        Customers.filter(per => per.ID == props.CustomerID ? setcustomer(per) : null)
        let products = basicdata.Products
        setproducts(products)
        // console.log(customers)
        let Purchased = basicdata.Purchases
        let d = new Date()
        let month = d.getMonth() + 1
        month < 10 ? month = `0${month}` : month = month
        let today = `${d.getDate()}.${month}.${d.getFullYear()}`
        // console.log(today)
        setpurchase(prev => ({ ...prev, ID: Purchased.length + 1, CustomerID: props.CustomerID, DATE: today }))
        let purchaseditem = Purchased.filter(item => item.CustomerID == props.CustomerID)
        if (purchaseditem.length == 0) {
            setshowhide(prev => ({ ...prev, yourorder: false }))
        }

    }, [])
    const showhiden = () => {
        let s = showhide.show
        let h = showhide.hide
        setshowhide(prev => ({ ...prev, show: !s, hide: !h }))
    }
    const Add = () => {
        AddPurchase(purchase)
        setpurchase(prev => ({ ...prev, ProductID: products[0].ProductID }))
        alert(`The product you selected was added to your ordered`)
        setshowhide(prev => ({ ...prev, yourorder: true }))
        showhiden()
    }
    return (
        <div style={{ borderStyle: 'solid', borderColor: 'white', height: '200px', marginLeft: '20px', fontSize: `20px` }}>
            {/* <h1>Customer</h1> */}
            {/* {props.CustomerID}<br /> */}
            <div style={{ borderStyle: 'solid', borderColor: 'white', width: '500px', height: '180px', position: 'relative', top: '10px' }} >
                <strong>First Name :</strong> <Link to={`/EditCustomer/${customer.ID}`}>{customer.FirstName}</Link> <br /><br />
                <strong>Last Name :</strong> {customer.LastName} <br /><br />
                <strong>City :</strong> {customer.City} <br /><br />
                {showhide.yourorder && <>All Your Products <button onClick={() => { navigate(`/YourProducts/${props.CustomerID}`) }}>Click Here</button></>}
            </div>
            <div style={{ position: 'relative', left: '900px', bottom: '180px', marginTop: '20px', borderStyle: 'solid', borderColor: 'white', width: '500px', height: '150px' }}>
                {showhide.show &&
                    <div>
                        <strong>Please Choose Product</strong><br /><br />
                        <select
                            value={purchase.ProductID}
                            onChange={e => setpurchase(prev => ({ ...prev, ProductID: e.target.value }))}
                            style={{ width: '200px', height: '20px' }}>
                            {products.map(item => {
                                return (
                                    <option key={item.ID} value={item.ID}>{item.Name}</option>
                                )
                            })}
                        </select>
                        <br /><br />
                        <button onClick={Add} style={{ marginRight: '20px', marginLeft: '10px', width: '120px', height: '25px' }}>Buy Product</button>
                        <button onClick={showhiden} style={{ width: '60px', height: '25px' }}>Cancel</button>
                    </div>
                }
                {showhide.hide &&
                    <div>
                        <strong>For another purchase of our products</strong><br /><br /><button onClick={showhiden}>Click Here</button>
                    </div>
                }
            </div>
        </div >
    )
}

export default Customer
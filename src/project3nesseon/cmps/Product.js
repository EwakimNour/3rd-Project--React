import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ADDPurchase } from '../redux/actions'



const Product = (props) => {
    const { state: basicdata } = useSelector(state => state)
    const [product, setproduct] = useState({})
    const [customers, setcustomers] = useState([])
    const [showhide, setshowhide] = useState({ show: false, hide: true })
    const [purchase, setpurchase] = useState({ ID: '', CustomerID: 0, ProductID: '', DATE: '' })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const AddPurchase = (datauser) => dispatch(ADDPurchase(datauser))
    useEffect(() => {
        let Products = basicdata.Products
        Products.filter(item => item.ID == props.ProductID ? setproduct(item) : null)
        let customers = basicdata.Customers
        setcustomers(customers)
        // console.log(customers)
        let Purchased = basicdata.Purchases
        let d = new Date()
        let month = d.getMonth() + 1
        month < 10 ? month = `0${month}` : month = month
        let today = `${d.getDate()}.${month}.${d.getFullYear()}`
        // console.log(today)
        setpurchase(prev => ({ ...prev, ID: Purchased.length + 1, ProductID: props.ProductID, DATE: today }))
    }, [])
    const showhiden = () => {
        let s = showhide.show
        let h = showhide.hide
        setshowhide({ show: !s, hide: !h })
    }
    const Add = () => {
        AddPurchase(purchase)
        alert(`The product you selected was added to your ordered`)
        showhiden()
    }

    return (
        <div style={{ height: '180px', marginLeft: '20px', fontSize: `20px` }} >
            {/* <h1> Product</h1> */}
            {/* <h3>All Products</h3> */}
            {/* {props.ProductID} */}
            <div style={{ width: '500px', height: '150px', position: 'relative', top: '10px' }}>
                <strong>Name Of Product :</strong> <Link to={`/EditProduct/${product.ID}`}>{product.Name}</Link> <br /><br />
                <strong>Price :</strong> {product.Price} <br /><br />
                <strong>Quantity :</strong> {product.Quantity} <br />
                <br />
            </div>
            <div style={{ position: 'relative', left: '900px', bottom: '170px', marginTop: '20px', width: '500px', height: '160px' }}>
                {showhide.show &&
                    <div>
                        <strong>Please fill in your details</strong><br /><br />

                        <strong>Name : </strong>
                        <select
                            value={purchase.CustomerID}
                            onChange={e => setpurchase(prev => ({ ...prev, CustomerID: e.target.value }))}
                            style={{ width: '200px', height: '20px' }}>
                            {customers.map(person => {
                                return (
                                    <option key={person.ID} value={person.ID}>{person.FirstName} {person.LastName}</option>
                                )
                            })}
                        </select>
                        <br /><br />
                        <strong>Data :</strong> < input type='text' value={purchase.DATE} onChange={e => setpurchase(prev => ({ ...prev, DATE: e.target.value }))} /><br /><br />
                        <button onClick={Add} style={{ marginRight: '40px', marginLeft: '10px', width: '80px', height: '25px' }}>SAVE</button>
                        <button onClick={showhiden} style={{ width: '60px', height: '25px' }}>Cancel</button>
                    </div>
                }
                {showhide.hide &&
                    <div>
                        <strong>Buy this product again</strong>
                        <br /><br />
                        <button onClick={showhiden}>ADD</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default Product
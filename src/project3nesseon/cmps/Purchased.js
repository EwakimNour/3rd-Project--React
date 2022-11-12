import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Purchased = () => {
    const { state: basicdata } = useSelector(state => state)
    const [customers, setcustomers] = useState([])
    const [products, setproducts] = useState([])
    const [purchases, setpurchases] = useState([])
    const [searchpurchase, setsearchpurchase] = useState({ CustomerID: 0, ProductID: 0, DATE: '' })
    const [purchaseshow, setpurchaseshow] = useState([])
    const navigate = useNavigate()
    const [showhide, setshowhide] = useState({ show: false, hide: false })

    useEffect(() => {
        let customers = basicdata.Customers
        let stamcust = { ID: 0, FirstName: 'Select', LastName: 'Name', City: '' }
        customers = [stamcust, ...customers]
        setcustomers(customers)
        let products = basicdata.Products
        let stampro = { ID: 0, Name: 'Select Product', Price: '', Quantity: '' }
        products = [stampro, ...products]
        setproducts(products)
        let purchases = basicdata.Purchases
        setpurchases(purchases)
        let Purchased = basicdata.Purchases
        let d = new Date()
        let month = d.getMonth() + 1
        month < 10 ? month = `0${month}` : month = month
        let today = `${d.getDate()}.${month}.${d.getFullYear()}`
        setsearchpurchase(prev => ({ ...prev, CustomerID: customers[0].ID, DATE: today }))
    }, [])
    const showhiden = () => {

        setshowhide({ show: true, hide: false })
        setshowhide({ show: false, hide: true })
    }
    const Searching = (arr) => {
        let arrsearch = []
        arr.map(pur => {
            let custname = customers.filter(per => per.ID === pur.CustomerID)
            let proname = products.filter(item => item.ID === pur.ProductID)
            let objsearch = {
                ID: pur.ID,
                CustomerName: `${custname[0].FirstName} ${custname[0].LastName}`,
                ProductName: `${proname[0].Name}`,
                DATE: pur.DATE
            }
            arrsearch = [...arrsearch, objsearch]
        })
        setpurchaseshow(arrsearch)
    }
    const Serech = () => {
        let arrsearch = []
        let searchelementarr = []
        let CustomerID = searchpurchase.CustomerID
        let ProductID = searchpurchase.ProductID
        let DATE = searchpurchase.DATE
        let lendate = DATE.length
        // all no
        if (CustomerID == 0 && ProductID == 0 && lendate == 0) {
            searchelementarr = purchases
        }
        // customer id=yes ,  product id=yes , date = no
        else if (CustomerID > 0 && ProductID > 0 && lendate == 0) {
            searchelementarr = purchases.filter(pur => pur.CustomerID === CustomerID && pur.ProductID === ProductID)
        }// customer id=yes ,  product id=no , date = yes
        else if (CustomerID > 0 && ProductID == 0 && lendate > 0) {
            searchelementarr = purchases.filter(pur => pur.CustomerID === CustomerID && pur.DATE === DATE)
        }
        // customer id=no ,  product id=yes , date = yes
        else if (CustomerID == 0 && ProductID > 0 && lendate > 0) {
            searchelementarr = purchases.filter(pur => pur.ProductID === ProductID && pur.DATE === DATE)
        }
        // customer id=yes ,  product id=no , date = no
        else if (CustomerID > 0 && ProductID == 0 && lendate == 0) {
            searchelementarr = purchases.filter(pur => pur.CustomerID === CustomerID)
        }
        // customer id=no ,  product id=yes , date = no
        else if (CustomerID == 0 && ProductID > 0 && lendate == 0) {
            searchelementarr = purchases.filter(pur => pur.ProductID === ProductID)
        }
        // customer id=no ,  product id=no , date = yes
        else if (CustomerID == 0 && ProductID == 0 && lendate > 0) {
            searchelementarr = purchases.filter(pur => pur.DATE === DATE)
        } else {
            searchelementarr = purchases.filter(pur => pur.CustomerID === CustomerID && pur.ProductID === ProductID && pur.DATE === DATE)
        }
        if (searchelementarr.length == 0) {
            setshowhide({ show: false, hide: true })
        } else {
            setshowhide({ show: true, hide: false })
            Searching(searchelementarr)
        }
        // console.log(searchelementarr)
    }
    return (
        <div style={{ marginLeft: '15px' }}>
            <h1>Purchased </h1>
            <button onClick={() => { navigate('/Menu') }} style={{ fontSize: `20px`, width: '150px', height: '30px', marginLeft: '15px', textAlign: 'center' }}>Menu Page</button>
            <button onClick={() => { navigate('/Products') }} style={{ fontSize: `20px`, width: '150px', height: '30px', marginLeft: '15px', textAlign: 'center' }}>Products Page</button>
            <button onClick={() => { navigate('/Customers') }} style={{ fontSize: `20px`, width: '200px', height: '30px', marginLeft: '15px', textAlign: 'center' }}>Customers Page</button><br /><br />
            <h2>Look for one specific receipt</h2>
            <span style={{ fontSize: `25px` }}>First you need to choose the full name of the customer</span>
            <select
                value={searchpurchase.CustomerID}
                onChange={e => setsearchpurchase(prev => ({ ...prev, CustomerID: +e.target.value }))}
                style={{ width: '200px', height: '30px', marginLeft: '15px', textAlign: 'left', fontSize: `20px` }}>
                {customers.map(person => {
                    return (
                        <option key={person.ID} value={person.ID}>{person.FirstName} {person.LastName}</option>
                    )
                })}
            </select>
            <br /><br />
            <span style={{ fontSize: `25px` }} > Then must choose the product</span>
            <select
                value={searchpurchase.ProductID}
                onChange={e => setsearchpurchase(prev => ({ ...prev, ProductID: +e.target.value }))}
                style={{ fontSize: `20px`, width: '200px', height: '30px', marginLeft: '15px', textAlign: 'center' }}>
                {products.map(item => {
                    return (
                        <option key={item.ID} value={item.ID}>{item.Name}</option>
                    )
                })}
            </select> <span style={{ fontSize: `25px` }} > At the final </span>
            <input type="text" style={{ fontSize: `20px`, width: '150px' }} value={searchpurchase.DATE} onChange={e => setsearchpurchase(prev => ({ ...prev, DATE: e.target.value }))} />
            <button onClick={Serech} style={{ fontSize: `20px`, width: '100px', height: '30px', marginLeft: '15px', textAlign: 'center' }}>Serech</button>
            <br /><br />
            {showhide.show &&
                <div>
                    <table border='1'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Customer Name</th>
                                <th>Product Name</th>
                                <th>DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseshow.map((pur, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{pur.CustomerName}</td>
                                        <td>{pur.ProductName}</td>
                                        <td>{pur.DATE}</td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>
                </div>
            }
            <br /><br />
            {showhide.hide &&
                <div style={{ fontSize: `25px` }}>
                    <strong>Sorry but we did not find any shopping for the data you entered</strong><br /><br />
                    <strong>Make sure you enter the purchase data you are looking for correctly</strong>
                    <br /><br />
                </div>
            }
        </div >
    )
}

export default Purchased
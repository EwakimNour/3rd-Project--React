import { Routes, Route, useNavigate } from 'react-router-dom'
import React from 'react'
import Main from './Main';
import Products from './cmps/Products';
import EditProduct from './cmps/EditProduct';
import Customers from './cmps/Customers';
import EditCustomer from './cmps/EditCustomer';
import Purchased from './cmps/Purchased';
import YourProducts from './cmps/YourProducts';

function RoutesPage() {
    const navigate = useNavigate()


    return (
        <div>
            <Routes>
                <Route path='/Menu' element={<Main />} />
                <Route path='/Products' element={<Products />} />
                {/* <Route path='/Products/:id' element={<Products />} /> */}
                <Route path='/EditProduct/:id' element={<EditProduct />} />
                <Route path='/Customers' element={<Customers />} />
                <Route path='/EditCustomer/:id' element={<EditCustomer />} />
                <Route path='/Purchased' element={<Purchased />} />
                <Route path='YourProducts/:id' element={<YourProducts />} />
            </Routes>
        </div>
    );
}

export default RoutesPage;

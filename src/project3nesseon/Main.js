import { useNavigate } from 'react-router-dom'
import React from 'react'


function Main() {
    const navigate = useNavigate()


    return (
        <div>
            <table border='1' style={{ borderStyle: 'solid', borderColor: 'GrayText', margin: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: 'green' }}>Main Page</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td onClick={() => { navigate(`/Products`) }}>Products Page</td>
                    </tr>
                    <tr>
                        <td onClick={() => { navigate(`/Customers`) }}>Customers Page</td>
                    </tr>
                    <tr>
                        <td onClick={() => { navigate(`/Purchased`) }}>Purchased Page</td>
                    </tr>
                </tbody>

            </table>
        </div>
    );
}

export default Main;

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const TotalPurchased = () => {
    const { state: basicdata } = useSelector(state => state)
    const [totalPurchased, settotalPurchased] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        let Purchased = basicdata.Purchases
        settotalPurchased(Purchased.length)
        // console.log(Purchased.length)
    })

    return (
        <div >

            <h1> Total amount of purchased is {totalPurchased}</h1>
        </div>
    )
}

export default TotalPurchased
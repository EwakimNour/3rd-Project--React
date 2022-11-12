const initialState = {
    Products: [
        { ID: 1, Name: 'Tv', Price: 789, Quantity: 10 },
        { ID: 2, Name: 'Washer', Price: 978, Quantity: 8 },
        { ID: 3, Name: 'Phone', Price: 897, Quantity: 12 },
        { ID: 4, Name: 'Speaker', Price: 465, Quantity: 9 },
        { ID: 5, Name: 'Battery', Price: 698, Quantity: 11 },
    ],
    Customers: [
        { ID: 1, FirstName: 'Leanne', LastName: 'Graham', City: 'Gwenborough' },
        { ID: 2, FirstName: 'Ervin', LastName: 'Howell', City: 'Wisokyburgh' },
        { ID: 3, FirstName: 'Clementine', LastName: 'Bauch', City: 'McKenziehaven' },
        { ID: 4, FirstName: 'Patricia', LastName: 'Lebsack', City: 'South Elvis' },
        { ID: 5, FirstName: 'Chelsey', LastName: 'Dietrich', City: 'Roscoeview' }
    ],
    Purchases: [
        { ID: 1, CustomerID: 2, ProductID: 3, DATE: '02.05.2022' },
        { ID: 2, CustomerID: 1, ProductID: 3, DATE: '09.03.2022' },
        { ID: 3, CustomerID: 2, ProductID: 1, DATE: '04.04.2022' },
        { ID: 4, CustomerID: 4, ProductID: 2, DATE: '10.01.2022' },
        { ID: 5, CustomerID: 3, ProductID: 5, DATE: '06.05.2022' }
    ],
}
// 09.03.2022
const applyDataChange = (state = initialState, action) => {
    switch (action.type) {
        case 'ADDPurchase':
            let Addpurchase = {
                ID: Number(state.state.Purchases.length + 1),
                CustomerID: Number(action.payload.CustomerID),
                ProductID: Number(action.payload.ProductID),
                DATE: action.payload.DATE
            }
            let currproduct = {}
            state.state.Products.filter(item => item.ID === Addpurchase.ProductID ? currproduct = item : null)
            currproduct = { ...currproduct, Quantity: Number(currproduct.Quantity - 1) }
            let cproducts = state.state.Products.filter(item => item.ID === currproduct.ID ? Object.assign(item, currproduct) : item)
            state = { ...state.state, Purchases: [...state.state.Purchases, Addpurchase], Products: cproducts }
            console.log(state)
            return { state: state }
        case 'UpdateProduct':
            let itemupdate = {
                ID: Number(action.payload.ID),
                Name: action.payload.Name,
                Price: Number(action.payload.Price),
                Quantity: Number(action.payload.Quantity)
            }
            let currentProducts = state.state.Products.filter(item => item.ID === itemupdate.ID ? Object.assign(item, itemupdate) : item)
            state = { ...state.state, Products: currentProducts }
            return { state: state }
        case 'DeleteProduct':
            let currProducts = state.state.Products.filter(item => item.ID !== Number(action.payload) ? item : null)
            let currPurchases = state.state.Purchases.filter(item => item.ProductID !== Number(action.payload) ? item : null)
            state = { ...state.state, Products: currProducts, Purchases: currPurchases }
            return { state: state }
        case 'UpdateCustomer':
            let personupdate = {
                ID: Number(action.payload.ID),
                FirstName: action.payload.FirstName,
                LastName: action.payload.LastName,
                City: action.payload.City
            }
            let currentCustomers = state.state.Customers.filter(per => per.ID === personupdate.ID ? Object.assign(per, personupdate) : per)
            state = { ...state.state, Customers: currentCustomers }
            return { state: state }
        case 'DeleteCustomer':
            let currCustomers = state.state.Customers.filter(per => per.ID !== Number(action.payload) ? per : null)
            let curPurchases = state.state.Purchases.filter(per => per.CustomerID !== Number(action.payload) ? per : null)
            state = { ...state.state, Customers: currCustomers, Purchases: curPurchases }
            return { state: state }
        default:
            return { state: state };
    }
}

export default applyDataChange

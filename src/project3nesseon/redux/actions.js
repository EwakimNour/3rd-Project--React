const UpdateProduct = (data) => (
    {
        type: 'UpdateProduct',
        payload: data
    }
)
const DeleteProduct = (data) => (
    {
        type: 'DeleteProduct',
        payload: data
    }
)
const UpdateCustomer = (data) => (
    {
        type: 'UpdateCustomer',
        payload: data
    }
)
const DeleteCustomer = (data) => (
    {
        type: 'DeleteCustomer',
        payload: data
    }
)
const ADDPurchase = (data) => (
    {
        type: 'ADDPurchase',
        payload: data
    }
)
const Getpurchase = (data) => (
    {
        type: 'Getpurchase',
        payload: data
    }
)
export { UpdateProduct, DeleteProduct, UpdateCustomer, DeleteCustomer, ADDPurchase, Getpurchase }
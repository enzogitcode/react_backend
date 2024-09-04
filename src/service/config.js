import axios from 'axios'

export const apiURL = `https://backend-entrega-final-8xc1.onrender.com/api`

const instance = axios.create({
    baseURL: `${apiURL}`,
    withCredentials: true
})


//user

export const registerRequest = async (user) => await instance.post(`/users/register`, user)

export const loginRequest = async (user) => await instance.post(`/users/login`, user)

export const profileRequest = async () => await instance.get(`/users/profile`)

export const deleteUser = async (uid) => await instance.delete(`/users/profile/${uid}`)

export const logout = async () => await instance.post(`users/logout`)

export const uploadDocs = async (uid, data) => await instance.put(`/users/${uid}/documents`, data)

export const changeRole = async (user, uid) => await instance.put(`/users/premium/${uid}`, user)

export const deleteInactiveUsers= async (uid) => await instance.delete(`users/inactiveusers`)
 
//products
export const getProducts = async () => await instance.get(`/products`)

export const getProductById = async (pid) => await instance.get(`/products/${pid}`)

export const addProduct = async (newProduct) => await instance.post(`/products`, newProduct)

export const updateProducts = async (pid, product) => await instance.put(`/products/${pid}`, product)

export const deleteProducts = async (pid) => await instance.delete(`/products/${pid}`)

//carts
export const getCartById = async (cid) => await instance.get(`/carts/${cid}`)

export const addToCart = async (cid, pid, product, quantity) => await instance.post(`/carts/${cid}/products/${pid}`, { cid, pid, product, quantity })

export const purchase = async (cid) => await instance.post(`/carts/${cid}/purchase`)
export const getTicket = async (cid) => await instance.get(`/carts/${cid}/purchase`)

export const deleteProductCart = async (cid, pid) => await instance.delete(`/carts/${cid}/products/${pid}`)

export const clearCart = async (cid) => await instance.delete(`/carts/${cid}`)

export const updateCart = async (cid, pid, product, quantity) => await instance.put(`/carts/${cid}/products/${pid}`, { cid, pid, product, quantity })

export const updateQuantity = async (cid, pid, quantity) => await instance.put(`/carts/${cid}/products/${pid}`, pid, quantity)

export default instance
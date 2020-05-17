const KEY = 'heimamm_token'

const setToken = token => {
     window.localStorage.setItem(KEY,token)
 }
 const getToken = () => {
    window.localStorage.getItem(KEY)
}
const removeToken = () => {
    window.localStorage.removeItem(KEY)
}

export {setToken, getToken,removeToken}
import axios from 'axios'
export default {
    isAuthenticated(){
        return localStorage.getItem("access_token") != null
    },
    guest(){
        return localStorage.getItem("access_token") == null
    },
    getItem(key) {
        return this.Session.getItem(key)
    },
    getAuthHeader() {
        if (localStorage.getItem('access_token') != null) {
            let accessToken = localStorage.getItem('access_token');
            return "Bearer " + accessToken
        }
        return null
    },
    addAuthHeaders(){
        axios.defaults.headers.common["Authorization"] = this.getAuthHeader()
    },
    logout(){
        localStorage.removeItem("access_token")
    }
}
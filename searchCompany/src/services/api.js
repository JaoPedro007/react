import axios from "axios";


const api = axios.create({
    baseURL:'https://api.gtech.site/companies'
})

export default api;
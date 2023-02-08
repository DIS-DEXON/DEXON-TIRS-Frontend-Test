import Axios from 'axios'
import store from '/src/store'

var url;
if (store.state.mode == 'dev') url = store.state.urlApi.dev;
else if (store.state.mode == 'prod') url = store.state.urlApi.prod;

const axios = Axios.create({
    baseURL: url,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    timeout: 60000,
})

export default axios

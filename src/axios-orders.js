import axios from 'axios'

const orderInstance = axios.create({
    baseURL : 'https://my-react-burger2811.firebaseio.com/'
})

export default orderInstance
import React, {Component} from 'react'
import Modal from '../components/ui/Modal/Modal'
import Aux from './_Aux'

const withErrorHandler = (WrappedComponent , axios) => {
    
    return class extends Component {
        constructor () {
            super ()
            this.state = {
                error : null
            }
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState ({error: null})
                return request
            })
            this.responseInterceptor = axios.interceptors.response.use(response => response , (err) => {
                setTimeout(() => this.setState({error: err}) , 1200)
            })
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseInterceptor)
        }

        errorConfirmationHandler = () => {
            this.setState({error: null})
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show = {this.state.error}
                        closeModal = {this.errorConfirmationHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}
export default withErrorHandler

import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postal: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        //stops reloading of page
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'John Pawlak',
                address: {
                    street: 'Teststreet',
                    zipcode: '434543',
                    country: 'Canada'
                },
                email:'johnp@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false})
            })
    }

    render () {
        let form = (
            <form>
                <input className={classes.Input}type='text' name='name' placeholder='your name' />
                <input className={classes.Input}type='email' name='email' placeholder='your email' />
                <input className={classes.Input}type='text' name='street' placeholder='your street' />
                <input className={classes.Input}type='text' name='postal' placeholder='your postal' />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;
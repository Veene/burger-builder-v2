import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux'

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    component={ContactData}/>
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
//DONT NEED -> nothing to DISPATCH JUST SHOWING -- SIDE NOTE -- if only dispatch, then connect(null, mapdispatchtoprops)
// const mapDispatchToState = state => {
//     return {
        
//     }
// }

export default connect(mapStateToProps)(Checkout);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Radio, Select } from 'antd';
import { getCart } from '../../../store/cart/action';
import { formatCurrency } from '../../../utilities/product-helper';
import { getPayments } from '../../../store/payment/action';
import { addOrder } from '../../../store/order/action';
import Router from 'next/router';

const { Option } = Select;

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: 1,
        };
    }

    handleChangePaymentMethod = e => {
        this.setState({ method: e.target.value });
    };

    handleSubmitOrder = e => {
        const { cartItems } = this.props;
        const products = cartItems ? cartItems.map(item => ({
            product_id: item.product.product_id,
            quantity: item.quantity,
            price: item.product.price,
            discount: item.product.discount,
            order_details_status_id: 1, // enum status to pack product
        })): [];

        const order = {
            orders_status_id: 1, // enum status unpaid order
            payment_id: this.state.method,
            order_address: this.props.currentOrderAddress,
            ship_fee: this.props.totalShipFee,
            line_items: products
        }
        this.props.dispatch(addOrder(order));
        Router.push('/');
    }

    componentDidMount() {
        this.props.dispatch(getCart());
        const paymentParams = {
            sortBy: 'payment_id:asc',
        }
        this.props.dispatch(getPayments(paymentParams));
    }

    render() {
        const { cartTotal, cartItems, currentOrderAddress,
            totalShipFee, subTotalPrice, payments } = this.props;
        let month = [],
            year = [];
        for (let i = 1; i <= 12; i++) {
            month.push(i);
        }
        for (let i = 2019; i <= 2050; i++) {
            year.push(i);
        }
        return (
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <div className="ps-section__header">
                        <h3>Payment</h3>
                    </div>
                    <div className="ps-section__content">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="ps-block--shipping">
                                    <div className="ps-block__panel">
                                        <figure>
                                            <small>Contact</small>
                                            <p>test@gmail.com</p>
                                            <Link href="/account/checkout">
                                                <a>Change</a>
                                            </Link>
                                        </figure>
                                        <figure>
                                            <small>Ship to</small>
                                            <p>
                                                {currentOrderAddress}
                                            </p>
                                            <Link href="/account/checkout">
                                                <a>Change</a>
                                            </Link>
                                        </figure>
                                    </div>
                                    <h4>Shipping Method</h4>
                                    <div className="ps-block__panel">
                                        <figure>
                                            <small>
                                                International Shipping
                                            </small>
                                            <strong>₫{totalShipFee ? formatCurrency(totalShipFee*1000) : 0}</strong>
                                        </figure>
                                    </div>
                                    <h4>Payment Methods</h4>

                                    <div className="ps-block--payment-method">
                                        <div className="ps-block__header">
                                            <Radio.Group
                                                onChange={e =>
                                                    this.handleChangePaymentMethod(
                                                        e
                                                    )
                                                }
                                                value={this.state.method}>
                                                {payments ? payments.map(payment => (
                                                    <Radio value={payment.payment_id}>
                                                    { payment.payment_name }
                                                </Radio>
                                                )): ''}
                                            </Radio.Group>
                                        </div>
                                        <div className="ps-block__content">
                                            {this.state.method !== 1 ? (
                                                <div className="ps-block__tab">
                                                    <div className="form-group">
                                                        <label>
                                                            Card Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>
                                                            Card Holders
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <div className="form-group">
                                                                <label>
                                                                    Expiration
                                                                    Date
                                                                </label>
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <Select
                                                                            defaultValue={
                                                                                1
                                                                            }>
                                                                            {month.map(
                                                                                item => (
                                                                                    <Option
                                                                                        value={
                                                                                            item
                                                                                        }
                                                                                        key={
                                                                                            item
                                                                                        }>
                                                                                        {
                                                                                            item
                                                                                        }
                                                                                    </Option>
                                                                                )
                                                                            )}
                                                                        </Select>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <Select
                                                                            defaultValue={
                                                                                2020
                                                                            }>
                                                                            {year.map(
                                                                                item => (
                                                                                    <Option
                                                                                        value={
                                                                                            item
                                                                                        }
                                                                                        key={
                                                                                            item
                                                                                        }>
                                                                                        {
                                                                                            item
                                                                                        }
                                                                                    </Option>
                                                                                )
                                                                            )}
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="form-group">
                                                                <label>
                                                                    CVV
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="ps-btn ps-btn--fullwidth">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="ps-block__tab" onClick={this.handleSubmitOrder.bind(this)}>
                                                    <a className="ps-btn">
                                                        Submit
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="ps-block__footer">
                                        <Link href="/account/shipping">
                                            <a>
                                                <i className="icon-arrow-left mr-2"></i>
                                                Return to shipping
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                                <div className="ps-form__orders">
                                    <div className="ps-block--checkout-order">
                                        <div className="ps-block__content">
                                            <figure>
                                                <figcaption>
                                                    <strong>Product</strong>
                                                    <strong>total</strong>
                                                </figcaption>
                                            </figure>
                                            <figure className="ps-block__items">
                                                {cartItems &&
                                                cartItems.map(item => (
                                                    <Link
                                                        href="/product/[pid]"
                                                        as={`/product/${item.product ? item.product.product_id: ''}`}
                                                        key={item.product ? item.product.product_id: 0}>
                                                        <a>
                                                            <strong>
                                                                {item.product ? item.product.product_name: ''}
                                                                <span>
                                                                        x
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                    </span>
                                                            </strong>
                                                            <small>
                                                                ₫
                                                                {item.product ? formatCurrency(item.product.quantity *
                                                                item.product.price) : 0}
                                                            </small>
                                                        </a>
                                                    </Link>
                                                ))}
                                            </figure>
                                            <figure>
                                                <figcaption>
                                                    <strong>Subtotal</strong>
                                                    <small>₫{subTotalPrice ? formatCurrency(subTotalPrice*1000): 0}</small>
                                                </figcaption>
                                            </figure>
                                            <figure>
                                                <figcaption>
                                                    <strong>Shipping</strong>
                                                    <small>₫{ totalShipFee ? formatCurrency(totalShipFee*1000): 0}</small>
                                                </figcaption>
                                            </figure>
                                            <figure className="ps-block__total">
                                                <h3>
                                                    Total
                                                    <strong>
                                                         ₫{cartTotal ? formatCurrency(cartTotal*1000): 0}
                                                    </strong>
                                                </h3>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return ({
        ...state.cart,
        ...state.order,
        ...state.payment,
    })
};
export default connect(mapStateToProps)(Payment);

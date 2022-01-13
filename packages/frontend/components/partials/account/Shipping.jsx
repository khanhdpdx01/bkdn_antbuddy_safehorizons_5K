import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCart } from '../../../store/cart/action';
import { formatCurrency } from '../../../utilities/product-helper';

import Link from 'next/link';

class Shipping extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getCart());
    }

    render() {
        const { cartTotal, cartItems, currentOrderAddress, totalShipFee, subTotalPrice } = this.props;
        return (
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Shipping Information</h1>
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
                                            <strong>₫{ totalShipFee ? formatCurrency(totalShipFee*1000): 0}</strong>
                                        </figure>
                                    </div>
                                    <div className="ps-block__footer">
                                        <Link href="/account/checkout">
                                            <a>
                                                <i className="icon-arrow-left mr-2"></i>
                                                Return to information
                                            </a>
                                        </Link>
                                        <Link href="/account/payment">
                                            <a className="ps-btn">
                                                Continue to payment
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
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
    })
};
export default connect(mapStateToProps)(Shipping);

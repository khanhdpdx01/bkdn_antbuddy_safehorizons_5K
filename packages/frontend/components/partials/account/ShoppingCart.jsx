import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getCart,
    increaseItemQty,
    decreaseItemQty,
    removeItem,
} from '../../../store/cart/action';

import Link from 'next/link';
import { notification } from 'antd';
import ProductCart from '../../elements/products/ProductCart';
import { formatCurrency } from '../../../utilities/product-helper';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getCart());
    }

    handleIncreaseItemQty(item) {
        if (item.product.quantity === item.quantity) {
            notification['warning']({
                message: 'Warning',
                description: "This product cannot be increase quantity!",
                duration: 1,
            });
        } else {
            this.props.dispatch(increaseItemQty({
                product_id: item.product.product_id,
                quantity: 1,
            }));
        }
    }

    handleDecreaseItemQty(item) {
        if (item.quantity === 1) {
            notification['warning']({
                message: 'Warning',
                description: "the minimum number of products is equal to 1",
                duration: 1,
            });
        } else {
            this.props.dispatch(decreaseItemQty({
                product_id: item.product.product_id,
                quantity: 1,
            }));
        }
    }

    handleRemoveCartItem = item => {
        this.props.dispatch(removeItem({
            product_id: item.product.product_id,
        }));
    };

    render() {
        const { subTotalPrice, cartTotal, cartItems, totalShipFee } = this.props;
        return (
            <div className="ps-section--shopping ps-shopping-cart">
                <div className="container">
                    <div className="ps-section__content">
                        <div className="table-responsive">
                            <table className="table ps-table--shopping-cart">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Discount</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.product ? item.product.product_id: ''}>
                                            <td>
                                                <ProductCart item={item}/>
                                            </td>
                                            <td className="price text-center">
                                                ₫{item.product ? formatCurrency(item.product.price*1000): 0}
                                            </td>
                                            <td className="text-center">
                                                {item.discount}%
                                            </td>
                                            <td className="text-center">
                                                <div className="form-group--number">
                                                    <button
                                                        className="up"
                                                        onClick={this.handleIncreaseItemQty.bind(
                                                            this,
                                                            item
                                                        )}>
                                                        +
                                                    </button>
                                                    <button
                                                        className="down"
                                                        onClick={this.handleDecreaseItemQty.bind(
                                                            this,
                                                            item
                                                        )}>
                                                        -
                                                    </button>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="1"
                                                        value={item.quantity}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                ₫
                                                {item.product ? (formatCurrency((item.quantity *
                                                    item.product.price - item.quantity * item.product.price
                                                    * item.product.discount / 100) * 1000)) : 0}
                                            </td>
                                            <td className="text-center">
                                                <a
                                                    href="#"
                                                    onClick={this.handleRemoveCartItem.bind(
                                                        this,
                                                        item
                                                    )}>
                                                    <i className="icon-cross"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="ps-section__cart-actions">
                            <Link href="/shop">
                                <a>
                                    <i className="icon-arrow-left mr-2"></i>
                                    Back to Shop
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="ps-section__footer">
                        <div className="row justify-content-end">
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                                <div className="ps-block--shopping-total">
                                    <div className="ps-block__header">
                                        <p>
                                            Subtotal <span> ₫{formatCurrency(subTotalPrice*1000)}</span>
                                        </p>
                                    </div>
                                    <div className="ps-block__content">
                                        <ul className="ps-block__product">
                                            {cartItems.length > 0
                                                ? cartItems.map(
                                                      (item, index) => {
                                                          if (index < 3) {
                                                              return (
                                                                  <li
                                                                      key={
                                                                          item.product ? item.product.product_id: 0
                                                                      }>
                                                                      <span className="ps-block__estimate">
                                                                          <Link
                                                                              href="/product/[pid]"
                                                                              as={`/product/${item.product ? item.product.product_id: ''}`}>
                                                                              <a className="ps-product__title">
                                                                                  {
                                                                                      item.product ? item.product.product_name: ''
                                                                                  }
                                                                                  <br />
                                                                                  <strong>
                                                                                  {
                                                                                    item.quantity
                                                                                  }{' '}{ item.product ? item.product.unit:''}
                                                                                  </strong>
                                                                              </a>
                                                                          </Link>
                                                                      </span>
                                                                  </li>
                                                              );
                                                          }
                                                      }
                                                  )
                                                : ''}
                                        </ul>
                                        <p>
                                            Ship Fee: <span>₫{ formatCurrency(totalShipFee*1000) }</span>
                                        </p>
                                        <h4>
                                            Total <span>₫{formatCurrency(cartTotal*1000)}</span>
                                        </h4>
                                    </div>
                                </div>
                                <Link href="/account/checkout">
                                    <a className="ps-btn ps-btn--fullwidth">
                                        Proceed to checkout
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.cart;
};
export default connect(mapStateToProps)(ShoppingCart);

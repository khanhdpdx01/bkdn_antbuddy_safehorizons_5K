import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { getCart, removeItem } from '../../../../store/cart/action';
import { formatCurrency } from '../../../../utilities/product-helper';

class MiniCart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getCart());
    }

    handleRemoveCartItem = (product) => {
        this.props.dispatch(removeItem(product));
    };

    render() {
        const { cartTotal, cartItems, subTotalPrice, quantityProduct, totalShipFee } = this.props;
        return (
            <div className="ps-cart--mini">
                <a className="header__extra" href="#">
                    <i className="icon-bag2"></i>
                    <span>
                        <i>{quantityProduct ? quantityProduct : 0}</i>
                    </span>
                </a>
                {cartItems && cartItems.length > 0 ? (
                    <div className="ps-cart__content">
                        <div className="ps-cart__items">
                            {cartItems && cartItems.length > 0
                                ? cartItems.map((item) => (
                                      <div
                                          className="ps-product--cart-mobile"
                                          key={item.product ? item.product.product_id: ''}>
                                          <div className="ps-product__thumbnail">
                                              <Link
                                                  href="/product/[pid]"
                                                  as={`/product/${item.product ? item.product.product_id: ''}`}>
                                                  <a>
                                                      <img
                                                          src={item.product ? item.product.thumbnail: ''}
                                                          alt="martfury"
                                                      />
                                                  </a>
                                              </Link>
                                          </div>
                                          <div className="ps-product__content">
                                              <a
                                                  className="ps-product__remove"
                                                  onClick={this.handleRemoveCartItem.bind(
                                                      this,
                                                      item.product
                                                  )}>
                                                  <i className="icon-cross"></i>
                                              </a>
                                              <Link
                                                  href="/product/[pid]"
                                                  as={`/product/${item.product ? item.product.product_id: ''}`}>
                                                  <a className="ps-product__title">
                                                      {item.product ? item.product.product_name: ''}
                                                  </a>
                                              </Link>
                                              <p>
                                                <strong>Sold by:{' '}</strong>
                                                  {item.product ? (item.product.supplier ? item.product.supplier.supplier_name: ''): ''}
                                              </p>
                                                {item.discount ? (
                                                    <small>
                                                        {item.quantity} x ₫
                                                        {formatCurrency(item.product.price*1000 - item.discount * item.price * 1000/100)}
                                                        <del className="ml-2">
                                                            {item.discount ?
                                                            formatCurrency(item.price * 1000) : 0}
                                                        </del>
                                                    </small>
                                                ) : (
                                                    <small>
                                                        {item.quantity} x ₫
                                                        {formatCurrency(item.product ? item.product.price * 1000 : 0)}
                                                    </small>
                                                )}
                                          </div>
                                      </div>
                                  ))
                                : ''}
                        </div>
                        <div className="ps-cart__footer">
                            <div>
                                Total Ship Fee: 
                                <strong>₫{totalShipFee ? formatCurrency(totalShipFee*1000) : 0}</strong>
                            </div>
                            <div>
                                Sub Total price: 
                                <strong>₫{subTotalPrice ? formatCurrency(subTotalPrice*1000) : 0}</strong>
                            </div>
                            <p>
                                Cart Total price: 
                                <strong>₫{ cartTotal ? formatCurrency(cartTotal*1000): 0 }</strong>
                            </p>
                            <figure>
                                <Link href="/account/shopping-cart">
                                    <a className="ps-btn">View Cart</a>
                                </Link>
                                <Link href="/account/checkout">
                                    <a className="ps-btn">Checkout</a>
                                </Link>
                            </figure>
                        </div>
                    </div>
                ) : (
                    <div className="ps-cart__content">
                        <div className="ps-cart__items">
                            <span>No products in cart</span>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return state.cart;
};
export default connect(mapStateToProps)(MiniCart);

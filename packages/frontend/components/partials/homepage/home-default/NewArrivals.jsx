import React, { Component } from 'react';
import ProductHorizontal from '../../../elements/products/ProductHorizontal';
import { connect } from 'react-redux';
import Link from 'next/link';
import { getColletionBySlug } from '../../../../utilities/product-helper';

class NewArrivals extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { collections, collectionSlug } = this.props;
        const products = [];
        return (
            <div className="ps-product-list ps-new-arrivals">
                <div className="ps-container">
                    <div className="ps-section__header">
                        <h3>Hot New Arrivals</h3>
                        <ul className="ps-section__links">
                            <li>
                                <Link href="/shop">
                                    <a>Technologies</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop">
                                    <a>Electronic</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop">
                                    <a>Furnitures</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop">
                                    <a>Clothing & Apparel</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop">
                                    <a>Health & Beauty</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop">
                                    <a>View All</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="ps-section__content">
                        <div className="row">
                            {products.map(product => (
                                <div
                                    className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 "
                                    key={product.title}>
                                    <ProductHorizontal product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => state.collection)(NewArrivals);

import React from 'react';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import { isStaticData } from '../../../utilities/app-settings';
import { baseUrl } from '../../../repositories/Repository';
const ProductCart = ({ item }) => {
    return (
        <div className="ps-product--cart">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${item.product ? item.product.product_id: ''}`}>
                    <a>
                        <LazyLoad>
                            <img
                                src={item.product ? item.product.thumbnail: ''}
                                alt="martfury"
                            />
                        </LazyLoad>
                    </a>
                </Link>
            </div>
            <div className="ps-product__content">
                <Link href="/product/[pid]" as={`/product/${item.product ? item.product.product_id: ''}`}>
                    <a className="ps-product__title">{item.product ? item.product.product_name: ''}</a>
                </Link>
                <p>
                    Sold By:
                    <strong>
                        {item.product ? item.product.supplier.supplier_name: ''}
                    </strong>
                </p>
            </div>
        </div>
    );
};

export default ProductCart;

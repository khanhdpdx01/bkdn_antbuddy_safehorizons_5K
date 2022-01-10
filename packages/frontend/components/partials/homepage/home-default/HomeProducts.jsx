import React, { Component } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import Product from '../../../elements/products/Product';
import { getProducts } from '../../../../store/product/action';
import { carouselFullwidth } from '../../../../utilities/carousel-helpers';
import ProductWide from '../../../elements/products/ProductWide';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProducts: [],
            activeCategory: 'newArrivals',
            listView: true,
        };
    }

    componentDidMount() {
        const params = {
            limit: 20,
        }
        this.props.dispatch(getProducts(params));
    }

    handleChangeViewMode = event => {
        event.preventDefault();
        this.setState({ listView: !this.state.listView });
    };

    handlePagination(page, pageSize) {
        const params = {
            page,
            limit: pageSize,
        };
        this.props.dispatch(getProducts(params));
    }

    handleChangeProduct(e, products, currentItem) {
        e.preventDefault();
        this.setState({
            currentProducts: products,
            activeCategory: currentItem,
        });
    }

    render() {
        const { allProducts, totalPages, limit, page } = this.props;
        const { activeCategory, listView } = this.state;
        const products = [];
        const sectionLinks = [
            {
                title: 'New Arrivals',
                products: products,
                name: 'newArrivals',
            },
            {
                title: 'Best seller',
                products: products,
                name: 'bestSeller',
            },
            {
                title: 'Most Popular',
                products: products,
                name: 'mostPopular',
            },
        ];
        return (
            <div className="ps-product-list ps-garden-kitchen">
                <div className="ps-container">
                    <div className="ps-section__header">
                        <h3>All Products</h3>
                        <ul className="ps-section__links">
                            {sectionLinks.map(link => (
                                <li
                                    className={
                                        activeCategory === link.name
                                            ? 'active'
                                            : ''
                                    }
                                    key={link.name}>
                                    <a
                                        onClick={e =>
                                            this.handleChangeProduct(
                                                e,
                                                link.products,
                                                link.name
                                            )
                                        }>
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <Link href="/shop">
                                    <a>View All</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div class="ps-shopping">
                        <div className="ps-shopping__header">
                            <p>
                                <strong className="mr-2">{(allProducts && allProducts.length)}</strong>
                                Products found
                            </p>
                            <div className="ps-shopping__actions">
                                <select
                                    className="ps-select form-control"
                                    data-placeholder="Sort Items">
                                    <option>Sort by latest</option>
                                    <option>Sort by popularity</option>
                                    <option>Sort by average rating</option>
                                    <option>Sort by price: low to high</option>
                                    <option>Sort by price: high to low</option>
                                </select>
                                <div className="ps-shopping__view">
                                    <p>View</p>
                                    <ul className="ps-tab-list">
                                        <li
                                            className={
                                                listView === true ? 'active' : ''
                                            }>
                                            <a
                                                href="#"
                                                onClick={this.handleChangeViewMode}>
                                                <i className="icon-grid"></i>
                                            </a>
                                        </li>
                                        <li
                                            className={
                                                listView !== true ? 'active' : ''
                                            }>
                                            <a
                                                href="#"
                                                onClick={this.handleChangeViewMode}>
                                                <i className="icon-list4"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ps-section__content">
                        <div className="ps-shopping__content">
                            {listView === true ? (
                                <div className="ps-shopping-product">
                                    <div className="row m-0 p-0">
                                        {allProducts && allProducts.length > 0
                                            ? allProducts.map(item => (
                                                <div
                                                    className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 px-1"
                                                    key={item.product_id}>
                                                    <Product product={item} />
                                                </div>
                                            ))
                                            : (<p>No products</p>)
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className="ps-shopping-product">
                                    {allProducts && allProducts.length > 0
                                        ? allProducts.map(item => (
                                            <ProductWide
                                                product={item}
                                                key={item.product_id}
                                            />
                                        ))
                                        : ''}
                                </div>
                            )}
                        </div>
                        <div className="ps-shopping__footer text-center pt-40">
                            <Pagination
                                total={totalPages}
                                pageSize={limit ? limit : 20}
                                responsive={true}
                                defaultCurrent={page}
                                onChange={this.handlePagination.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.product,
    ...state.auth,
})

export default connect(mapStateToProps)(Products);

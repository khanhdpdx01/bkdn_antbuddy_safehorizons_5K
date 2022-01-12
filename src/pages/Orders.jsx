import React, {Component} from 'react'

import {connect} from 'react-redux'

import {getOrders} from '../redux/actions/OrderAction'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

const customerTableHead = [
    '',
    'User',
    'Total price',
    'Address',
    'Date',
    'Status',
]

const orderStatus = {
    "Shipping": "primary",
    "Pending": "warning",
    "Paid": "success",
    "Refund": "danger"
}

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.order_id}</td>
        <td>{item.customer.first_name} {item.customer.last_name}</td>
        <td>{item.total_price}</td>
        <td>{item.order_address}</td>
        <td>{new Date(item.order_date).toLocaleDateString()}</td>
        <td>
            <Badge type={orderStatus[item.orders_status.orders_status_name]} 
                content={item.orders_status.orders_status_name}/>
        </td>
    </tr>
)

class Orders extends Component {

    componentDidMount() {
        const params = {
            limit: 30,
        }
        this.props.dispatch(getOrders(params))
    }

    render() {
        const {orders} = this.props;
        console.log(orders)
        return (
            <div>
                <h2 className="page-header">
                    Orders
                </h2>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <Table
                                    limit='10'
                                    headData={customerTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={orders}
                                    renderBody={(item, index) => renderBody(item, index)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state.OrderReducer)(Orders)

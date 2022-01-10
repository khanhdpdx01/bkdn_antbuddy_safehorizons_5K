import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { Form, Input, Select } from 'antd';
import { connect } from 'react-redux';
import { getRoles } from '../../../store/role/action';
import { login, register } from '../../../store/auth/action';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static async getInitialState(ctx) {
        return { query: ctx.query };
    }

    componentDidMount() {
        const { query } = this.props;
        if (query) {
            this.props.dispatch(getRoles(query));
        } else {
            const params = {
                sortBy: 'role_id:asc',
                limit: 20,
                page: 1,
            }
            this.props.dispatch(getRoles(params));
        }
    }

    handleSubmit = values => {
        this.props.dispatch(register(values));
        this.props.dispatch(login(values));
        Router.push('/account/login');
    };

    render() {
        var { roles } = this.props;
        if (roles.length) {
            roles = roles.filter(role => {
                const r = role.role_name.split('_');
                if (!['ADMIN', 'EMPLOYEE'].includes(r[r.length - 1])) {
                    return role;
                }
            })
        }
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        autoComplete="off"
                        initialValues={{ remember: true }}
                        onFinish={this.handleSubmit}>
                        <ul className="ps-tab-list">
                            <li>
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li className="active">
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>Register An Account</h5>
                                <div className="form-group">
                                    <p>App plan</p>
                                    <div className="ps-form__categories">
                                        <Form.Item
                                        name="roleIds"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please choosen roles!',
                                            },
                                        ]}>
                                            <Select
                                                mode="multiple"
                                                placeholder="Please select"
                                                defaultValue={roles.length > 0 ? [roles[0].role_id]: undefined}>
                                                {roles.map(role => (
                                                    <Select.Option value={role.role_id} key={role.role_id}>
                                                        {role.role_name}
                                                    </Select.Option>
                                                ))}
                                            </Select> 
                                        </Form.Item>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your username!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Username"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="email"
                                            placeholder="Email address"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your password!',
                                            },
                                        ]}>
                                        <Input.Password className="form-control"/>
                                    </Form.Item>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Register
                                    </button>
                                </div>
                            </div>
                            <div className="ps-form__footer">
                                <p>Connect with:</p>
                                <ul className="ps-list--social">
                                    <li>
                                        <a className="facebook" href="#">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="google" href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="twitter" href="#">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="instagram" href="#">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.auth,
        ...state.role,
    }
};
export default connect(mapStateToProps)(Register);

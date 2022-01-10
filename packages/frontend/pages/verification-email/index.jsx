import { connect } from 'react-redux';
import React from 'react';
import Router from 'next/router';
import Link from 'next/link';

import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import { verifyEmail } from '../../store/auth/action';

class VerificationEmail extends React.Component {
    constructor(props) {
        super(props);
    }

    static getInitialProps(ctx) {
        return { query: ctx.query };
    }

    componentDidMount() {
        const { token } = this.props.query;
        if (token) {
            this.props.dispatch(verifyEmail(token));
        }
        Router.push('/');
    }

    render() {
        return (
            <div className="site-content">
                <HeaderDefault />
                <div className="ps-page--404">
                    <div className="container">
                        <div className="ps-section__content">
                            <figure>
                                <h3>VerificationEmail</h3>
                                <p>
                                    Go back to
                                    <Link href="/">
                                        <a> Homepage</a>
                                    </Link>
                                </p>
                            </figure>
                        </div>
                    </div>
                </div>
                <FooterDefault />
            </div>
        )
    }
}

export default connect(state => state.auth)(VerificationEmail);
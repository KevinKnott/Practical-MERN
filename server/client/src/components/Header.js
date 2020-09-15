import React, { Component } from 'react';


class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo" href="/">Emaily</a>
                    <ul className="right">
                        <a href="/auth/google"> Login with Google</a>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component {
    renderAnonNavLinks () {
        return (
            <li className="nav-item">
                <NavLink to="/sign-in" className="nav-link" exact>
                    Sign In
                </NavLink>
            </li>
        );
    };
    renderUserNavLinks () {
        return (
            <>
                <li className="nav-item">
                    <NavLink to="/upload" className="nav-link" exact>
                        Upload
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/settings" className="nav-link" exact>
                        Settings
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/sign-out" className="nav-link" exact>
                        Sign Out
                    </NavLink>
                </li>
            </>
        );
    };
	render () {
		return (
			<header>
				<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
					<span className="navbar-brand">Photo Library</span>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<NavLink to="/" className="nav-link" exact>
									Browse Photos
								</NavLink>
							</li>
							{ this.props.user ? this.renderUserNavLinks() : this.renderAnonNavLinks() }
						</ul>
					</div>
				</nav>
			</header>
		);
	};
}

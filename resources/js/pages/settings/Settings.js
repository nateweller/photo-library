import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import AWS from './AWS';
import Users from './Users';
import Collections from './Collections';

class Settings extends React.Component {
    render () {
        return (
            <div className="row">
				<div className="col-lg-3">
                    <aside className="sidebar bg-light border-right border-bottom p-4">
                        <div className="nav flex-column nav-pills">
                            <NavLink className="nav-link" to="/settings/aws" exact>
                                AWS
                            </NavLink>
                            <NavLink className="nav-link" to="/settings/users" exact>
                                Users
                            </NavLink>
                            <NavLink className="nav-link" to="/settings/collections" exact>
                                Collections
                            </NavLink>
                        </div>
                    </aside>
				</div>
				<div className="col-lg-9">
					<div className="py-4 pr-4">
                        <Route path="/settings/aws" component={AWS} />
                        <Route path="/settings/users" component={Users} />
                        <Route path="/settings/collections" component={Collections} />
					</div>
				</div>
			</div>
        );
    };
}

export default Settings;

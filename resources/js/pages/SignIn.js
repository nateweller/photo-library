import React from 'react';

export default class SignIn extends React.Component {
    state = {
        email: '',
        password: ''
    };
    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };
	render () {
		return (
			<div className="p-4">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <h2>Sign In</h2>
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="email">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        required
                                        value={this.state.login}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        required
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <input type="submit" value="Sign In" className="btn btn-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	};
}

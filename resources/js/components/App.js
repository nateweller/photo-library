import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import PhotoDetail from '../pages/PhotoDetail';
import Settings from '../pages/settings/Settings';

export default class App extends React.Component {
    state = {
        user: 1, // to do: remove test data
    };
    setCurrentUser (user) {
        this.setState({user});
    };
	render () {
		return (
			<>
				<Header user={this.state.user} />
				<main>
					<Switch>
						<Route path="/sign-in" component={SignIn} setCurrentUser={this.setCurrentUser} />
						<Route path="/photo/:id" component={PhotoDetail} />
                        <Route path="/settings" component={Settings} />
						<Route path="/">
                            <Home user={this.state.user} />
                        </Route>
					</Switch>
				</main>
			</>
		);
	};
}

if (document.getElementById('app')) {
    ReactDOM.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
		document.getElementById('app')
	);
}

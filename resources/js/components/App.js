import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from '../store';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import PhotoDetail from '../pages/PhotoDetail';
import Upload from '../pages/Upload';
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
			<Provider store={store}>
				<Header user={this.state.user} />
				<main>
					<Switch>
						<Route path="/sign-in" component={SignIn} setCurrentUser={this.setCurrentUser} />
						<Route path="/photo/:photoID" component={PhotoDetail} />
                        <Route path="/upload" component={Upload} />
                        <Route path="/settings" component={Settings} />
						<Route path="/">
                            <Home user={this.state.user} />
                        </Route>
					</Switch>
				</main>
			</Provider>
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

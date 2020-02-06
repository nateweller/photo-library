import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';

export default class App extends React.Component {
	render () {
		return (
			<>
				<Header />
				<main className="p-3">
					<Switch>
						<Route path="/sign-in">
							<SignIn />
						</Route>
						<Route path="/">
							<Home />
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
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import PhotoDetail from '../pages/PhotoDetail';

export default class App extends React.Component {
	render () {
		return (
			<>
				<Header />
				<main>
					<Switch>
						<Route path="/sign-in" component={SignIn} />
						<Route path="/photo/:id" component={PhotoDetail} />
						<Route path="/" component={Home} />
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
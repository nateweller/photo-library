import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';

export default class App extends React.Component {
	render () {
		return (
			<>
				<Switch>
					<Route path="/" component={ Home } />
				</Switch>
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
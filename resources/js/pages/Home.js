import React from 'react';

import Sidebar from '../components/Sidebar';

export default class Home extends React.Component {
	render () {
		return (
			<div className="row">
				<div className="col-lg-3">
					<Sidebar />
				</div>
				<div className="col-lg-9">
					<div className="py-4">
						<p>Photos</p>
					</div>
				</div>
			</div>
		);
	};
}
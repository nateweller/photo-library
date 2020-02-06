import React from 'react';

export default class Sidebar extends React.Component {
	render () {
		return (
			<aside className="sidebar bg-light border-right border-bottom p-4">
				<form>
					<div className="form-group">
						<input 
							type="text" 
							name="search"
							placeholder="Search Keywords..." 
							className="form-control" />
					</div>
				</form>
			</aside>
		);
	}
}
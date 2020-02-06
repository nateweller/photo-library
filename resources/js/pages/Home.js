import React from 'react';

import Sidebar from '../components/Sidebar';
import PhotoThumbnail from '../components/PhotoThumbnail';

export default class Home extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			photos: [
				{ title: 'Test 1', url: 'https://via.placeholder.com/400x300', id: 1 },
				{ title: 'Test 2', url: 'https://via.placeholder.com/400x300', id: 2 },
				{ title: 'Test 3', url: 'https://via.placeholder.com/400x300', id: 3 },
			]
		};
	};
	renderPhotoGrid (photos) {
		if (!photos) return <div>No Results.</div>;
		return (
			<div className="photo-grid row">
				{ photos.map((photo) => (
					<div className="col-6 col-md-4 col-lg-3" key={ photo.id }>
						<PhotoThumbnail
							url={ photo.url }
							title={ photo.title } 
							className="photo-grid__item" />
					</div>
				)) }
			</div>
		)
	}
	render () {
		return (
			<div className="row">
				<div className="col-lg-3">
					<Sidebar />
				</div>
				<div className="col-lg-9">
					<div className="py-4">
						{ this.renderPhotoGrid(this.state.photos) }
					</div>
				</div>
			</div>
		);
	};
}
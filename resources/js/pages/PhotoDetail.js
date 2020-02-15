import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import PhotoThumbnail from '../components/PhotoThumbnail';

export default class PhotoDetail extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			title: "Example Photo",
			url: "https://via.placeholder.com/400x300",
			description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
			tags: ["lorem", "ipsum", "dolor", "sit", "amet", "consectetuer"],
			photographer: "Jane Smith",
			width: 1485,
			height: 980,
			takenAt: 1580965569,
			createdAt: 1580965569,
			updatedAt: 1580965569
		};
	};
	getFormattedDate (unixTimestamp) {
		if (!this.state.takenAt) return "Unknown";
		const timestamp = moment.unix(unixTimestamp);
		return timestamp.format("MMMM Do YYYY, h:mm:ss a")
	};
	render () {
		return (
			<div className="row">
				<div className="col-lg-3">
					<aside className="sidebar bg-light border-right border-bottom p-4">
						<h2 className="h5">{ this.state.title }</h2>
						<p className="small">{ this.state.description }</p>
						<p style={{ marginTop: "-8px" }}>
							{ this.state.tags.map((tag) => (
								<span className="badge badge-primary mr-2 mb-1" key={ tag }>{ tag }</span> 
							)) }
						</p>
						<div className="small py-3 border-top border-bottom">
							<strong>Photographer:</strong> 
							{ this.state.photographer }
						</div>
						<div className="small py-3 border-bottom">
							<strong>Dimensions:</strong> 
							{ this.state.width}px x { this.state.height }px
						</div>
						<div className="small py-3 border-bottom">
							<strong>Date Taken:</strong> 
							{ this.getFormattedDate(this.state.takenAt) }
						</div>
						<div className="small py-3 border-bottom">
							<strong>Date Uploaded:</strong> 
							{ this.getFormattedDate(this.state.createdAt) }
						</div>
						<div className="small py-3 border-bottom">
							<strong>Date Modified:</strong> 
							{ this.getFormattedDate(this.state.updatedAt) }
						</div>
					</aside>
				</div>
				<div className="col-lg-9">
					<div className="py-4 pr-4">
						<PhotoThumbnail
							url={ this.state.url } 
							title={ this.state.title }
							className="d-inline-block" />
					</div>
				</div>
			</div>
		);
	};
}
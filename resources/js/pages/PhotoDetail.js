import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import { Config } from '../config';

import PhotoThumbnail from '../components/PhotoThumbnail';

export default class PhotoDetail extends React.Component {
    state = {
        photo: {
            title: '',
            description: '',
            url: '',
            tags: '',
            width: '',
            height: '',
            photographer: '',
            takenAt: '',
            createdAt: '',
            updatedAt: ''
        }
    }
    componentDidMount() {
        axios.get(`${Config.serverURL}photos?id=${this.props.match.params.photoID}`)
            .then(response => {
                // convert photo array to key-ID object
                const photo = response.data;
                this.setState({ photo });
            })
            .catch(error => {
                alert('Photo could not be loaded. Please try again.');
                console.error(error);
            });
    }
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
						<h2 className="h5">{ this.state.photo.title }</h2>
						<p className="small">{ this.state.photo.description }</p>
						<p style={{ marginTop: "-8px" }}>
							{ this.state.photo.tags.split(',').map((tag) => (
								<span className="badge badge-primary mr-2 mb-1" key={ tag }>{ tag }</span>
							)) }
						</p>
						<div className="small py-3 border-top border-bottom">
							<strong>Photographer: </strong>
							{ this.state.photo.photographer }
						</div>
						<div className="small py-3 border-bottom">
							<strong>Dimensions: </strong>
							{ this.state.photo.width}px x { this.state.photo.height }px
						</div>
						<div className="small py-3 border-bottom">
							<strong>Date Taken: </strong>
							{ this.getFormattedDate(this.state.photo.takenAt) }
						</div>
						<div className="small py-3 border-bottom">
							<strong>Date Uploaded: </strong>
							{ this.getFormattedDate(this.state.photo.createdAt) }
						</div>
						<div className="small py-3 border-bottom">
							<strong>Date Modified: </strong>
							{ this.getFormattedDate(this.state.photo.updatedAt) }
						</div>
					</aside>
				</div>
				<div className="col-lg-9">
					<div className="py-4 pr-4">
						<PhotoThumbnail
							url={ this.state.photo.url }
							title={ this.state.photo.title }
							className="d-inline-block" />
					</div>
				</div>
			</div>
		);
	};
}

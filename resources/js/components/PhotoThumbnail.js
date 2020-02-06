import React from 'react';
import PropTypes from 'prop-types';

export default class PhotoThumbnail extends React.Component {
	render () {
		return (
			<div className={`photo-thumbnail card ${ this.props.className }`}>
				<div className="card-body card-body--compact">
					<img src={ this.props.url } alt={ this.props.title } />
				</div>
			</div>
		);
	};
}

PhotoThumbnail.propTypes = {
	url: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	className: PropTypes.string
};
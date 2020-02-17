import React from 'react';
import BatchForm from './BatchForm';

export default class Sidebar extends React.Component {
	render () {
		return (
			<aside className="sidebar bg-light border-right border-bottom p-4">
				<form className="small">
					<div className="form-group">
						<input
							type="text"
							name="search"
							placeholder="Search Keywords..."
							className="form-control" />
					</div>
					<div className="form-group">
						<label htmlFor="orientation">Orientation</label>
						<select className="form-control" name="orientation">
							<option value="any">Any</option>
							<option value="landscape">Landscape</option>
							<option value="portrait">Portrait</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="size">Minimum Size</label>
						<select name="size" className="form-control">
							<option value="any">Any</option>
							<option value="4000">Extra Large (4000px)</option>
							<option value="2000">Large (2000px)</option>
							<option value="1000">Medium (1000px)</option>
							<option value="500">Small (500px)</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="photographer">Photographer</label>
						<input
							type="text"
							name="photographer"
							placeholder="Search Photographers..."
							className="form-control" />
					</div>
                    <div className="btn btn-primary btn-block">Filter</div>
				</form>
                <hr />
                {
                    this.props.user
                        ? <BatchForm
                            batch={this.props.batch}
                            batchMode={this.props.batchMode}
                            startBatchMode={this.props.startBatchMode}
                            stopBatchMode={this.props.stopBatchMode}
                          />
                        : null
                }
            </aside>
		);
	}
}

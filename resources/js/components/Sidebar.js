import React from 'react';
import BatchForm from './BatchForm';
import { GoSettings } from 'react-icons/go';

export default class Sidebar extends React.Component {
    state = {
        showAdvancedSearch: false,
        search: '',
        orientation: 'any',
        size: 'any',
        photographer: ''
    };
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    toggleAdvancedSearch = e => {
        e.preventDefault();
        const { showAdvancedSearch } = { ...this.state };
        this.setState({ showAdvancedSearch: !showAdvancedSearch });
    };
    search = e => {
        e.preventDefault();
        const params = {};
        const { search, orientation, size, photographer } = { ...this.state };
        if (search) params.search = search;
        if (orientation) params.orientation = orientation;
        if (size) params.size = size;
        if (photographer) params.photographer = photographer;
        this.props.fetchPhotos(params);
    };
	render () {
		return (
			<aside className="sidebar bg-light border-right border-bottom p-4">
				<form className="small" onSubmit={this.search}>
                    <h6>Search</h6>
                    <div className="row no-gutters">
                        <div className="col">
                            <div className="mb-2 mr-2">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Keywords"
                                    className="form-control"
                                    value={this.state.search}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-auto">
                            <div
                                title="Advanced Search"
                                className="btn btn-secondary"
                                onClick={ this.toggleAdvancedSearch }
                            >
                                <GoSettings />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: this.state.showAdvancedSearch ? 'block' : 'none' }}>
                        <div className="form-group mt-2">
                            <label htmlFor="orientation">Orientation</label>
                            <select
                                name="orientation"
                                className="form-control"
                                value={this.state.orientation}
                                onChange={this.handleChange}
                            >
                                <option value="any">Any</option>
                                <option value="landscape">Landscape</option>
                                <option value="portrait">Portrait</option>
                                <option value="square">Square</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="size">Minimum Size</label>
                            <select
                                name="size"
                                className="form-control"
                                value={this.state.size}
                                onChange={this.handleChange}
                            >
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
                                className="form-control"
                                value={this.state.photographer}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Search</button>
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

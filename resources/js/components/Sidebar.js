import React from 'react';
import BatchForm from './BatchForm';
import { GoSettings } from 'react-icons/go';
import AdvancedSearch from './AdvancedSearch';

export default class Sidebar extends React.Component {
    state = {
        showAdvancedSearch: false,
        search: ''
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
        const { search, collection, orientation, size, photographer } = { ...this.state };
        if (search) params.search = search;
        if (collection) params.collection;
        else if (this.props.collections[0]) params.collection = this.props.collections[0].id;
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
                    <AdvancedSearch isOpen={this.state.showAdvancedSearch} />
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
                            saveBatch={this.props.saveBatch}
                            updateBatchData={this.props.updateBatchData}
                          />
                        : null
                }
            </aside>
		);
	}
}

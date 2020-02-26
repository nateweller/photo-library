import React from 'react';
import BatchForm from './BatchForm';
import { GoSettings } from 'react-icons/go';

export default class Sidebar extends React.Component {
    state = {
        showAdvancedSearch: false,
    };
    toggleAdvancedSearch = (e) => {
        e.preventDefault();
        const { showAdvancedSearch } = { ...this.state };
        this.setState({ showAdvancedSearch: !showAdvancedSearch });
    };
	render () {
		return (
			<aside className="sidebar bg-light border-right border-bottom p-4">
				<form className="small">
                    <h6>Search</h6>
                    <div className="row no-gutters">
                        <div className="col">
                            <div className="mb-2 mr-2">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Keywords"
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="col-auto">
                            <button
                                role="button"
                                title="Advanced Search"
                                className="btn btn-secondary"
                                onClick={ this.toggleAdvancedSearch }
                            >
                                <GoSettings />
                            </button>
                        </div>
                    </div>
                    <div style={{ display: this.state.showAdvancedSearch ? 'block' : 'none' }}>
                        <div className="form-group mt-2">
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
                    </div>
                    <div className="btn btn-primary btn-block">Search</div>
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

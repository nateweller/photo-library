import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Config from '../config';
import Util from '../util';

import Sidebar from '../components/Sidebar';
import PhotoThumbnail from '../components/PhotoThumbnail';

class Home extends React.Component {
	state = {
        photos: {},
        collections: [],
        pagination: {
            currentPage: 1,
            lastPage: 1,
            perPage: 25,
            total: 0
        },
        batchMode: false,
        batch: {},
        batchData: {}
    };
    componentDidMount() {
        this.fetchPhotos();
        this.fetchCollections();
    };
    fetchPhotos = (params) => {
        params = params || {};
        const queryString = Object.keys(params).reduce((queryString, key) => {
            queryString += `${key}=${encodeURI(params[key])}&`;
            return queryString;
        }, `?page=${this.state.pagination.currentPage}&`);
        axios.get(`${Config.serverURL}photos${queryString}`)
            .then(response => {
                // convert photo array to key-ID object
                const photos = response.data.data.reduce((photos, photo) => {
                    photos[photo.id] = photo;
                    return photos;
                }, {});
                this.setState({ photos });
                // update pagination
                const pagination = {
                    currentPage: response.data['current_page'],
                    lastPage: response.data['last_page'],
                    perPage: response.data['per_page'],
                    total: response.data['total']
                };
                this.setState({ pagination });
            })
            .catch(error => {
                alert('Photos could not be loaded. Please try again.');
                console.error(error);
            });
    };
    fetchCollections = () => {
        axios.get(`${Config.serverURL}collections`)
            .then(response => {
                const collections = response.data;
                this.setState({ collections });
            })
            .catch(error => {
                alert('Collections could not be loaded. Please try again.');
                console.error(error);
            });
    };
    startBatchMode = () => {
        this.setState({ batchMode: true });
    };
    stopBatchMode = () => {
        this.setState({ batch: {}, batchMode: false });
    };
    selectPhoto = (photoID) => {
        if (this.state.batchMode) {
            // in batch mode - toggle photo from the batch
            const { batch, photos } = {...this.state};
            if (batch[photoID]) {
                // remove from batch
                delete batch[photoID];
            } else {
                // copy into batch from state
                batch[photoID] = photos[photoID];
            }
            this.setState({ batch });
        } else {
            // not in batch mode - navigate to photo
            this.props.history.push(`/photo/${photoID}`);
        }
    };
    updateBatchData = e => {
        const batchData = {
            [e.target.name]: e.target.value
        };
        this.setState({ batchData });
    };
    saveBatch = () => {
        const ids = Object.keys(this.state.batch);
        const { batchData } = { ...this.state };
        batchData.ids = ids;
        if (!batchData.ids || !batchData.ids.length) {
            alert('Empty batch! Select photos by clicking them.');
            return;
        }
        axios.post(`${Config.serverURL}photos`, Util.convertObjectToFormData(batchData))
            .then(response => {
                this.stopBatchMode();
                // to do: success alert
            })
            .catch(error => {
                alert(error);
                console.error(error);
            });
    };
    changePage = page => {
        const { pagination } = { ...this.state };
        if (page > 0 && page <= pagination.lastPage) {
            pagination.currentPage = page;
        }
        this.setState({ pagination });
        this.fetchPhotos();
    };
    renderPaginationBar = () => {
        return (
            <div className="text-right mb-2">
                Page {this.state.pagination.currentPage} of {this.state.pagination.lastPage} ({this.state.pagination.total} Results)
            </div>
        );
    };
    renderPaginationControls = () => {
        const { pagination } = { ...this.state };
        const renderButton = i => {
            let page = i + 1;
            if (page > pagination.lastPage) return null;
            if (pagination.lastPage >= 5 && pagination.currentPage >= 3) {
                page = pagination.currentPage - (2 - i);
            }
            if (pagination.lastPage >= 5 && pagination.currentPage == pagination.lastPage - 1) {
                page = pagination.currentPage - (3 - i);
            }

            if (pagination.lastPage >= 5 && pagination.currentPage == pagination.lastPage) {
                page = pagination.currentPage - (4 - i);
            }
            return (
                <li className={page == pagination.currentPage ? 'page-item disabled' : 'page-item'} key={i}>
                    <span className="page-link" onClick={() => this.changePage(page)}>{ page }</span>
                </li>
            );
        }
        return (
            <nav aria-label="Page Navigation">
                <ul className="pagination justify-content-center">
                    <li className={pagination.currentPage == 1 ? 'page-item disabled' : 'page-item'}>
                        <span className="page-link" onClick={() => this.changePage(pagination.currentPage - 1)}>
                            &laquo;
                        </span>
                    </li>
                    {[0,1,2,3,4].map(pageNumber => renderButton(pageNumber))}
                    <li className={pagination.currentPage == pagination.lastPage ? 'page-item disabled' : 'page-item'}>
                        <span className="page-link" onClick={() => this.changePage(pagination.currentPage + 1)}>
                            &raquo;
                        </span>
                    </li>
                </ul>
            </nav>
        );
    };
	renderPhotoGrid = (photos) => {
		if (!photos) return <div>No Results.</div>;
		return (
            <>
                {this.renderPaginationBar()}
                <div className="photo-grid row">
                    { Object.keys(photos).map(photoID => {
                        let className = 'photo-grid__item';
                        if (this.state.batch[photoID]) {
                            className += ' photo-grid__item--selected';
                        }
                        return (
                            <div className="col-6 col-md-4 col-lg-3" key={ photoID }>
                                <div onClick={ () => this.selectPhoto(photoID) }>
                                    <PhotoThumbnail
                                        url={ photos[photoID].url }
                                        title={ photos[photoID].title }
                                        className={ className }
                                    />
                                </div>
                            </div>
                        );
                    }) }
                </div>
                {this.renderPaginationControls()}
            </>
		)
	}
	render () {
		return (
			<div className="row">
				<div className="col-lg-3">
                    <Sidebar
                        user={this.props.user}
                        batch={this.state.batch}
                        batchMode={this.state.batchMode}
                        startBatchMode={this.startBatchMode}
                        stopBatchMode={this.stopBatchMode}
                        updateBatchData={this.updateBatchData}
                        saveBatch={this.saveBatch}
                        fetchPhotos={this.fetchPhotos}
                        collections={this.state.collections}
                    />
				</div>
				<div className="col-lg-9">
					<div className="py-4 pr-4">
						{ this.renderPhotoGrid(this.state.photos) }
					</div>
				</div>
			</div>
		);
	};
}

export default withRouter(Home);

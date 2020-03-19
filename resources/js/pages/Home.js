import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Config from '../config';
import Util from '../util';

import Sidebar from '../components/Sidebar';
import PhotoThumbnail from '../components/PhotoThumbnail';

class Home extends React.Component {
	state = {
        photos: {
            1: { title: 'Test 1', url: 'https://via.placeholder.com/400x300', id: 1 },
            2: { title: 'Test 2', url: 'https://via.placeholder.com/400x300', id: 2 },
            3: { title: 'Test 3', url: 'https://via.placeholder.com/400x300', id: 3 },
            4: { title: 'Test 4', url: 'https://via.placeholder.com/400x300', id: 4 },
            5: { title: 'Test 5', url: 'https://via.placeholder.com/400x300', id: 5 },
            6: { title: 'Test 6', url: 'https://via.placeholder.com/400x300', id: 6 },
            7: { title: 'Test 7', url: 'https://via.placeholder.com/400x300', id: 7 },
            8: { title: 'Test 8', url: 'https://via.placeholder.com/400x300', id: 8 },
        },
        collections: [],
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
        }, '?');
        axios.get(`${Config.serverURL}photos${queryString}`)
            .then(response => {
                // convert photo array to key-ID object
                const photos = response.data.reduce((photos, photo) => {
                    photos[photo.id] = photo;
                    return photos;
                }, {});
                this.setState({ photos });
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
	renderPhotoGrid = (photos) => {
		if (!photos) return <div>No Results.</div>;
		return (
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

import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Config from '../config';
import Util from '../util';
import { setState } from '../actions';
import { fetchPhotos } from '../photos';
import Sidebar from '../components/Sidebar';
import PhotoThumbnail from '../components/PhotoThumbnail';

const Home = props => {
    const { dispatch, photos, pagination, collections } = { ...props };
    const [batchMode, setBatchMode] = useState(false);
    const [batch, setBatch] = useState({});
    const [batchData, setBatchData] = useState({});

    const fetchCollections = () => {
        axios.get(`${Config.serverURL}collections`)
            .then(response => {
                const collections = response.data;
                dispatch(setState({ collections }));
            })
            .catch(error => {
                alert('Collections could not be loaded. Please try again.');
                console.error(error);
            });
    };
    const startBatchMode = () => {
        setBatchMode(true);
    };
    const stopBatchMode = () => {
        setBatch({});
        setBatchMode(false);
    };
    const selectPhoto = (photoID) => {
        if (batchMode) {
            // in batch mode - toggle photo from the batch
            const newBatch = { ...batch };
            if (batch[photoID]) {
                // remove from batch
                delete newBatch[photoID];
            } else {
                // copy into batch from state
                newBatch[photoID] = photos[photoID];
            }
            setBatch(newBatch);
        } else {
            // not in batch mode - navigate to photo
            props.history.push(`/photo/${photoID}`);
        }
    };
    const updateBatchData = e => {
        const batchData = {
            [e.target.name]: e.target.value
        };
        setBatchData(batchData);
    };
    const saveBatch = () => {
        const ids = Object.keys(batch);
        const batchRequestData = { ...batchData };
        batchRequestData.ids = ids;
        if (!batchRequestData.ids || !batchRequestData.ids.length) {
            alert('Empty batch! Select photos by clicking them.');
            return;
        }
        axios.post(`${Config.serverURL}photos`, Util.convertObjectToFormData(batchRequestData))
            .then(response => {
                stopBatchMode();
                // to do: success alert
            })
            .catch(error => {
                alert(error);
                console.error(error);
            });
    };
    const changePage = page => {
        const pagination = { ...pagination };
        if (page > 0 && page <= pagination.lastPage) {
            pagination.currentPage = page;
        }
        dispatch(setState({ pagination }));
        fetchPhotos();
    };

    useEffect(() => {
        fetchPhotos();
        fetchCollections();
    }, []);

    const renderPaginationBar = () => {
        return (
            <div className="text-right mb-2">
                Page {pagination.currentPage} of {pagination.lastPage} ({pagination.total} Results)
            </div>
        );
    };
    const renderPaginationControls = () => {
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
                    <span className="page-link" onClick={() => changePage(page)}>{ page }</span>
                </li>
            );
        }
        return (
            <nav aria-label="Page Navigation">
                <ul className="pagination justify-content-center">
                    <li className={pagination.currentPage == 1 ? 'page-item disabled' : 'page-item'}>
                        <span className="page-link" onClick={() => changePage(pagination.currentPage - 1)}>
                            &laquo;
                        </span>
                    </li>
                    {[0,1,2,3,4].map(pageNumber => renderButton(pageNumber))}
                    <li className={pagination.currentPage == pagination.lastPage ? 'page-item disabled' : 'page-item'}>
                        <span className="page-link" onClick={() => changePage(pagination.currentPage + 1)}>
                            &raquo;
                        </span>
                    </li>
                </ul>
            </nav>
        );
    };
	const renderPhotoGrid = (photos) => {
        if (!photos) return <div>No Results.</div>;
        console.log('render photo grid', batch);
		return (
            <>
                {renderPaginationBar()}
                <div className="photo-grid row">
                    { Object.keys(photos).map(photoID => {
                        let className = 'photo-grid__item';
                        if (batch[photoID]) {
                            className += ' photo-grid__item--selected';
                        }
                        return (
                            <div className="col-6 col-md-4 col-lg-3" key={ photoID }>
                                <div onClick={ () => selectPhoto(photoID) }>
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
                {renderPaginationControls()}
            </>
		)
	}

    return (
        <div className="row">
            <div className="col-lg-3">
                <Sidebar
                    user={props.user}
                    batch={batch}
                    batchMode={batchMode}
                    startBatchMode={startBatchMode}
                    stopBatchMode={stopBatchMode}
                    updateBatchData={updateBatchData}
                    saveBatch={saveBatch}
                    fetchPhotos={fetchPhotos}
                    collections={collections}
                />
            </div>
            <div className="col-lg-9">
                <div className="py-4 pr-4">
                    { renderPhotoGrid(photos) }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    photos: state.photos,
    pagination: state.pagination,
    collections: state.collections
});

export default withRouter(connect(mapStateToProps)(Home));

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { setFilters } from '../actions';

import 'react-datepicker/dist/react-datepicker.css';

function AdvancedSearch(props) {
    const { collections, filters } = props;

    const getClassName = () => {
        let className = 'window';
        if (!props.isOpen) {
            className += ' d-none';
        }
        return className;
    };

    const updateSearch = newFilters => props.dispatch(setFilters({ ...filters, ...newFilters }));

    const renderCollectionFilter = () => (
        <>
            <label htmlFor="collection">Collection</label>
            <select
                name="collection"
                className="form-control"
                value={filters.collection}
                onChange={e => updateSearch({ collection: e.target.value })}
            >
                {collections.map(collection => (
                    <option value={collection.id} key={collection.id}>
                        {collection.name}
                    </option>
                ))}
            </select>
        </>
    );

    const renderOrientationFilter = () => (
        <>
            <label htmlFor="orientation">Orientation</label>
            <select
                name="orientation"
                className="form-control"
                value={filters.orientation}
                onChange={e => updateSearch({ orientation: e.target.value })}
            >
                <option value="any">Any</option>
                <option value="landscape">Landscape</option>
                <option value="portrait">Portrait</option>
                <option value="square">Square</option>
            </select>
        </>
    );

    const renderSizeFilter = () => (
        <>
            <label htmlFor="size">Minimum Size</label>
            <select
                name="size"
                className="form-control"
                value={filters.size}
                onChange={e => updateSearch({ size: e.target.value })}
            >
                <option value="any">Any</option>
                <option value="4000">Extra Large (4000px)</option>
                <option value="2000">Large (2000px)</option>
                <option value="1000">Medium (1000px)</option>
                <option value="500">Small (500px)</option>
            </select>
        </>
    );

    const renderPhotographerFilter = () => (
        <>
            <label htmlFor="photographer">Photographer</label>
            <input
                type="text"
                name="photographer"
                placeholder="Search Photographers..."
                className="form-control"
                value={filters.photographer}
                onChange={e => updateSearch({ photographer: e.target.value })}
            />
        </>
    );

    const renderMinDateTakenFilter = () => (
        <>
            <label htmlFor="min-date-taken">Min Date Taken</label>
            <DatePicker
                selected={filters.minDateTaken || ''}
                onChange={date => updateSearch({ minDateTaken: date })}
                className="form-control"
                wrapperClassName="d-block"
                dateFormat="MMMM d, yyyy"
            />
        </>
    );

    const renderMaxDateTakenFilter = () => (
        <>
            <label htmlFor="max-date-taken">Max Date Taken</label>
            <DatePicker
                selected={filters.maxDateTaken || ''}
                onChange={date => updateSearch({ maxDateTaken: date })}
                className="form-control"
                wrapperClassName="d-block"
                dateFormat="MMMM d, yyyy"
            />
        </>
    );

    const renderMinDateUploadedFilter = () => (
        <>
            <label htmlFor="min-date-uploaded">Min Date Uploaded</label>
            <DatePicker
                selected={filters.minDateUploaded || ''}
                onChange={date => updateSearch({ minDateUploaded: date })}
                className="form-control"
                wrapperClassName="d-block"
                dateFormat="MMMM d, yyyy"
            />
        </>
    );

    const renderMaxDateUploadedFilter = () => (
        <>
            <label htmlFor="max-date-uploaded">Max Date Uploaded</label>
            <DatePicker
                selected={filters.maxDateUploaded || ''}
                onChange={date => updateSearch({ maxDateUploaded: date })}
                className="form-control"
                wrapperClassName="d-block"
                dateFormat="MMMM d, yyyy"
            />
        </>
    );

    const renderMinDateModifiedFilter = () => (
        <>
            <label htmlFor="min-date-modified">Min Date Modified</label>
            <DatePicker
                selected={filters.minDateModified || ''}
                onChange={date => updateSearch({ minDateModified: date })}
                className="form-control"
                wrapperClassName="d-block"
                dateFormat="MMMM d, yyyy"
            />
        </>
    );

    const renderMaxDateModifiedFilter = () => (
        <>
            <label htmlFor="max-date-modified">Max Date Modified</label>
            <DatePicker
                selected={filters.maxDateModified || ''}
                onChange={date => updateSearch({ maxDateModified: date })}
                className="form-control"
                wrapperClassName="d-block"
                dateFormat="MMMM d, yyyy"
            />
        </>
    );

    return (
        <div className={getClassName()}>
            <div className="window__content container">
                <div className="row">
                    <div className="col-md">
                        <div className="form-group">
                            {renderCollectionFilter()}
                        </div>
                        <div className="form-group">
                            {renderOrientationFilter()}
                        </div>
                        <div className="form-group">
                            {renderSizeFilter()}
                        </div>
                        <div className="form-group">
                            {renderPhotographerFilter()}
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="row">
                            <div className="col-lg">
                                <div className="form-group">
                                    {renderMinDateTakenFilter()}
                                </div>
                            </div>
                            <div className="col-lg">
                                <div className="form-group">
                                    {renderMaxDateTakenFilter()}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg">
                                <div className="form-group">
                                    {renderMinDateUploadedFilter()}
                                </div>
                            </div>
                            <div className="col-lg">
                                <div className="form-group">
                                    {renderMaxDateUploadedFilter()}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg">
                                <div className="form-group">
                                    {renderMinDateModifiedFilter()}
                                </div>
                            </div>
                            <div className="col-lg">
                                <div className="form-group">
                                    {renderMaxDateModifiedFilter()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AdvancedSearch.propTypes = {
    isOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    filters: state.filters,
    collections: state.collections
});

export default connect(mapStateToProps)(AdvancedSearch);

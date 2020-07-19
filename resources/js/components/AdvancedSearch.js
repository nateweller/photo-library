import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFilters } from '../actions';

function AdvancedSearch(props) {
    const { collections, filters } = props;

    const getClassName = () => {
        let className = 'window';
        if (!props.isOpen) {
            className += ' d-none';
        }
        return className;
    }

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

    return (
        <div className={getClassName()}>
            <div className="window__content container">
                <div className="form-group mt-2">
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

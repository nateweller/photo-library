import React from 'react';

class BatchForm extends React.Component {
    state = {
        tags: ''
    };
    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
        this.props.updateBatchData(e); // to do: bad
    };
    renderStart () {
        return (
            <div className="btn btn-secondary" onClick={this.props.startBatchMode}>
                Start
            </div>
        );
    };
    renderBatching = () => {
        return (
            <>
                <small className="d-block mb-2"><strong>{Object.keys(this.props.batch).length}</strong> Photos Selected</small>
                <div className="form-group">
                    <select
                        name="batchType"
                        className="form-control">
                        <option value="tags">Tags</option>
                        <option value="title">Title</option>
                        <option value="photographer">Photographer</option>
                    </select>
                </div>
                <input
                    type="text"
                    name="tags"
                    placeholder="Batch Value"
                    className="form-control mb-2"
                    value={this.state.tags}
                    onChange={this.handleChange}
                />
                {/* to do: apply tags action */}
                <button className="btn btn-primary btn-block mb-2" onClick={this.props.saveBatch}>Apply Tags</button>
                <button className="btn btn-secondary btn-block" onClick={this.props.stopBatchMode}>Cancel</button>
            </>
        );
    };
    render () {
        return (
            <>
                <h6>Batch Tool</h6>
                { this.props.batchMode ? this.renderBatching() : this.renderStart() }
            </>
        );
    };
}

export default BatchForm;

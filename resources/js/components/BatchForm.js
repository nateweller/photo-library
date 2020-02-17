import React from 'react';

class BatchForm extends React.Component {
    state = {
        tags: ''
    };
    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
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
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma separated)"
                    className="form-control mb-2"
                    value={this.state.tags}
                    onChange={this.handleChange}
                />
                {/* to do: apply tags action */}
                <button className="btn btn-primary btn-block mb-2">Apply Tags</button>
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

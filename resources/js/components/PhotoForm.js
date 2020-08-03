import React from 'react';

class PhotoForm extends React.Component {
    render() {
        return (
            <form>
                <input
                    type="text"
                    name="title"
                    placeholder="Photo Title"
                    className="form-control mb-2"
                    value={this.props.photo.title}
                    onChange={this.props.handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    className="form-control mb-2"
                    value={this.props.photo.description}
                    onChange={this.props.handleChange}
                />
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (separated,with,commas,like,this)"
                    value={this.props.photo.tags}
                    onChange={this.props.handleChange}
                />
                <input
                    type="text"
                    name="photographer"
                    placeholder="Photographer"
                    value={this.props.photo.tags}
                    onChange={this.props.handleChange}
                />
                <input type="submit" className="btn btn-primary" value="Save Photo" />
            </form>
        );
    }
}

export default PhotoForm;

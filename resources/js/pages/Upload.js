import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { MdAddAPhoto } from 'react-icons/md';

import Config from './../config';
import Util from './../util';

class Upload extends React.Component {
    state = {
        files: [],
    };
    isValidFileType (type) {
        return type.slice(0, 6) === 'image/';
    };
    onDrop = (newFiles) => {
        // push all images into state.files
        const { files } = {...this.state};
        newFiles.forEach(newFile => {
            if (this.isValidFileType(newFile.type)) {
                files.push(newFile);
            }
        });
        this.setState({ files });
    };
    upload = () => {
        if (!this.state.files) return;
        this.state.files.forEach(file => {
            const photo = {
                status: 1,
                title: file.name,
                photo: file
            };
            axios.post(
                    `${Config.serverURL}photos`,
                    Util.convertObjectToFormData(photo),
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                )
                .then(() => {
                    alert('Upload complete!');
                })
                .catch(() => {
                    alert('Upload failed.');
                });
        });
    };
    render () {
        return (
            <div className="p-4">
                <h2 className="mb-3">Upload Photos</h2>
                <Dropzone className="jumbotron" onDrop={this.onDrop} acceptedFiles="image/*">
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()} className="jumbotron text-center">
                            <input {...getInputProps()} />
                            <MdAddAPhoto className="mb-1 mt-2" style={{ width: '24px', height: '24px' }} />
                            <p className="m-0">Drag and drop some files here, or click to select files</p>
                            <div className="row justify-content-center">
                                {this.state.files.map((file, index) => {
                                    return (
                                        <div className="col-auto" key={`upload-${index}`}>
                                            <div className="card mt-4">
                                                <div className="card-body card-body--compact">
                                                    <img
                                                        src={window.URL.createObjectURL(file)}
                                                        alt={file.name}
                                                        style={{ height: '120px' }} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </Dropzone>
                <div className="text-center">
                    {this.state.files.length ? <div onClick={this.upload} className="btn btn-primary">Upload Now</div> : null}
                </div>
            </div>
        );
    }
}

export default Upload;

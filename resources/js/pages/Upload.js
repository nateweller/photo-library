import React from 'react';
import Dropzone from 'react-dropzone';
import { MdAddAPhoto } from 'react-icons/md';

class Upload extends React.Component {
    onDrop () {

    };
    render () {
        return (
            <div className="p-4">
                <h2 className="mb-3">Upload Photos</h2>
                <Dropzone className="jumbotron" onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()} className="jumbotron text-center">
                            <input {...getInputProps()} />
                            <MdAddAPhoto className="mb-1" style={{ width: '24px', height: '24px' }} />
                            <p className="m-0">Drag and drop some files here, or click to select files</p>
                        </div>
                    )}
                </Dropzone>
            </div>
        );
    }
}

export default Upload;

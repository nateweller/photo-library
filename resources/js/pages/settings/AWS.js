import React from 'react';

class AWS extends React.Component {
    render () {
        return (
            <>
                <h2>AWS S3 Settings</h2>
                <p>
                    This application uses <a href="https://docs.aws.amazon.com/s3/?id=docs_gateway">Amazon Simple Storage Service</a>
                    to save and share images. Enter your AWS credentials below to connect your account.
                </p>
                <div className="form-group">
                    <label htmlFor="identityPoolId">
                        Identity Pool ID
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        name="identityPoolId"
                        className="form-control"
                        placeholder="XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bucket">
                        S3 Bucket
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        name="bucket"
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="region">
                        Region
                    </label>
                    <input
                        type="text"
                        name="region"
                        className="form-control"
                        placeholder="XX-XXXX-X"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userPoolId">
                        User Pool ID
                    </label>
                    <input
                        type="text"
                        name="userPoolId"
                        className="form-control"
                        placeholder="XX-XXXX-X_abcd1234"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userPoolWebClientId">
                        User Pool Web Client ID
                    </label>
                    <input
                        type="text"
                        name="userPoolWebClientId"
                        className="form-control"
                        placeholder="XX-XXXX-X_abcd1234"
                    />
                </div>
                <input
                    type="submit"
                    value="Save"
                    className="btn btn-primary"
                />
            </>
        );
    };
}

export default AWS;

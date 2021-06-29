import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import {post} from '../../../api'
const Google = ({ informParent = f => f }) => {
    const responseGoogle = response => {
        console.log(response.tokenId);
        post('api/user/google-login',{ idToken: response.tokenId })
            .then(response => {
                console.log('GOOGLE SIGNIN SUCCESS', response);
                // inform parent component
                informParent(response);
            })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error.response);
            });
    };
    return (
        <>
            <GoogleLogin
                clientId='70870950823-tg4shcbd7geqqgh2072apmi7m06mqhbg.apps.googleusercontent.com'
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="btn btn-danger"
                    >
                        <i className="fab fa-google pr-2"></i> Login with Google
                    </button>
                )}
                cookiePolicy={'single_host_origin'}
            />
        </>
    );
};

export default Google;


import { MarkunreadSharp } from '@material-ui/icons';
import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { post } from '../../../api'
import { registerUser } from '../../../Action/appAction'
import { useDispatch, useSelector } from 'react-redux';
const Facebook = ({ informParent = f => f }) => {
    const dispatch = useDispatch()
    const responseFacebook = response => {
        let obj = {
            username: response.email,
            name: response.name,
            password: Math.round(Math.random() * 1000000)
        }
        dispatch(registerUser(obj, 'facebook'))
        console.log("response coming", response);

    };
    return (
        <>
            <FacebookLogin
                appId='594362008181821'
                fields="name,email"
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <button onClick={renderProps.onClick} className="btn btn-primary">
                        <i className="fab fa-facebook pr-2"></i> Login with Facebook
                    </button>
                )}
            />
        </>
    );
};

export default Facebook;
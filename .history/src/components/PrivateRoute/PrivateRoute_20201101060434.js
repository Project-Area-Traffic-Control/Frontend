import React from 'react';
import { useNavigate } from 'react-router-dom';
function PrivateRoute({ component: Component, roles, ...rest }) {
    let navigate = useNavigate();
    return (
        <div {...rest} render={props => {
            if (!localStorage.getItem('user')) {

                return navigate('/login', { replace: true });
                // not logged in so redirect to login page with the return url
                // return <Link to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };
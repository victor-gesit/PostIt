import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';

export const PrivateRoute = ({ component: Component,
  path: destinationPath, appInfo }) => {
  const authState = appInfo.authState;
  return (
      <Route path={destinationPath} render={
        props => (
          authState.signedIn ? (
            <Component {...props}/>
          ) : (
            <Redirect to={{
              pathname: '/',
              state: { from: props.location }
            }}/>
          )
        )
      }/>
  );
};

// export default PrivateRoute;

const mapStateToProps = state =>
  ({
    appInfo: {
      authState: state.appInfo.authState,
    },
    dataLoading: state.dataLoading
  });

export default connect(mapStateToProps)(PrivateRoute);

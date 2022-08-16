import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const NeedAuth = (props) => {
  const auth = useSelector(state => state.auth)
  const location = useLocation()
  return (
    auth.isLogin ?
      props.children :
      <Navigate
        to={'/authform'}
        replace
        state={{preLocation: location}}
      />
  );
};

export default NeedAuth;
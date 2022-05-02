import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/logo.png"
      {...props}
      // height='60px'
      // width= '60px'
    />
  );
};

export default Logo;

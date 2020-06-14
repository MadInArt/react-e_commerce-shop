import React from 'react';

import './button.scss';

const CustomButton = ({children, isGoogleSignIn, ...otherProps}) =>  (
<button className={`${isGoogleSignIn ? 'google-sign-in' : ''} button`}
    {...otherProps}>
    {children}
</button>
)

export default CustomButton;
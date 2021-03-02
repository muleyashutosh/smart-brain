import React from 'react';

const Navigation = ({isSignedIn, OnRouteChange}) => {
    if(isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <div 
                    onClick = {() => OnRouteChange('signin')}
                    className="dim link white underline pointer f4 pa3"
                >Signout</div>
            </nav>
        )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <div 
                    onClick = {() => OnRouteChange('signin')}
                    className="dim link white underline pointer f4 pa3"
                >Sign In</div>
                <div 
                    className="dim link white underline pointer f4 pa3"
                    onClick = {() => OnRouteChange('register')}
                >Register</div>
            </nav>
        )
    }
}

export default Navigation;

import React from 'react';
import '../loading-screen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-screen-overlay">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadingScreen;
import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotification } from '../store/slices/app.slice';

const Notification = () => {

    const notification = useSelector(state => state.app.notification);

    const dispatch = useDispatch();

    return (
        <div className="notification-container">
            <ToastContainer position="middle-center">
                <Toast 
                    onClose={() => dispatch(closeNotification())} 
                    show={notification.show} 
                    delay={3000} 
                    autohide
                    bg={notification.variant}
                    style={{color: "white"}}
                >
                    <Toast.Body>{notification.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default Notification;
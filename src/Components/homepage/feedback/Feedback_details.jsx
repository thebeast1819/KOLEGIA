import React from 'react';

const Feedback_details = ({feedbackDetail}) => {
    const {user, message} = feedbackDetail;
    return (
        <div class="item">
            <div class="shadow-effect">
                <p>{message}</p>
                <p id='user'>{user}</p>
            </div>
        </div>
    );
};

export default Feedback_details;
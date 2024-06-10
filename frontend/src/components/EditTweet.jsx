// src/components/EditTweet.js

import React, { useState } from 'react';
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';

const EditTweet = ({ tweet, onClose, onUpdate }) => {
    const [description, setDescription] = useState(tweet.description);

    const updateTweetHandler = async () => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/edit/${tweet._id}`, { description }, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                onUpdate(res.data.tweet);  // Pass the updated tweet to the parent component
                onClose();  // Close the modal
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Tweet</h2>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="tweet-textarea"
                />
                <button onClick={updateTweetHandler} className="btn-save">Save</button>
                <button onClick={onClose} className="btn-cancel">Cancel</button>
            </div>
        </div>
    );
};

export default EditTweet;

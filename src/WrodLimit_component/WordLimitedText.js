// src/components/WordLimitedText.js
import React from 'react';
import truncateText from '../utils/truncateText';

const WordLimitedText = ({ text, wordLimit }) => {
    const truncatedText = truncateText(text, wordLimit);
    const remainingText = text.split(' ').slice(wordLimit).join(' ');

    return (
        <>
            {truncatedText}
            {text.split(' ').length > wordLimit && (
                <div>{remainingText}</div>
            )}
        </>
    );
};

export default WordLimitedText;

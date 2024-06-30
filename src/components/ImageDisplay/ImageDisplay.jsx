import React from 'react';
import styles from './ImageDisplay.module.css';

const ImageDisplay = ({ title, image }) => {
    return (
        <div className={styles.imageSection}>
            <h3>{title}</h3>
            <img src={image} alt={title} className={styles.image} />
        </div>
    );
};

export default ImageDisplay;

import React from 'react';
import styles from './QualityControl.module.css';

const QualityControl = ({ quality, setQuality, generateAsciiArt }) => {
    return (
        <div className={styles.qualityOptions}>
            <h3>Adjust Quality:</h3>
            <label>
                Quality:
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                />
                <span>{Math.round(quality * 100)}%</span>
            </label>
            <button onClick={generateAsciiArt} className={styles.generateButton}>
                Generate ASCII Art
            </button>
        </div>
    );
};

export default QualityControl;

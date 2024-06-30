import React from 'react';
import styles from './ControlButtons.module.css';

const ControlButtons = ({ handleReset, isAsciiArtAvailable, isMatrixifiedAvailable, handleDownload, downloadFormat, downloadAsciiArt }) => {
    return (
        <div className={styles.controlButtons}>
            <button onClick={handleReset} className={styles.resetButton}>
                Reset
            </button>
            {isAsciiArtAvailable && (
                <div>
                    <button onClick={downloadAsciiArt} className={styles.downloadButton}>
                        Download ASCII Art
                    </button>
                </div>
            )}
            {isMatrixifiedAvailable && (
                <div>
                    <select onChange={(e) => downloadFormat(e.target.value)} className={styles.select}>
                        <option value="png">PNG</option>
                        <option value="jpg">JPG</option>
                        <option value="svg">SVG</option>
                    </select>
                    <button onClick={handleDownload} className={styles.downloadButton}>
                        Download Image
                    </button>
                </div>
            )}
        </div>
    );
};

export default ControlButtons;

import React, { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.css';

const Tooltip = () => {
    const [visible, setVisible] = useState(false);
    const tooltipRef = useRef(null);

    const toggleTooltip = () => {
        setVisible(!visible);
    };

    const handleClickOutside = (event) => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        if (visible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visible]);

    return (
        <div className={styles.tooltipContainer}>
            <button className={`${styles.infoIcon} ${visible ? styles.active : ''}`} onClick={toggleTooltip}>
                <svg className={styles.infoIconSvg} fill="currentColor" width="24px" height="24px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-alert-rhombus-fill">
                    <path d="M12,21H10V20H9V19H8V18H7V17H6V16H5V15H4V14H3V13H2V12H1V10H2V9H3V8H4V7H5V6H6V5H7V4H8V3H9V2H10V1H12V2H13V3H14V4H15V5H16V6H17V7H18V8H19V9H20V10H21V12H20V13H19V14H18V15H17V16H16V17H15V18H14V19H13V20H12ZM12,12V6H10V12ZM12,16V14H10V16Z" />
                </svg>
            </button>
            {visible && (
                <div className={styles.tooltipMessage} ref={tooltipRef}>
                    <h3>Best Practices</h3>
                    <p>To get the best ASCII art:</p>
                    <ul>
                        <li>Upload clear, high-contrast images.</li>
                        <li>Adjust the quality slider to fine-tune the pixelation.</li>
                        <li>The lesser the quality, lesser the size of the ASCII (uses less characters).</li>
                        <li>For Matrixify you can play around with the slider to get something that looks good.</li>
                        <li>For ASCII art upload images stretched in width.</li>
                    </ul>
                    <img src="example1.png" alt="[Example images to be added]" className={styles.tooltipImage} />
                    <img src="example2.png" alt="[Example images to be added]" className={styles.tooltipImage} />
                </div>
            )}
        </div>
    );
};

export default Tooltip;

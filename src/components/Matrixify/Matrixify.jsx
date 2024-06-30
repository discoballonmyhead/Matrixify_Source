// src/components/Matrixify/Matrixify.jsx
import React from 'react';
import styles from './Matrixify.module.css';

const Matrixify = ({ asciiArt, originalImage, setMatrixImage }) => {
    const handleMatrixify = () => {
        const asciiLines = asciiArt.split('\n');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = originalImage;
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            const scale = width / asciiLines[0].length;

            canvas.width = width;
            canvas.height = height;

            // Create ASCII image as 1x1 pixel blocks
            ctx.font = `${scale}px monospace`;
            ctx.textBaseline = 'top';

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            asciiLines.forEach((line, y) => {
                for (let x = 0; x < line.length; x++) {
                    const char = line[x];
                    if (char !== ' ') {
                        ctx.fillText(char, x * scale, y * scale);
                    }
                }
            });

            // Create image data from ASCII art
            const asciiImageData = ctx.getImageData(0, 0, width, height);

            // Draw the original image as a mask on top
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            const originalImageData = ctx.getImageData(0, 0, width, height);

            // Apply mask: preserve ASCII pixels and make others transparent
            for (let i = 0; i < asciiImageData.data.length; i += 4) {
                if (asciiImageData.data[i + 3] === 0) {
                    originalImageData.data[i + 3] = 0; // Make transparent
                }
            }

            ctx.putImageData(originalImageData, 0, 0);
            setMatrixImage(canvas.toDataURL('image/png'));
        };
    };

    return (
        <button className={styles.matrixifyButton} onClick={handleMatrixify}>
            Matrixify
        </button>
    );
};

export default Matrixify;

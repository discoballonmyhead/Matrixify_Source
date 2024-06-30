import React, { useEffect } from 'react';

const asciiDensityMap = {
    "densest": ["@"],
    "veryDense": ["%"],
    "dense": ["#"],
    "mediumDense": ["*"],
    "mediumDensity": ["+"],
    "lessDense": ["="],
    "lightDensity": ["-"],
    "veryLight": ["."],
    "lightest": [" "],
};


const AsciiArtGenerator = ({ image, quality, setAsciiArt }) => {
    useEffect(() => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const pixelSize = Math.max(5, 20 * (1 - quality)); // Adjust pixel size based on quality
            canvas.width = Math.floor(img.width / pixelSize);
            canvas.height = Math.floor(img.height / pixelSize);
            const ctx = canvas.getContext('2d');

            // Draw pixelated image
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Get pixelated image data
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imgData.data;

            // Convert to grayscale
            for (let i = 0; i < pixels.length; i += 4) {
                const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
                pixels[i] = avg;
                pixels[i + 1] = avg;
                pixels[i + 2] = avg;
            }
            ctx.putImageData(imgData, 0, 0);

            // Create ASCII art
            let asciiArt = '';
            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const pixelIndex = (y * canvas.width + x) * 4;
                    const brightness = pixels[pixelIndex];
                    const densityKeys = Object.keys(asciiDensityMap);
                    const densityIndex = Math.floor((brightness / 255) * (densityKeys.length - 1));
                    const densityGroup = densityKeys[densityIndex];
                    const chars = asciiDensityMap[densityGroup];
                    const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
                    asciiArt += chars[charIndex];
                }
                asciiArt += '\n';
            }
            setAsciiArt(asciiArt);
        };
    }, [image, quality, setAsciiArt]);

    return null;
};

export default AsciiArtGenerator;
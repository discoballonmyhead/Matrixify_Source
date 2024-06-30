import React, { useState } from 'react';
import Dropzone from '../Dropzone/Dropzone';
import ImageDisplay from '../ImageDisplay/ImageDisplay';
import QualityControl from '../QualityControl/QualityControl';
import ControlButtons from '../ControlButtons/ControlButtons';
import AsciiArtGenerator from '../AsciiArtGenerator/AsciiArtGenerator';
import Tooltip from '../Tooltip/Tooltip';
import Matrixify from '../Matrixify/Matrixify';
import styles from './ImageUploader.module.css';

const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [asciiArt, setAsciiArt] = useState('');
    const [quality, setQuality] = useState(0); // Quality range from 0 (low) to 1 (high)
    const [generate, setGenerate] = useState(false);
    const [matrixImage, setMatrixImage] = useState('');
    const [downloadFormat, setDownloadFormat] = useState('png');

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
            setGenerate(false); // Reset generate flag
        };
        reader.readAsDataURL(file);
    };

    const handleReset = () => {
        setImage(null);
        setAsciiArt('');
        setQuality(0);
        setGenerate(false);
        setMatrixImage('');
    };

    const generateAsciiArt = () => {
        setGenerate(true);
    };

    const handleDownloadFormatChange = (format) => {
        setDownloadFormat(format);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        if (downloadFormat === 'png') {
            link.href = matrixImage;
            link.download = 'matrixified_image.png';
        } else if (downloadFormat === 'jpg') {
            const canvas = document.createElement('canvas');
            const img = new Image();
            img.src = matrixImage;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                link.href = canvas.toDataURL('image/jpeg');
                link.download = 'matrixified_image.jpg';
                link.click();
            };
            return;
        } else if (downloadFormat === 'svg') {
            const svgData = `
                <svg xmlns="http://www.w3.org/2000/svg" width="${matrixImage.width}" height="${matrixImage.height}">
                    <image href="${matrixImage}" width="100%" height="100%" />
                </svg>`;
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            link.href = svgUrl;
            link.download = 'matrixified_image.svg';
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadAsciiArt = () => {
        const blob = new Blob([asciiArt], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ascii_art.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={styles.container}>
            <Dropzone onDrop={onDrop} />
            {image && <ImageDisplay title="Original Image" image={image} />}
            {image && (
                <div className={styles.qualityControlContainer}>
                    <QualityControl
                        quality={quality}
                        setQuality={setQuality}
                        generateAsciiArt={generateAsciiArt}
                    />
                    <Tooltip />
                </div>
            )}
            {generate && (
                <AsciiArtGenerator
                    image={image}
                    quality={quality}
                    setAsciiArt={setAsciiArt}
                />
            )}
            {asciiArt && (
                <>
                    <Matrixify
                        asciiArt={asciiArt}
                        originalImage={image}
                        setMatrixImage={setMatrixImage}
                    />
                    <div className={styles.asciiArt}>
                        <h3>ASCII Art:</h3>
                        <textarea value={asciiArt} readOnly />
                    </div>
                </>
            )}
            {matrixImage && (
                <div className={styles.imageSection}>
                    <h3>Matrixified Image:</h3>
                    <img src={matrixImage} alt="Matrixified" className={styles.image} />
                </div>
            )}
            <ControlButtons
                handleReset={handleReset}
                isAsciiArtAvailable={!!asciiArt}
                isMatrixifiedAvailable={!!matrixImage}
                handleDownload={handleDownload}
                downloadFormat={handleDownloadFormatChange}
                downloadAsciiArt={downloadAsciiArt}
            />
        </div>
    );
};

export default ImageUploader;

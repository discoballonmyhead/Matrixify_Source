import React from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Dropzone.module.css';

const Dropzone = ({ onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps({ className: styles.dropzone })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop an image here, or click to select one</p>
        </div>
    );
};

export default Dropzone;

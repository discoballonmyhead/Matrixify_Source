import React from 'react';
import styles from './Description.module.css';

const Description = () => {
    return (
        <div className={styles.descriptionContainer}>
            <h2>About This Page</h2>
            <p>
            This project is an interactive web application that allows users to upload images, adjust their quality, and convert them into ASCII art. Users can further manipulate the ASCII art by converting it back to an image (matrixify), which can then be downloaded in various formats (PNG, JPG, and SVG). The application also includes a tooltip feature that provides best practices for using the application.
            This is created by me (<a href="https://github.com/discoballonmyhead">@discoballonmyhead</a>) as a project for learning React and Svelte. I (<a href="https://github.com/discoballonmyhead">@discoballonmyhead</a>) is inspired by 
            <a href="https://www.youtube.com/@Frankslaboratory">@Frankslaboratory</a> and <a href="https://www.youtube.com/@TheCodingTrain">@TheCodingTrain</a>. Please do check them out if you are interested.
            This project uses a slightly different logic, NOT utilizing grids for the image to ASCII conversion. Please check out the <a href="https://github.com/discoballonmyhead/image-to-ascii/blob/master/README.md">README</a> for more information.
            </p>
        </div>
    );
};

export default Description;

import React from 'react';
import HeroHeader from './components/HeroHeader/HeroHeader';
import ImageUploader from './components/ImageUploader/ImageUploader';
import Description from './components/Description/Description';
import Footer from './components/Footer/Footer';
import styles from './App.module.css';

const App = () => {
    return (
        <div className={styles.appContainer}>
            <HeroHeader />
            <div className={styles.content}>
                <ImageUploader />
                <Description />
            </div>
            <Footer />
        </div>
    );
};

export default App;

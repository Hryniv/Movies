import React, { useState } from 'react';
import classes from './Carousel.module.scss';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useNavigate} from "react-router-dom";
import {IMovie} from "../../interfaces";
import {urls} from "../../constans";

interface CarouselProps {
    movies: IMovie[];
}

const Carousel: React.FC<CarouselProps> = ({movies}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = movies.length;
    const navigate = useNavigate();
    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 5 + totalSlides) % totalSlides);
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 5) % totalSlides);
    };

    return (
        <div className={classes.carousel}>
            <div className={classes.carouselInner}>
                <button className={classes.carouselBtn} onClick={prevSlide}>
                    <KeyboardArrowLeftIcon/>
                </button>
                <div className={classes.slidesWrapper}>
                    <div className={classes.slides} style={{ transform: `translateX(-${currentSlide * 20}%)` }}>
                        {movies.map((item, index) => (
                           <img
                               key={index}
                               src={`${urls.poster}${item.poster_path}`}
                               alt={`poster ${index}`}
                               onClick={() => navigate(`/movie/${item.id}`, {state: {...item}})}
                           />
                        ))}
                    </div>
                </div>
                <button className={classes.carouselBtn} onClick={nextSlide}>
                    <KeyboardArrowRightIcon/>
                </button>
            </div>
        </div>
    );
};

export default Carousel;

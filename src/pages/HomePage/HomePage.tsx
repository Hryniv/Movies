import React, {useEffect} from 'react';
import classes from './HomePage.module.scss'
import Carousel from "../../components/Carousel/Carousel";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {movieActions} from "../../redux/slices/movie.slice";
const HomePage = () => {
    const {upcomingMovies, nowPlayingMovies, popularMovies} = useAppSelector(state => state.movieReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getUpcoming(1));
        dispatch(movieActions.getNowPlaying(1));
        dispatch(movieActions.getPopular(1));
    }, [])

    return (
        <div className={classes.wrapper}>
            <h1 className={classes.title}>Movies List by Hryniv - Discover your own taste</h1>
            <div className={classes.arrowContainer}>
                <div className={classes.chevron}></div>
                <div className={classes.chevron}></div>
                <div className={classes.chevron}></div>
            </div>
            <div className={classes.carouselWrapper}>
                <div>
                    <div className={classes.carouselTitle}>Upcoming:</div>
                    <Carousel movies={upcomingMovies}/>
                </div>
                <div>
                    <div className={classes.carouselTitle}>Now playing:</div>
                    <Carousel movies={nowPlayingMovies}/>
                </div>
                <div>
                    <div className={classes.carouselTitle}>Popular:</div>
                    <Carousel movies={popularMovies}/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
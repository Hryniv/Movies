import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import classes from './Sidebar.module.scss';
import Avatar from '@mui/material/Avatar';
import WindowSharpIcon from '@mui/icons-material/WindowSharp';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MovieIcon from '@mui/icons-material/Movie';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {pages} from "../../constans";
import {movieActions} from "../../redux/slices/movie.slice";
const Sidebar = () => {
    const {currentPage, pageIsUserOn, lightMode} = useAppSelector(state => state.movieReducer);
    const [activeIcon, setActiveIcon] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem("lightMode") === "true") {
            dispatch(movieActions.switchMode());
        }

        if (localStorage.getItem("pageIsUserOn") === pages.home) {
            setActiveIcon('WindowIcon');
        } else if (localStorage.getItem("pageIsUserOn") === pages.movies) {
            setActiveIcon('MoviesIcon');
        }
    }, [])

    useEffect(() => {
        if (pageIsUserOn === pages.home) {
            setActiveIcon('WindowIcon');
            localStorage.setItem("pageIsUserOn", pages.home);
        } else if (pageIsUserOn === pages.movies) {
            setActiveIcon('MoviesIcon');
            localStorage.setItem("pageIsUserOn", pages.movies);
        }
    }, [pageIsUserOn])

    useEffect(() => {
        if (localStorage.getItem("lightMode") === "true") {
            document.body.classList.add("lightMode");
        } else {
            document.body.classList.remove("lightMode");
        }
    }, [lightMode])
    const renderMovies = () => {
        navigate(`/movies?page=1`);
        dispatch(movieActions.updatePageIsUserOn(pages.movies));
    }

    const moveToHomePage = () => {
        dispatch(movieActions.updatePageIsUserOn(pages.home));
    }

    const changeMode = () => {
        dispatch(movieActions.switchMode());
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.topWrapper}>
                <MovieIcon sx={{fontSize: 42}} style={{ fill: 'rgb(231, 62, 65)'}}/>

                <nav>
                    <ul className={classes.menu}>
                        <li onClick={moveToHomePage}>
                            <Link to="/">
                                <WindowSharpIcon
                                    className={activeIcon === 'WindowIcon' ? `${classes.WindowSharpIcon} ${classes.active}` : classes.WindowSharpIcon}
                                    sx={{fontSize: 24}}/>
                            </Link>
                        </li>
                        <li onClick={renderMovies}>
                            <Link to={`/movies?page=${currentPage}`}>
                                <LocalMoviesIcon
                                    className={activeIcon === 'MoviesIcon' ? `${classes.LocalMoviesIcon} ${classes.active}` : classes.LocalMoviesIcon}
                                    sx={{fontSize: 24}}/>
                            </Link>
                        </li>
                        <li onClick={changeMode}>
                            {
                                localStorage.getItem("lightMode") === "true" ?
                                    <LightModeIcon sx={{fontSize: 24}} style={{ fill: '#fff', cursor: "pointer"}}/>
                                    :
                                    <DarkModeIcon sx={{fontSize: 24}} style={{ fill: '#fff', cursor: "pointer"}}/>
                            }
                        </li>
                    </ul>
                </nav>
            </div>

            <div className={classes.user}>
                <Avatar
                    alt="User"
                    sx={{ width: 42, height: 42 }}
                    src="https://avatars.githubusercontent.com/u/72021107?s=400&u=15da421c03627f3181c50e45310158ae90b03f19&v=4"
                />
            </div>
        </div>
    );
};

export default Sidebar;
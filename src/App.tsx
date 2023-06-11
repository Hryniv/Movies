import React, {useEffect} from 'react';
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import {Route, Routes} from "react-router-dom";
import MoviePage from "./pages/MoviePage/MoviePage";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import classes from "./App.module.scss";
import {movieActions} from "./redux/slices/movie.slice";
import {useAppDispatch} from "./hooks/redux.hooks";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getGenres());
    }, []);

    return (
    <div className={classes.contentWrapper}>
        <Topbar/>
        <Sidebar/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/movies" element={<MoviesPage/>}/>
            <Route path="/movie/:id" element={<MoviePage/>}/>
        </Routes>
    </div>
    );
}

export default App;

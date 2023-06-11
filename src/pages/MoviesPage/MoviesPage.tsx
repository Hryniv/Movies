import React, {useEffect} from 'react';
import classes from './MoviesPage.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {movieActions} from "../../redux/slices/movie.slice";
import MovieCard from "../../components/MovieCard/MovieCard";
import {createTheme, ThemeProvider, Pagination, PaginationItem} from "@mui/material";
import {Link, useLocation} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: "rgb(231, 62, 65)"
        }
    },
});

const MoviesPage = () => {
    const {movies, total_pages, currentPage} = useAppSelector(state => state.movieReducer);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = +(searchParams.get('page') || '1');
    const query = searchParams.get('query');
    const withGenres = searchParams.get('with_genres');


    useEffect(() => {
        dispatch(movieActions.updatePage(page));

        if (query) {
            dispatch(movieActions.getMovieByName([query, page]));
        } else if (withGenres) {
            dispatch(movieActions.getMoviesByGenre([withGenres, page]))
        } else {
            dispatch(movieActions.getAll(page));
        }

    }, [currentPage, query, withGenres]);

    const getDynamicUrl = (page:number|null) => {
        if (query) {
            return `?query=${query}&page=${page}`;
        } else if (withGenres) {
            return `?with_genres=${withGenres}&page=${page}`;
        } else {
            return `?page=${page}`;
        }
    }

    const handlePagination = (event:any, page:number) => {
        dispatch(movieActions.updatePage(page))
    }

    return (
        <>
            <div className={classes.cardWrapper}>
                {
                    movies ?
                    movies.map(item => (
                        <MovieCard
                            key={item.id}
                            movie={item}

                        />
                    ))
                    :
                    null
                }
            </div>
            {<ThemeProvider theme={theme}>
                <Pagination
                    className={classes.pagination}
                    count={total_pages}
                    color="primary"
                    page={page}
                    size={"large"}
                    onChange={handlePagination}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={getDynamicUrl(item.page)}
                            {...item}
                        />
                    )}
                />
            </ThemeProvider>}

        </>
    );
};

export default MoviesPage;
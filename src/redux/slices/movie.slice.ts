import {IMovie, IGenre, IFullGenres, IFullData } from "../../interfaces";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from 'axios';
import movieService from "../../services/movie.service";

interface IState {
    movies: IMovie[],
    nowPlayingMovies: IMovie[],
    popularMovies: IMovie[],
    upcomingMovies: IMovie[],
    currentPage: number,
    total_pages: number,
    genres: IGenre[],
    pageIsUserOn: string,
    lightMode: boolean
}

const initialState: IState = {
    movies: [],
    nowPlayingMovies: [],
    popularMovies: [],
    upcomingMovies: [],
    currentPage: 1,
    total_pages: 500,
    genres: [],
    pageIsUserOn: "",
    lightMode: false
}

const getAll = createAsyncThunk<IFullData<IMovie[]>, number> (
    "movieSlice/getAll",
    async (page,{rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll(page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    });

const getNowPlaying = createAsyncThunk<IFullData<IMovie[]>, number> (
    "movieSlice/getNowPlaying",
    async (page,{rejectWithValue}) => {
        try {
            const {data} = await movieService.getNowPlaying(page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
});

const getPopular = createAsyncThunk<IFullData<IMovie[]>, number> (
    "movieSlice/getPopular",
    async (page,{rejectWithValue}) => {
        try {
            const {data} = await movieService.getPopular(page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
});

const getUpcoming = createAsyncThunk<IFullData<IMovie[]>, number> (
    "movieSlice/getUpcoming",
    async (page,{rejectWithValue}) => {
        try {
            const {data} = await movieService.getUpcoming(page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
});

const getGenres = createAsyncThunk<IFullGenres, void> (
    "movieSlice/getGenres",
        async (_, {rejectWithValue}) => {
            try {
                const {data} = await movieService.getGenres();
                return data;
            } catch (e) {
                const err = e as AxiosError;
                return rejectWithValue(err.response?.data);
            }
        }
)

const getMovieByName = createAsyncThunk<IFullData<IMovie[]>, [string, number]> (
    "movieSlice/getMovieByName",
    async ([movieName, page], {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovieByName(movieName, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const getMoviesByGenre = createAsyncThunk<IFullData<IMovie[]>, [string, number]> (
    "movieSlice/getMoviesByGenre",
    async ([genre, page], {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMoviesByGenre(genre, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        updatePage: (state, action) => {
            state.currentPage = action.payload;
        },
        updatePageIsUserOn: (state, action) => {
            state.pageIsUserOn = action.payload;
        },
        switchMode: (state) => {
            state.lightMode = !state.lightMode;
            localStorage.setItem("lightMode", state.lightMode.toString());
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.movies = action.payload.results;
                if (action.payload.total_pages > 500) {
                    state.total_pages = 500;
                } else {
                    state.total_pages = action.payload.total_pages;
                }
            })
            .addCase(getNowPlaying.fulfilled, (state, action) => {
                state.nowPlayingMovies = action.payload.results;
            })
            .addCase(getPopular.fulfilled, (state, action) => {
                state.popularMovies = action.payload.results;
            })
            .addCase(getUpcoming.fulfilled, (state, action) => {
                state.upcomingMovies = action.payload.results;
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.genres = action.payload.genres;
            })
            .addCase(getMovieByName.fulfilled, (state, action) => {
                state.movies = action.payload.results;
                state.total_pages = action.payload.total_pages;
            })
            .addCase(getMoviesByGenre.fulfilled, (state, action) => {
                state.movies = action.payload.results;
                if (action.payload.total_pages > 500) {
                    state.total_pages = 500;
                } else {
                    state.total_pages = action.payload.total_pages;
                }
            })

    }
})

const {actions, reducer: movieReducer} = movieSlice;
const movieActions = {
    ...actions,
    getAll,
    getNowPlaying,
    getPopular,
    getUpcoming,
    getGenres,
    getMovieByName,
    getMoviesByGenre,
}
export {
    movieActions,
    movieReducer
}
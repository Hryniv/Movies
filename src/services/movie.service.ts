import {IRes} from "../types/axiosRes.type";
import {axiosService} from "./axios.service";
import {urls} from "../constans";
import {IFullData, IFullGenres, IMovie, IVideo} from "../interfaces";

const movieService = {
    getAll: (page:number = 1):IRes<IFullData<IMovie[]>> => axiosService.get(`${urls.movie}?page=${page}`),
    getNowPlaying: (page:number = 1):IRes<IFullData<IMovie[]>> => axiosService.get(`${urls.nowPlaying}?page=${page}`),
    getPopular: (page:number = 1):IRes<IFullData<IMovie[]>> => axiosService.get(`${urls.popular}?page=${page}`),
    getUpcoming: (page:number = 1):IRes<IFullData<IMovie[]>> => axiosService.get(`${urls.upcoming}?page=${page}`),
    getGenres: ():IRes<IFullGenres> => axiosService.get(urls.categories),
    getMovieByName: (movieName:string, page:number = 1):IRes<IFullData<IMovie[]>> => axiosService.get(`${urls.search}?query=${movieName}&page=${page}`),
    getVideos: (movieId:number):IRes<IVideo> => axiosService.get(`${urls.videos}/${movieId}/videos`),
    getMoviesByGenre: (genre:string, page:number = 1):IRes<IFullData<IMovie[]>> => axiosService.get(`${urls.movie}?with_genres=${genre}&page=${page}`),
}

export default movieService;
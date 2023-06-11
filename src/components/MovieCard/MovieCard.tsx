import React, {FC} from 'react';
import classes from './MovieCard.module.scss';
import {Rating} from "@mui/material";
import {IMovie} from "../../interfaces";
import {useAppSelector} from "../../hooks/redux.hooks";
import {urls, notFound} from "../../constans";
import {useNavigate} from "react-router-dom";

interface IProps {
    movie: IMovie
}
const MovieCard:FC<IProps> = ({movie}) => {
    const navigate = useNavigate();
    const {genres} = useAppSelector(state => state.movieReducer);
    const {id, poster_path, genre_ids, title, overview, vote_average, release_date} = movie;
    const description = overview ? overview.slice(0, 100) + '...' : notFound.description;
    const date = release_date ? new Date(release_date).getFullYear() : notFound.year;
    const rate = Math.round(vote_average * 2) / 2;
    const poster = poster_path ? (urls.poster + poster_path) : notFound.image;
    let genreObj;
    genreObj = genre_ids.length > 1 ? genres?.find(item => item.id === genre_ids[0]) : {name: notFound.genres};

    return (
        <div className={classes.wrapper} onClick={() => navigate(`/movie/${id}`, {state: {...movie}})}>
            <div className={classes.poster}><img src={poster} alt={title}/></div>
            <div className={classes.infoWrapper}>
                <div className={classes.title}>{title}</div>
                <div className={classes.addInfo}>{date} | {genreObj?.name}</div>
                <div className={classes.description}>{description}</div>
            </div>
            <Rating
                className={classes.rate}
                name="half-rating-read"
                defaultValue={rate}
                precision={0.5}
                max={10}
                readOnly
            />
        </div>
    );
};

export default MovieCard;
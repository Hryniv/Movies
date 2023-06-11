import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import classes from './MultiselectDropdown.module.scss';
import {Button} from "@mui/material";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {movieActions} from "../../redux/slices/movie.slice";
import {pages} from "../../constans";

type IGenres = Record<string, boolean>;
const MultiselectDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {register, handleSubmit, formState: {isValid}} = useForm<IGenres>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {genres} = useAppSelector(state => state.movieReducer);
    let genreArr = genres.map(item => item.name);

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    const atLeastOneCheckboxChecked = (value: boolean, genres: IGenres) => {
        const arr:boolean[] = [];
        for (const genresKey in genres) {
            arr.push(genres[genresKey]);
        }
        return arr.some(item => item);
    };

    const filterByGenre = (data:IGenres) => {
        let genreNames:string[] = [];
        for (const dataKey in data) {
            if (data[dataKey]) {
                genreNames.push(dataKey);
            }
        }
        const genreIds = genres
            .filter(genreObj => genreNames.includes(genreObj.name))
            .map(genreObj => genreObj.id);

        const filteredGenresStr = genreIds.join(',');
        navigate(`/movies?with_genres=${filteredGenresStr}`);
        dispatch(movieActions.updatePageIsUserOn(pages.movies));
    }

    return (
        <div className={classes.dropdown}>
            <div className={classes["dropdown-btn"]} onClick={toggleDropdown}>
                Choose genres
                <span>{isOpen ? <ExpandLessIcon sx={{fontSize: 32}}/> : <ExpandMoreIcon sx={{fontSize: 32}}/>}</span>
            </div>
            {isOpen && (
                <>
                    <form onSubmit={handleSubmit(filterByGenre)} className={classes["dropdown-content"]}>
                        {genreArr.map((item) => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    {...register(item, {validate: atLeastOneCheckboxChecked})}
                                />
                                {item}
                            </label>
                        ))}
                    <div className={classes["buttons-wrapper"]}>
                        <Button
                            disabled={!isValid}
                            type={"submit"}
                            className={classes["filter-btn"]}
                            variant="outlined">
                            filter
                        </Button>
                    </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default MultiselectDropdown;
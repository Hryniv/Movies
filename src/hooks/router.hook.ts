import {useLocation, Location} from 'react-router-dom';

interface IState<T> extends Location {
    state: T
}

const useAppLocation = <T>(): IState<T> => useLocation();


export {
    useAppLocation
}
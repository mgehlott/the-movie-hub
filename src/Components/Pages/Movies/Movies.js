import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../../../File";
import MoviesList from "../../../MoviesAndSeries/MoviesList";
import CustomPagination from "../../Pagination/CustomPagination";
import styles from '../Trending/Trending.module.css';
import Genres from "../../Genres/Genres";
import useGenres from '../../../hooks/useGenres';

const Movies = () => {

    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numPage, setNumPage] = useState();
    const [selectedGenre, setSeletedGenre] = useState([]);
    const [allGenre, setAllGenre] = useState([]);
    const genresForUrl = useGenres(selectedGenre);

    const fetchData = async () => {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresForUrl}&with_watch_monetization_types=flatrate`

        const { data } = await axios.get(url);
        setContent(data.results);
        setNumPage(data.total_pages);
        // console.log(data);
    }

    useEffect(() => {
        fetchData();
    }, [page, genresForUrl])

    return <>
        <div className="pagetitle">Movies</div>
        <Genres type="movie"
            selectedGenre={selectedGenre}
            setSeletedGenre={setSeletedGenre}
            allGenre={allGenre}
            setAllGenre={setAllGenre}
            setPage={setPage}
        />

        <div className={styles.trending}>

            {content && <MoviesList data={content} />}
        </div>
        <CustomPagination setPage={setPage} numOfPages={numPage} />
    </>
}
export default Movies;
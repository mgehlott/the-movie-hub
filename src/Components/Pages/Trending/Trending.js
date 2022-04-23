import axios from "axios";
import { useEffect, useState } from "react";
import MoviesList from "../../../MoviesAndSeries/MoviesList";
import styles from "./Trending.module.css";
import CustomPagination from "../../Pagination/CustomPagination";
import { API_KEY } from '../../../File';




const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    console.log(API_KEY + " is apiii");

    const fetchData = async () => {
        const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`

        const { data } = await axios.get(url);
        setContent(data.results);
    }

    useEffect(() => {
        fetchData();
    }, [page]);

    return <>
        <div className="pagetitle">Trending</div>
        <div className={styles.trending}>

            {content && <MoviesList data={content} />}
        </div>
        <CustomPagination setPage={setPage} />
    </>
}
export default Trending;
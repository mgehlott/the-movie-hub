import axios from "axios";
import { useEffect, useState } from "react";
import MoviesList from "../../../MoviesAndSeries/MoviesList";
import styles from "./Trending.module.css";
import CustomPagination from "../../Pagination/CustomPagination";




const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);

    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=7f21e2ac2d9437374830cd068e43b8e0&page=${page}`);
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
import { Button, createTheme, TextField, ThemeProvider, Tabs, Tab, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { API_KEY } from '../../../File';
import axios from "axios";
import MoviesList from "../../../MoviesAndSeries/MoviesList";
import CustomPagination from "../../Pagination/CustomPagination";
import styles from '../Trending/Trending.module.css';
import Loader from "../../../UI/Loader/Loader";

const Search = () => {

    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPage, setNumOfPage] = useState();
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            }
        }
    });

    const fetchContent = async () => {
        setIsLoading(true);

        const url = `https://api.themoviedb.org/3/search/${type === 0 ? "movie" : "tv"}?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        const { data } = await axios.get(url);
        //console.log(data);
        setContent(data.results);
        setNumOfPage(data.total_pages);
        console.log(data);
        setIsLoading(false);
    }

    useEffect(() => {
        window.scroll(0, 0);
        if (searchText !== "")
            fetchContent(); //eslint-disable-next-line
        {
            console.log('type is ' + type);
        } // eslint-disable-next-line
    }, [type, page]);

    return <div>
        <ThemeProvider theme={darkTheme}>
            <div style={{ display: 'flex' }}>


                <TextField id="filled-basic"
                    sx={{ input: { color: 'white' } }}
                    style={{ flex: 1 }}
                    className='searchbox'
                    label="search"
                    variant="filled"
                    onChange={(e) => { setSearchText(e.target.value) }}
                />
                <Button variant="contained"
                    style={{ marginLeft: '15px' }}
                    onClick={fetchContent}
                ><SearchIcon /></Button>
            </div>
            <Box sx={{
                borderBottom: 1, borderColor: 'divider'
            }}>
                <Tabs sx={{
                    marginTop: '10px'

                }}
                    variant='fullWidth'
                    value={type} indicatorColor='primary'
                    textColor='primary'
                    onChange={(evnet, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                >

                    <Tab sx={{ width: '50%', color: '#fff' }} label="Search Movies" />
                    <Tab sx={{ width: "50%", color: '#ccc' }} label="Search Series" />

                </Tabs>
            </Box>
        </ThemeProvider>
        {isLoading && <div className="loader">
            <Loader />
        </div>}
        {!isLoading &&
            <div className={styles.trending}>

                {content.length !== 0 ? <MoviesList data={content} type={type === 0 ? 'movie' : 'tv'} /> : <h2 className={styles.trending}>No Item is found</h2>}
            </div>
        }


        {numOfPage > 1 && <CustomPagination numOfPages={numOfPage} setPage={setPage} />}




    </div>
}
export default Search;
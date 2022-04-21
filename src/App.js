
import { Container } from '@mui/material';
import styles from './App.module.css';
import Header from './Components/Header/Header';
import SimpleBottomNavigation from './Components/MainNavigation/MainNavigation';
import { Route, Routes } from 'react-router-dom';
import Trending from './Components/Pages/Trending/Trending';
import Movies from './Components/Pages/Movies/Movies';
import Series from './Components/Pages/Series/Series';
import Search from './Components/Pages/Search/Search';

function App() {
  return (
    <>
      <Header />
      <div className={styles.app}>
        <Container>
          <Routes>
            <Route path='/' element={<Trending />} exact />
            <Route path='/movies' element={<Movies />} />
            <Route path='/series' element={<Series />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </>
  );
}

export default App;

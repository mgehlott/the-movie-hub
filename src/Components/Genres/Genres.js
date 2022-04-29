
import Chip from '@mui/material/Chip';

import axios from 'axios'
import React, { useEffect } from 'react'
import { API_KEY } from '../../File'

function Genres({ type, selectedGenre, setSeletedGenre, allGenre, setAllGenre, setPage }) {

  const handleAdd = (genre) => {
    setSeletedGenre([...selectedGenre, genre]);
    setAllGenre(allGenre.filter((g) => g.id !== genre.id));
    setPage(1);
  }

  const handleRemove = (gnere) => {
    setSeletedGenre(selectedGenre.filter((g) => g.id !== gnere.id));
    setAllGenre([...allGenre, gnere]);
    setPage(1);
  }

  const fetchGenre = async () => {
    const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`;
    const { data } = await axios.get(url);
    setAllGenre(data.genres);
    //console.log(data.genres);
    //console.log(allGenre);

  }

  useEffect(() => {
    fetchGenre();
    return () => {
      setAllGenre([]);
    } // eslint-disable-next-line
  }, []);

  //console.log(allGenre);



  return (
    <div style={{ pading: '6px 0', margin: '10px 0' }}>


      {selectedGenre &&
        selectedGenre.map((genre) => {
          return <Chip
            label={genre.name}
            key={genre.id}
            size='medium'
            style={{ margin: 5, color: '#fff' }}
            clickable
            onDelete={() => handleRemove(genre)}
            color='primary'
          />
        })
      }

      {allGenre && allGenre.map((genre) => {
        return <Chip
          label={genre.name}
          key={genre.id}
          size='medium'
          style={{ margin: 5, backgroundColor: '#fff' }}
          clickable
          variant='outlined'
          onClick={() => handleAdd(genre)}
        />
      })}
    </div>
  )
}

export default Genres

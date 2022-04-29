import React from 'react'
import styles from './MoviesList.module.css';
import SingleMovie from './SingleMovie';

export default function MoviesList({ data, type }) {
    //  console.log('data is ' + data[0]);
    return (
        <div className={styles.list}>
            {data.map((item) => {
                return <SingleMovie
                    id={item.id}
                    key={item.id}
                    poster={item.poster_path}
                    title={item.title || item.name}
                    date={item.release_date || item.first_air_date}
                    vote={item.vote_average}
                    media_type={type ? type : item.media_type}
                />
            })}
        </div>
    )
}

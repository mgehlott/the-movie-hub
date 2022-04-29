import React from 'react';
import styles from './SingleMovie.module.css';
import { img_300, unavailable } from '../Config/Config';
import { Badge } from '@mui/material';
import ContentModal from '../Components/ContentlModal/ContentModal';

export default function SingleMovie({
    id, poster, title, date, vote, media_type }) {
    // console.log(title);
    return (
        <ContentModal media_type={media_type} id={id}  >
            <Badge badgeContent={vote} color={vote > 6 ? "primary" : "secondary"} />
            <img className={styles.poster} src={poster ? `${img_300}${poster}` : unavailable} alt={title} />
            <b className={styles.title}>{title}</b>
            <span className={styles.subtitle}>
                {media_type === 'tv' ? 'Tv Series' : 'Movie'}
                <span className={styles.subtitle}>
                    {date}
                </span>
            </span>

        </ContentModal>
    )
}

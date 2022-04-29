import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { YouTube } from '@mui/icons-material';
import Button from '@mui/material/Button';
//import styles from '../../MoviesAndSeries/SingleMovie.module.css';
import { API_KEY } from '../../File';
import axios from 'axios';
import { useEffect, useState } from 'react';
import classes from './ContentModal.module.css';
import { img_500, unavailableLandscape } from '../../Config/Config';
import Carousel from '../Carousel/Carousel';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '80%',
    bgcolor: '#39445a',
    border: '1px solid #282c34',
    boxShadow: 24,
    color: 'white',
    p: 4,
};

export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchData = async () => {

        const url = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`;
        const { data } = await axios.get(url);
        setContent(data);
        // console.log(data);
    }

    const fetchVideo = async () => {

        const url = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`;
        const { data } = await axios.get(url);
        setVideo(data.results[0]?.key);

    }

    useEffect(() => {
        fetchData();
        fetchVideo(); // eslint-disable-next-line
    }, []);
    return (
        <>
            <div onClick={handleOpen} className={classes.media}>{children}</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {content && <div className={classes.contentModal}>
                            <img
                                className={classes.modalImg}
                                alt={content.title || content.name}
                                src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailableLandscape}
                            />

                            <img
                                alt={content.name || content.title}
                                className={classes.modalImgLand}
                                src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape}
                            />
                            <div className={classes.contentAbout}>
                                <span className={classes.contentTitle}>
                                    {content.title || content.name} (
                                    {(
                                        content.first_air_date ||
                                        content.release_date ||
                                        "........"
                                    ).substring(0, 4)}
                                    )
                                </span>

                                {content.tagline && (
                                    <i className={classes.tagline}>{content.tagline}</i>
                                )
                                }
                                <span className={classes.contentDisc}>
                                    {content.overview}
                                </span>
                                <div>
                                    <Carousel id={id} media_type={media_type} />
                                </div>
                                <Button
                                    variant='contained'
                                    startIcon={<YouTube />}
                                    color='secondary'
                                    target='_blank'
                                    href={`https://www.youtube.com/watch?v=${video}`}
                                >
                                    Watch the Trailer
                                </Button>
                            </div>
                        </div>}




                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

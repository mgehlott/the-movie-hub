import axios from 'axios';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { API_KEY } from '../../File';
import { img_300, noPicture } from '../../Config/Config';
import './Carousel.css';

const handleDragStart = (e) => e.preventDefault();



const Carousel = ({ id, media_type }) => {
    const [credit, setCredit] = useState([]);

    const items = credit?.map((it) => {
        return <div className='carouselItem'>
            <img
                alt={it?.name}
                src={it.profile_path ? `${img_300}/${it.profile_path}` : noPicture}
                onDragStart={handleDragStart}
                className='carouselImg'
            />
            <p className='carouselText'>{it?.name}</p>
        </div>
    });

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    };

    const fetchData = async () => {
        const url = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`;
        const { data } = await axios.get(url);
        setCredit(data.cast);
        console.log(data);
    }

    useEffect(() => {
        fetchData(); // eslint-disable-next-line
    }, []);

    return (
        <AliceCarousel
            responsive={responsive}
            autoPlay
            infinite
            disableDotsControls
            disableButtonsControls
            mouseTracking items={items} />
    );
}
export default Carousel;
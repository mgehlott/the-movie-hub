import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from 'react-router-dom';


export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{
            width: '100%',
            position: 'fixed',
            bottom: 0

        }}>
            <BottomNavigation
                style={{
                    backgroundColor: '#2d313a',
                    zIndex: 200,
                    color: 'white'
                }}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>

                <Link to='/'>
                    <BottomNavigationAction
                        label="Trending"
                        icon={<WhatshotIcon />}
                        style={{ color: 'white' }}
                    />
                </Link>

                <Link to='/movies'>
                    <BottomNavigationAction label="Movies" icon={<MovieIcon />}
                        style={{ color: 'white' }}
                    />
                </Link>

                <Link to='/series'>
                    <BottomNavigationAction label="Tv Series"
                        icon={<TvIcon />}
                        style={{ color: 'white' }} />
                </Link>

                <Link to='/search'>
                    <BottomNavigationAction label="Search"
                        icon={<SearchIcon />}
                        style={{ color: 'white' }} />
                </Link>


            </BottomNavigation>

        </Box>
    );
}

import React from 'react'
import Pagination from '@mui/material/Pagination';




export default function CustomPagination({ setPage, numOfPages = 10 }) {

    const pageChangeHandle = (page) => {

        setPage(page)
        window.scroll(0, 0);
    }


    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px'

            }}
        >


            <Pagination count={numOfPages}
                color='primary'
                onChange={(e) => { pageChangeHandle(e.target.textContent) }}
            />

        </div>
    )
}

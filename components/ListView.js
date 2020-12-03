import React, { useState, useEffect, useContext } from 'react';

import ListItem from './ListItem';
import ColorDetails from './ColorDetails';
import Pagination from './Pagination';
import { GlobalContext } from '../apollo/GlobalState';

const ListView = () => {
    const { getColorDetails, clearColor, colorList, activeColor, tintArr } = useContext(GlobalContext);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 12;
    const indexOfLastColor = currentPage * perPage;
    const indexOfFirstColor = indexOfLastColor - perPage;
    const currentColors = colorList.slice(indexOfFirstColor, indexOfLastColor);

    useEffect(() => {
        // getColors()
    }, [])

    const renderColors = currentColors.map((color, i) => (
        <ListItem
            color={color}
            key={i}
            onSelection={getColorDetails}
        />
    ))

    const renderDetails = () => (
        <ColorDetails
            color={activeColor}
            tintArr={tintArr}
            clearColor={clearColor}
        />
    )

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="col-9 py-5 px-3">
            <div className="row justify-content-around">
                {activeColor ? renderDetails() : renderColors}
            </div>
            {activeColor ? null :
                <Pagination
                    perPage={perPage}
                    totalColors={colorList.length}
                    paginate={paginate}
                />
            }
        </div>
    )
}

export default ListView
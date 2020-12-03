import React, { useContext } from 'react';
import { GlobalContext } from '../apollo/GlobalState';

const SidePanel = () => {
    const { colorSelect, getRandomDetails, getCategory } = useContext(GlobalContext);

    return (
        <aside className="col-3 sidebar py-5">
            <ul className="list-unstyled">
                <li className="text-center">
                    <button
                        className="btn btn-custom btn-light border-dark px-5 py-2 mb-4 font-weight-bold"
                        onClick={() => getRandomDetails()}
                    > Random Color </button>
                </li>

                {colorSelect.map((color, i) => (
                    <li key={i}>
                        <a onClick={(e) => getCategory(e, color)} href={color} className='color-select'>
                            {color}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
export default SidePanel
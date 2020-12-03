import React, { useState, useContext } from 'react';
import { GlobalContext } from '../apollo/GlobalState';
import HHLogo from '../public/hhlogo';

export default () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { getSearchDetails } = useContext(GlobalContext);

    const submitHandler = (e) => {
        e.preventDefault();
        getSearchDetails(searchTerm)
        setSearchTerm('')
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <HHLogo />
                </a>
                <form
                    className="form-inline ml-auto"
                    onSubmit={e => submitHandler(e)}
                >
                    <input
                        type="text"
                        className="form-control mr-2"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </form>
            </div>
        </nav >
    )
}
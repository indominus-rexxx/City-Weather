import React, { Component } from 'react';
import Table from '../table';
import AddPanel from '../add-panel';
import Geolocation from '../geolocation';

import './styles.css';

export default class App extends Component {
    render() {
        return (
            <div className='app'>
                <h1><center>City Weather</center></h1>
                <AddPanel/>
                <Table/>
                <Geolocation/>
            </div>
        );
    };
};
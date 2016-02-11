import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';
import Application from './Application';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';

export default (
    <Route path="/" component={Application}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="*" component={NotFound}/>
    </Route>
)

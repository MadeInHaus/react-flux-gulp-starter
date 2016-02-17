import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Application from 'components/Application';
import Home from 'components/Home';
import About from 'components/About';
import NotFound from 'components/NotFound';

export default (
    <Route path="/" component={Application}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="*" component={NotFound}/>
    </Route>
);

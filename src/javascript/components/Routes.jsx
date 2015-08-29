'use strict';

import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import Application from './Application';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';

export default (
    <Route name="app" path="/" handler={Application}>
        <Route name="about" handler={About} />
        <DefaultRoute name="home" handler={Home} />
        <NotFoundRoute handler={NotFound} />
    </Route>
)

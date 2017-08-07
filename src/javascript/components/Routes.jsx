import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Application from 'components/Application';
import Home from 'components/Home';
import Page from 'components/Page';
import NotFound from 'components/NotFound';

export default (
    <Route path="/" component={Application}>
        <IndexRoute component={Home} />
        <Route path="page" component={Page} />
        <Route path="*" component={NotFound} isNotFound />
    </Route>
);

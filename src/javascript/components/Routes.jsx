if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import Application from 'components/Application';
import Home from 'components/Home';
import NotFound from 'components/NotFound';

export default {
    path : '/',
    component : Application,
    childRoutes: [
        {
            path: 'about',
            getComponent(nextState, cb){
                require.ensure([], require => {
                    cb(null, require('./About.jsx').default);
                });
            }
        },
        {
            path: 'contact',
            getComponent(nextState, cb) {
                require.ensure([], require => {
                    cb(null, require('./Contact.jsx').default);
                });
            }
        },
        {
            path: '*',
            component: NotFound
        }

    ],
    indexRoute : {
        component: Home
    }
};

import _ from 'lodash';

import executeMultiple from 'fluxible-action-utils/async/executeMultiple';

export default function fetchRouteData(context, routerState) {
    const actionsArray = routerState.components
                        .filter(component => _.isFunction(component.load))
                        .map(component => component.load(context, routerState.params))
                        .reduce((actions, componentActions) => (
                            _.assign(actions, componentActions)
                        ), {});

    return new Promise((resolve, reject) => {
        executeMultiple(context, actionsArray, err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

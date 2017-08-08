import _isFunction from 'lodash/isFunction';
import _assign from 'lodash/assign';

import executeMultiple from 'fluxible-action-utils/async/executeMultiple';

export default function fetchRouteData(context, routerState) {
    const actionsArray = routerState.components
        .filter(component => component && _isFunction(component.load))
        .map(component => component.load(context, routerState.params))
        .reduce(
            (actions, componentActions) => _assign(actions, componentActions),
            {}
        );

    return new Promise((resolve, reject) => {
        executeMultiple(context, actionsArray, err => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
}

import _ from 'lodash';

import executeMultiple from 'fluxible-action-utils/async/executeMultiple';

export default function fetchRouteData(context, routerState, done) {

    const actions = routerState.components
                        .filter(component => _.isFunction(component.load))
                        .map(component => component.load(context, routerState.params))
                        .reduce((actions, componentActions) => _.assign(actions, componentActions), {});

    executeMultiple(context, actions, done);

}

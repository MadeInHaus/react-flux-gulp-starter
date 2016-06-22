/**
 * Inspired by
 * https://css-tricks.com/making-sass-talk-to-javascript-with-json/
 * https://github.com/eduardoboucas/include-media-export
 *
 * NOTE: this setup does not support <=IE8
 *
 * WIP
 * last updated sep 24, 2015
 */

const getBreakpoints = {
    name: 'getBreakpoints',

    plugContext: (options, context, app) => {

        const element = typeof document !== 'undefined' ? document.body : null;
        let breakpoints = false;

        function removeQuotes(string) {
            if (typeof string === 'string' || string instanceof String) {
                string = string.replace(/[']/g, '"').replace(/\\|^[\s\S]{0,1}|[\s\S]$/g, '');
            }
            return string;
        }

        function getBreakpoints() {
            if (
                (typeof window !== 'undefined') &&
                (window.getComputedStyle) &&
                (window.getComputedStyle(element, '::after').content !== '')
            ) {
                const data = window.getComputedStyle(element, '::after').content;
                try {
                    breakpoints = JSON.parse(removeQuotes(data));
                    return breakpoints;
                } catch (err) {
                    console.log(err);
                }
            }
        }

        function isBreakpointActive(breakpoint) {
            getBreakpoints();
            return breakpoints.hasOwnProperty(breakpoint) && breakpoints[breakpoint].active;
        }

        function isBreakpointNotActive(breakpoint) {
            return !isBreakpointActive(breakpoint);
        }

        function getActiveBreakpoint() {
            getBreakpoints();

            let largest = { name: false, value: 0 };

            for (const breakpoint in breakpoints) {
                if (breakpoints.hasOwnProperty(breakpoint)) {
                    const breakpointValue = parseFloat(breakpoints[breakpoint].value);

                    if (breakpoints[breakpoint].active && (breakpointValue > largest.value)) {
                        largest = { name: breakpoint, value: breakpointValue };
                    }
                }
            }

            return largest.name;

        }

        function getBreakpointValue(breakpoint, asNumber) {

            getBreakpoints();

            if (!breakpoints || !breakpoints.hasOwnProperty(breakpoint)) {
                return false;
            }

            return asNumber ? parseFloat(breakpoints[breakpoint].value) : breakpoints[breakpoint].value;

        }

        return {

            plugStoreContext: (storeContext, context, app) => {

                storeContext.getBreakpoints = {
                    getBreakpoints,
                    getActive: getActiveBreakpoint,
                    getValue: getBreakpointValue,
                    isGreaterThan: isBreakpointActive,
                    isLessThan: isBreakpointNotActive,
                };

                return storeContext;

            },

            plugComponentContext: (componentContext, context, app) => {

                componentContext.getBreakpoints = {
                    getBreakpoints,
                    getActive: getActiveBreakpoint,
                    getValue: getBreakpointValue,
                    isGreaterThan: isBreakpointActive,
                    isLessThan: isBreakpointNotActive,
                };

                return componentContext;

            },

            /**
             * Allows context plugin settings to be persisted between server and client. Called on server
             * to send data down to the client
             * @method dehydrate
             */
            dehydrate: () => {},

            /**
             * Called on client to rehydrate the context plugin settings
             * @method rehydrate
             * @param {Object} state Object to rehydrate state
             */
            rehydrate: (state) => {},
        };
    },

    /**
     * Allows dehydration of application plugin settings
     * @method dehydrate
     */
    dehydrate: () => {
    },

    /**
     * Allows rehydration of application plugin settings
     * @method rehydrate
     * @param {Object} state Object to rehydrate state
     */
    rehydrate: (state) => {},
};

export default getBreakpoints;

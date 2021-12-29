/**
 * @typedef {{ name: string, prefix: string }} RouterGroupOptions
 * @typedef {{ method: string, path: string, handlers: Function}} Routes
 * @param {RouterGroupOptions}
 * @param {Routes}
 * @return {Array<Route>}
 */

const routerGroup = (routerGroupOptions, routes) => routes.map((route) => ({
        ...route,
        method: route.method.toLowerCase(),
        path: `/${[routerGroupOptions.prefix, route.path]
            .map((path) => path.replace(/(^\/|\/$)/g, ''))
            .filter((path) => path !== '').join('/')}`,
    }));

module.exports = {
    routerGroup,
};

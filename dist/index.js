'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setRestRoutes = setRestRoutes;
exports.restRoutes = restRoutes;
var Default = exports.Default = {
	options: {
		wrappers: {},
		name: 'defaultName'
	},
	React: {},
	Route: function Route() {},
	IndexRoute: function IndexRoute() {}
};
function setRestRoutes(_ref) {
	var React = _ref.React;
	var Route = _ref.Route;
	var IndexRoute = _ref.IndexRoute;

	Default.React = React;
	Default.Route = Route;
	Default.IndexRoute = IndexRoute;
}

function restRoutes(objectOfComponents, options) {
	return factory.restRoutesUnwrapped(Default, objectOfComponents, options);
}

var factory = {
	generateRouteComponent: function generateRouteComponent(componentName, Component, options, React) {
		var wrappers = options.wrappers;

		if (Object.keys(wrappers.length > 0)) {
			if (wrappers[componentName]) {
				if (wrappers[componentName] !== 'skip') {
					return wrappers[componentName](Component);
				}
				return Component;
			}
			if (wrappers.base) {
				return wrappers.base(Component);
			}
		}
		return Component;
	}
};

var generateRouteComponent = factory.generateRouteComponent;


factory.restRoutesUnwrapped = function (Default, objectOfComponents, options) {
	var React = Default.React;
	var Route = Default.Route;
	var IndexRoute = Default.IndexRoute;

	var restRoute = React.createElement(
		Route,
		{ path: options.name + '/', component: objectOfComponents.Base },
		Object.keys(objectOfComponents).filter(function (name) {
			return name !== 'Base';
		}).map(function (componentName) {
			var Component = generateRouteComponent(componentName, objectOfComponents[componentName], Object.assign({}, Default.options, options), React);
			if (componentName === 'Index') {
				return React.createElement(IndexRoute, { component: Component });
			}
			return React.createElement(Route, { path: componentName.toLowerCase(), component: Component });
		})
	);
	return restRoute;
};

exports.factory = factory;
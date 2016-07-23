//@flow
export type OptionsType = {
	name: string;
	wrappers?: Object;
};

export type HardOptionsType = {
	name: string;
	wrappers: Object;
};

export type DefaultType = {
	options: HardOptionsType;
	React: Object;
	Route: Function;
	IndexRoute: Function;
};

export const Default: DefaultType = {
	options: {
		wrappers: {}, 
		name: 'defaultName',
	},
	React: {},
	Route(){},
	IndexRoute(){},
};
export function setRestRoutes({React, Route, IndexRoute}: {React: Object; Route: Function; IndexRoute: Function}){
	Default.React = React;
	Default.Route = Route;
	Default.IndexRoute = IndexRoute;
}

export function restRoutes(objectOfComponents: Object, options: Object){
	return factory.restRoutesUnwrapped(Default, objectOfComponents, options);
}

const factory = {
	generateRouteComponent(componentName: string, Component: Function, options: HardOptionsType, React){
		const {wrappers} = options;
		if(Object.keys(wrappers.length > 0)){
			if(wrappers[componentName]){
				if(wrappers[componentName] !== 'skip'){
					return wrappers[componentName](Component);
				}
				return Component;
			}
			if(wrappers.base){
				return wrappers.base(Component);
			}
		}
		return Component;
	}
}

const {generateRouteComponent} = factory;

factory.restRoutesUnwrapped = (Default: DefaultType, objectOfComponents: Object, options: OptionsType) => {
	const {React, Route, IndexRoute} = Default;
	const restRoute = <Route path={`${options.name}/`} component={objectOfComponents.Base}>
		{
			Object
			.keys(objectOfComponents)
			.filter(name=>name !== 'Base')
			.map(
				componentName=>{
					const Component = generateRouteComponent(
						componentName, 
						objectOfComponents[componentName], 
						Object.assign({}, Default.options, options),
						React
					);
					if(componentName === 'Index'){
						return <IndexRoute component={Component} />;
					}
					return <Route path={componentName.toLowerCase()} component={Component} />;
				}
			)
		}
	</Route>;
	return restRoute
}


export {factory};
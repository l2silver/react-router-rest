React Router Rest
=========================
[![Coverage Status](https://coveralls.io/repos/github/l2silver/react-router-rest/badge.svg?branch=master)](https://coveralls.io/github/l2silver/react-router-rest?branch=master)
[![Build Status](https://travis-ci.org/l2silver/react-router-rest.svg?branch=master)](https://travis-ci.org/l2silver/react-router-rest)

Simple standardized react router routes with wrapper support

## Installation

```
npm install --save react-router-rest
```

## Example

../components/Users/Create.jsx
``` 
export function Create(props){
	return <div/>
}
```
../components/Users/Base.jsx
```
export function Base(props){
	return <div>{props.children}</div>
}
```
components/Users/index.jsx
```
export function Index(props){
	return <div/>
}
export * from './Create
export * from './Base
```
../components/Routes/index.jsx
```
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { restRoutes, setRestRoutes } from 'react-router-rest';
import * as Users from '../Users';
setRestRoutes({React, IndexRoute, Route});
<Router history={browserHistory}>
	<Route path="/">
		{restRoutes(Users, {name: 'users'})}
	</Route>
</Router>
====>
<Router history={browserHistory}>
	<Route path="/">
		<Route path="users/" component={Users.Base}>
		    <IndexRoute component={Users.Index}/>
		    <Route path="create" component={Users.Create}/>
	    </Route>
	</Route>
</Router>
```
## How it works
Base components are placed in the root component
Index components are placed in the IndexRoute component
Everything else is placed in a regular route, the path being the lower case version of the component name ie. Create = create, Example = example
## Wrapper Support
React Router Redux also supports wrappers with the optional wrappers property in options  
There are 2 wrapper settings
* base
* ComponentName  

The base property lets you define a wrapper for every route in that base route.
The ComponentName property both allows you to define wrappers for specific components, and allows you to skip wrappers for certain paths
#### Example
../components/Routes/index.jsx
```
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { restRoutes, setRestRoutes } from 'react-router-rest';
import * as Users from '../Users';
setRestRoutes({React, IndexRoute, Route});
const wrappers = {
    base: (Component)=><div><Component></div>
    Create: (Component)=><span><Component></span>
    Index: 'skip'
}
<Router history={browserHistory}>
	<Route path="/">
		{restRoutes(Users, {name: 'users', wrappers})}
	</Route>
</Router>
====>
<Router history={browserHistory}>
	<Route path="/">
		<Route path="users/" component={Users.Base}>
		    <IndexRoute component={Users.Index}/>
		    <Route path="create" component={wrappers.create(Users.Create)}/>
		    <Route path="edit" component={wrappers.base(Users.Edit)}/>
	    </Route>
	</Route>
</Router>
```
## License

MIT
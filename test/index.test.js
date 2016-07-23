//@flow
import React from 'react';
import {expect} from 'chai';
import {Default, setRestRoutes, restRoutes, factory} from '../src';
const {generateRouteComponent} = factory;
describe('react-router-rest', () => {
	it('setRestRoutes', ()=>{
		expect(Default.React).to.deep.equal({});
		const Route = (props)=><div {...props}></div>
		const IndexRoute = (props)=><div {...props}></div>
		setRestRoutes({React, Route, IndexRoute});
		expect(Default.React).to.equal(React);
		expect(Default.Route).to.equal(Route);
		expect(Default.IndexRoute).to.equal(IndexRoute);
	})
	describe('generateRouteComponent', ()=>{
		it('does not have wrappers', ()=>{
			const options = {wrappers: {}}
			const Component = ()=><p/>;
			expect(generateRouteComponent('example', Component, options, React)()).jsx.to.equal(<p/>)
		});
		it('has wrappers', ()=>{
			const options = {wrappers: {base: (Component)=>(props)=><div>{Component}</div>}}
			expect(generateRouteComponent('example', <p/>, options, React)()).jsx.to.equal(<div><p/></div>)
		});
		it('has custom wrapper', ()=>{
			const options = {wrappers: {example: (Component)=>(props)=><div>{Component}</div>}}
			expect(generateRouteComponent('example', <p/>, options, React)()).jsx.to.equal(<div><p/></div>)
		});
		it('has skip wrapper', ()=>{
			const options = {wrappers: {base: (props)=><div>{props.children}</div>, example: 'skip'}}
			const {Base} = options.wrappers;
			expect(generateRouteComponent('example', <p/>, options, React)).jsx.to.equal(<p/>)
		});
	})
	describe('restRoutesUnwrapped', ()=>{
		it('generates Routes for a resource', ()=>{
			const objectOfComponents = {
				Base: ()=><p/>,
				Index: ()=><div/>,
				Create: ()=><span/>,
			}
			expect(
				factory.restRoutesUnwrapped(Default, objectOfComponents, {name: 'example'})
			).to.deep.equal(
				<Default.Route path='example/' component={objectOfComponents.Base}>
					<Default.IndexRoute component={objectOfComponents.Index}/>
					<Default.Route path='create' component={objectOfComponents.Create}/>
				</Default.Route>
			)
		})
	})
})
import React,{Component} from 'react';
export default class Test extends Component{
	constructor(props)
	{
		super(props);
		this.state={
			id:this.props.params.Pid,
		}
	}
	render(){
		return(
			<div>Sdfsdf {this.state.id}</div>
		);
	}
}
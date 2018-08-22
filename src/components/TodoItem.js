import React from 'react';
import moment from 'moment';

class TodoItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      endDate: props.todoItem.startDate,
      tempoRestante: ''
    }
  }
  
  componentDidMount(props, state){
    let now = moment();
    let task = this.state.endDate;
    let difference = now.diff(task, 'minutes')
    difference = difference*-1
    

    let minutes = difference % 60;
    let hours = (difference - minutes) / 60;

    if(hours > 0 && hours < 24){
      this.setState({tempoRestante: hours+'h'})
    }else if(hours > 23){
      hours = Math.floor(hours/24)
      this.setState({tempoRestante: hours+'d'})
    }else if(minutes > 0){
      this.setState({tempoRestante: minutes+' min'})
    }else{
      this.setState({tempoRestante: null})
    }

  }
  render(){
    return(
      <li className={"list-group-item " + (this.state.tempoRestante ? '' : 'list-group-item-danger')}>
        <h4>{this.props.todoItem.todo}</h4>
        <p>{this.state.tempoRestante}</p>
      </li>
    )
  }
}


export default TodoItem;
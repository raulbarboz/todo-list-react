import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { editTodoBefore, removeTodoBefore } from '../actions/todos';

class TodoItem extends React.Component {
  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleRemove = this.handleRemove.bind(this)

    this.state = {
      todo: '',
      endDate: props.todoItem.startDate,
      tempoRestante: '',
      toggleEdit:false
    }
  }

  handleToggle(){
    this.setState({toggleEdit:!this.state.toggleEdit})

    if(this.state.toggleEdit){
      this.props.dispatch(editTodoBefore(this.props.todoItem.id, {todo:this.state.todo}))
    }

  }

  handleRemove(){
    this.setState({endDate: null})
    setTimeout(() => {
      this.props.dispatch(removeTodoBefore(this.props.todoItem.id))
    }, 1000)

  }

  handleFocus(){
    this.setState({todo:''})
  }

  handleChange(event){
    const todo = event.target.value ? event.target.value : '';
    this.setState({todo:todo})

  }

  componentDidMount(props, state){

    this.setState({todo: this.props.todoItem.todo})
    let task = this.state.endDate;

    let timeUpdate = setInterval(() => {

      let now = moment();
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
        clearInterval(timeUpdate)
      }
      if(!this.state.endDate){clearInterval(timeUpdate)}
    },1000)

    timeUpdate

  }

  render(){
    return(
      <li className={"list-group-item " + (this.state.tempoRestante ? '' : 'list-group-item-danger')}>
        <div className="task-item">
          <span onClick={this.handleRemove} className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
          <span onClick={this.handleToggle} className={"glyphicon pull-left " + (this.state.toggleEdit ? 'glyphicon-ok' : 'glyphicon-pencil')} aria-hidden="true"></span>
        </div>
        {this.state.toggleEdit ? <input className="inputEdit" onFocus={this.handleFocus} value={this.state.todo} onChange={this.handleChange} type="text"/> : <h4>{this.state.todo}</h4>}
        <p>{this.state.tempoRestante}</p>
      </li>
    )
  }
}


export default connect()(TodoItem);

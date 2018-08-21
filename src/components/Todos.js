import React from 'react';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { addTodo } from '../actions/todos';
import InputMoment from 'input-moment';
import moment from 'moment';
import 'input-moment/dist/input-moment.css';


class Todos extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
      startDate: moment()
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleChange(event){
    this.setState({value: event.target.value});
  }
  
  handleDateChange(date) {
     this.setState({
      startDate: date
    });
   
  }
  
  handleSubmit(event){
    event.preventDefault();
    const dateDispatch = moment(this.state.startDate._d).valueOf();
    this.props.dispatch(addTodo({todo: this.state.value, startDate: dateDispatch}))
    this.state = {
      value: '',
      startDate: this.state.startDate
    }
   }
  handleSave(date){
    console.log('save:', date)
  }
  render(){
    return(
      <div>
        <h1>Todos</h1>
        { 
          this.props.todos.map((todo, index)=>{
            return <TodoItem key={index} todoItem={todo} />
          })
        }
      <form onSubmit={this.handleSubmit}>
        <label>
          Todo:
          <input type="text" name="todo" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <InputMoment
          moment={this.state.startDate}
          onChange={this.handleDateChange}
          onSave={this.handleSave}
          minStep={1} // default
          hourStep={1} // default
          prevMonthIcon="ion-ios-arrow-left" // default
          nextMonthIcon="ion-ios-arrow-right" // default
        />
        <button type="submit" value="Submit">enviar</button>
      </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  todos:state.todos
})

export default connect(mapStateToProps, null)(Todos);

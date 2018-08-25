import React from 'react';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { addTodoBefore } from '../actions/todos';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Todos extends React.Component {
  constructor(props){
    super(props)
    moment.locale('pt-br',null)
    moment.updateLocale('pt-br', {
        months : [
            "Janeiro", "Fevereiro", "Marco", "April", "Maio", "Junho", "Julho",
            "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]
    });
    this.state = {
      value: '',
      startDate: moment(),
      error: ''
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleError = this.handleError.bind(this)

  }
  
  handleChange(event){
    this.setState({
      value: event.target.value
    })
  }

  handleDateChange(date) {
     this.setState({
      startDate: date
    });
   
  }
  
  handleSubmit(event){
    event.preventDefault();
    const dateDispatch = moment(this.state.startDate._d).valueOf();
    if(!this.state.value){
      this.setState({
        error: 'Digite um todo...'
      })
    }else{
      this.props.dispatch(addTodoBefore({todo: this.state.value, startDate: dateDispatch}))
      this.state = {
        value: '',
        startDate: this.state.startDate
      }
    }
   }
   
   handleError(){
     this.setState({
       error: ''
     })
   }

  render(){
    return(
      <div>
          <div className="container">
            <h1>Tarefas</h1>
            <ul className="list-group">
            { 
              this.props.todos.map((todo, index)=>{
                return <TodoItem key={index} todoItem={todo} />
              })
            }
          </ul>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <span className="input-group-addon">Tarefa</span>
              <input
                type="text" 
                className="form-control" 
                name="todo" 
                onFocus={this.handleError} 
                value={this.state.error ? this.state.error : this.state.value} 
                onChange={this.handleChange}/>
            </div>
            <div className="input-group">
              <span className="input-group-addon">Data</span>
              <DatePicker
                  className="form-control"
                  selected={this.state.startDate}
                  onChange={this.handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={10}
                  dateFormat="LLL"
                  timeCaption="time"
              />
            </div>
            <button type="submit" className="btn btn-danger" value="Submit">enviar</button>
          </form>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  todos:state.todos
})

export default connect(mapStateToProps, null)(Todos);

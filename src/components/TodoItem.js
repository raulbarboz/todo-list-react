import React from 'react';

class TodoItem extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        <p>{this.props.todoItem.todo}</p>
        <p>{this.props.todoItem.startDate}</p>
      </div>
    )
  }
}


export default TodoItem;
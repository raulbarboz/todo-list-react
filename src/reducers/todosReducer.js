// Expenses Reducers

const todosReducerDefaultState = [];

export default(state = todosReducerDefaultState, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [...state, action.todo]
    default:
      return state;
  }
};

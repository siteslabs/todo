import { RootState } from 'store';

const todosSelector = (state: RootState) => state.todoReducer.todos;

export { todosSelector };

import React from 'react';

import TodoList from 'components/TodoList';
import PrivateRoute from 'containers/PrivateRoute';

const Todo = () => {
  return (
    <PrivateRoute>
      <TodoList />
    </PrivateRoute>
  );
};

export default Todo;

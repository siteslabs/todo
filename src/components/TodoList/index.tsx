import React, { useState } from 'react';
import { Checkbox, Input, Button, Typography } from 'antd';

import { useAppDispatch, useAppSelector } from 'store';

import {
  addTodo,
  editTodo,
  removeTodo,
  toggleTodoStatus,
} from 'store/todo/slice';
import { todosSelector } from 'store/todo/selectors';

import './TodoList.scss';

const TodoList = () => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');
  const [newTask, setNewTask] = useState('');

  const tasks = useAppSelector(todosSelector);
  const dispatch = useAppDispatch();

  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask) {
      dispatch(
        addTodo({ id: Date.now(), title: newTask.trim(), isCompleted: false })
      );
      setNewTask('');
    }
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch(removeTodo(taskId));
  };

  const handleToggleTaskDone = (taskId: number) => {
    dispatch(toggleTodoStatus(taskId));
  };

  const handleEditTask = (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditingTaskId(taskId);
      setEditingTaskTitle(taskToEdit.title);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskTitle('');
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask = tasks.find((task) => task.id === editingTaskId);

    if (updatedTask) {
      dispatch(editTodo({ ...updatedTask, title: editingTaskTitle }));
    }

    setEditingTaskId(null);
    setEditingTaskTitle('');
  };

  return (
    <div className="todo-list">
      <Typography.Title level={1}>Todo List</Typography.Title>
      <form onSubmit={handleAddTask} className="todo-list__add-task">
        <Input
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
          placeholder="Add a new task"
        />
        <Button
          htmlType="submit"
          disabled={!newTask}
          type="primary"
          onClick={handleAddTask}
        >
          Add
        </Button>
      </form>
      <ul className="todo-list__task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <form className="todo-list__task-list_item">
                <Input
                  type="text"
                  value={editingTaskTitle}
                  onChange={(e) => setEditingTaskTitle(e.target.value)}
                />
                <Button htmlType="submit" onClick={handleUpdateTask}>
                  Update
                </Button>
                <Button onClick={handleCancelEdit}>Cancel</Button>
              </form>
            ) : (
              <div className="todo-list__task-list_item">
                <Checkbox
                  checked={task.isCompleted}
                  onChange={() => handleToggleTaskDone(task.id)}
                >
                  {task.title}
                </Checkbox>
                <Button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </Button>
                <Button onClick={() => handleEditTask(task.id)}>Edit</Button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

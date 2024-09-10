import { addTask, deleteTask, loadTasks, loadTasksFailure, loadTasksSuccess, toggleTaskCompletion, updateTask, updateTaskFilter } from '../actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from '../state';

export const taskReducer = createReducer(
  initialState,
  on(loadTasks, (state) => ({
    ...state,
    tasks: [...state.tasks]
  })),
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    error: null
  })),
  on(loadTasksFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),

  on(updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t)),
  })),

  on(deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== taskId),
  })),

  on(toggleTaskCompletion, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task
    ),
  })),

  on(updateTaskFilter, (state, { filters }) => ({
    ...state,
    filters: { ...filters },
  }))
);

import { addTask, deleteTask, loadTasks, loadTasksFailure, loadTasksSuccess, toggleTaskCompletion, updateTask, updateTaskFilter } from '../actions';
import { initialState } from '../state';
import { Task } from '../../../shared/models/Task.model';
import { TASK_TTL_DURATION } from '../../../utils/local-storage.utils';
import { taskReducer } from './index';

describe('Task Reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'UNKNOWN' };
    const state = taskReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should handle loadTasks action', () => {
    const action = loadTasks();
    const state = taskReducer(initialState, action);

    expect(state.tasks).toEqual(initialState.tasks);
  });

  it('should handle loadTasksSuccess action', () => {
    const tasks: Task[] = [{
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      dueDate: new Date('2024-12-31'),
      completed: false,
      expiresAt: Date.now() + TASK_TTL_DURATION,
      position:-1
    }];
    const action = loadTasksSuccess({ tasks });
    const state = taskReducer(initialState, action);

    expect(state.tasks).toEqual(tasks);
    expect(state.error).toBeNull();
  });

  it('should handle loadTasksFailure action', () => {
    const error = 'Failed to load tasks';
    const action = loadTasksFailure({ error });
    const state = taskReducer(initialState, action);

    expect(state.error).toBe(error);
  });

  it('should handle addTask action', () => {
    const newTask: Task = {
      id: '1',
      title: 'New Task',
      description: 'New Task Description',
      dueDate: new Date('2024-12-31'),
      completed: false,
      expiresAt: Date.now() + TASK_TTL_DURATION,
      position:-1
    };
    const action = addTask({ task: newTask });
    const state = taskReducer({ ...initialState, tasks: [] }, action);

    expect(state.tasks.length).toBe(1);
    expect(state.tasks[0]).toEqual(newTask);
  });

  it('should handle updateTask action', () => {
    const existingTask: Task = {
      id: '1',
      title: 'Existing Task',
      description: 'Existing Task Description',
      dueDate: new Date('2024-12-31'),
      completed: false,
      expiresAt: Date.now() + TASK_TTL_DURATION,
      position:-1
    };
    const updatedTask: Task = {
      ...existingTask,
      title: 'Updated Task'
    };
    const action = updateTask({ task: updatedTask });
    const state = taskReducer({ ...initialState, tasks: [existingTask] }, action);

    expect(state.tasks.length).toBe(1);
    expect(state.tasks[0].title).toBe('Updated Task');
  });

  it('should handle deleteTask action', () => {
    const taskToDelete: Task = {
      id: '1',
      title: 'Task to Delete',
      description: 'Description',
      dueDate: new Date('2024-12-31'),
      completed: false,
      expiresAt: Date.now() + TASK_TTL_DURATION,
      position:-1
    };
    const action = deleteTask({ taskId: '1' });
    const state = taskReducer({ ...initialState, tasks: [taskToDelete] }, action);

    expect(state.tasks.length).toBe(0);
  });

  it('should handle toggleTaskCompletion action', () => {
    const task: Task = {
      id: '1',
      title: 'Task',
      description: 'Description',
      dueDate: new Date('2024-12-31'),
      completed: false,
      expiresAt: Date.now() + TASK_TTL_DURATION,
      position:-1
    };
    const action = toggleTaskCompletion({ taskId: '1' });
    const state = taskReducer({ ...initialState, tasks: [task] }, action);

    expect(state.tasks.length).toBe(1);
    expect(state.tasks[0].completed).toBe(true);
  });

  it('should handle updateTaskFilter action', () => {
    const filters = { status: 'completed', keyword: 'urgent' };
    const action = updateTaskFilter({ filters });
    const state = taskReducer(initialState, action);

    expect(state.filters).toEqual(filters);
  });
});

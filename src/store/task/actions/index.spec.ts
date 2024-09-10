import { addTask, deleteTask, loadTasks, loadTasksFailure, loadTasksSuccess, manageTaskFailure, manageTaskSuccess, toggleTaskCompletion, updateTask, updateTaskFilter } from '../../../store/task/actions';
import { Task } from '../../../shared/models/Task.model';
import { TASK_TTL_DURATION } from '../../../utils/local-storage.utils';

describe('Task Actions', () => {
  it('should create a loadTasks action', () => {
    const action = loadTasks();

    expect(action.type).toBe('[Task] Load Tasks');
  });

  it('should create a loadTasksSuccess action with payload', () => {
    const tasks: Task[] = [{ id: '1', title: 'Test Task', description: 'Test Description', dueDate: new Date('2024-12-31'), completed: false, expiresAt:Date.now() + TASK_TTL_DURATION, position: -1 }];
    const action = loadTasksSuccess({ tasks });

    expect(action.type).toBe('[Task] Load Tasks Success');
    expect(action.tasks).toEqual(tasks);
  });

  it('should create a loadTasksFailure action with error message', () => {
    const error = 'Error loading tasks';
    const action = loadTasksFailure({ error });

    expect(action.type).toBe('[Task] Load Tasks Failure');
    expect(action.error).toBe(error);
  });

  it('should create an addTask action with task payload', () => {
    const task: Task = { id: '1', title: 'New Task', description: 'New Task Description', dueDate: new Date('2024-12-31'), completed: false,expiresAt:Date.now() + TASK_TTL_DURATION, position: -1 };
    const action = addTask({ task });

    expect(action.type).toBe('[Task] Add Task');
    expect(action.task).toEqual(task);
  });

  it('should create an updateTask action with task payload', () => {
    const task: Task = { id: '1', title: 'Updated Task', description: 'Updated Task Description', dueDate: new Date('2024-12-31'), completed: false ,expiresAt:Date.now() + TASK_TTL_DURATION, position: -1};
    const action = updateTask({ task });

    expect(action.type).toBe('[Task] Update Task');
    expect(action.task).toEqual(task);
  });

  it('should create a deleteTask action with taskId payload', () => {
    const taskId = '1';
    const action = deleteTask({ taskId });

    expect(action.type).toBe('[Task] Delete Task');
    expect(action.taskId).toBe(taskId);
  });

  it('should create a toggleTaskCompletion action with taskId payload', () => {
    const taskId = '1';
    const action = toggleTaskCompletion({ taskId });

    expect(action.type).toBe('[Task] Toggle Task Completion');
    expect(action.taskId).toBe(taskId);
  });

  it('should create an updateTaskFilter action with filters payload', () => {
    const filters = { status: 'completed', keyword: 'urgent' };
    const action = updateTaskFilter({ filters });

    expect(action.type).toBe('[Task Filter] Update Filter');
    expect(action.filters).toEqual(filters);
  });

  it('should create a manageTaskSuccess action with task payload', () => {
    const task: Task = { id: '1', title: 'Managed Task', description: 'Managed Task Description', dueDate: new Date('2024-12-31'), completed: false, expiresAt: Date.now() + TASK_TTL_DURATION, position: -1 };
    const action = manageTaskSuccess({ task });

    expect(action.type).toBe('[Task] Manage Task Success');
    expect(action.task).toEqual(task);
  });

  it('should create a manageTaskFailure action with error message', () => {
    const error = 'Error managing task';
    const action = manageTaskFailure({ error });

    expect(action.type).toBe('[Task] Manage Task Failure');
    expect(action.error).toBe(error);
  });
});

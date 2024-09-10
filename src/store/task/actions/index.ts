import { createAction, props } from '@ngrx/store';
import { Task } from '../../../shared/models/Task.model';

// Define actions for task management
// Action to initiate the loading of tasks
export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction('[Task] Load Tasks Success',props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure',props<{ error: string }>());

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ taskId: string }>());
export const toggleTaskCompletion = createAction('[Task] Toggle Task Completion', props<{ taskId: string }>());
export const updateTaskFilter = createAction('[Task Filter] Update Filter', props<{ filters: { status: string; keyword: string } }>());

export const manageTaskSuccess = createAction('[Task] Manage Task Success', props<{ task: Task }>());
export const manageTaskFailure = createAction('[Task] Manage Task Failure', props<{ error: string }>());

import { createFeatureSelector } from '@ngrx/store';
import { FilterStatus } from '../../../utils/task.utils';
import { Task } from '../../../shared/models/Task.model';

export interface TaskState {
  tasks: Task[];
  filters: {
    status: string;
    keyword: string;
  };
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  filters: {
    status: FilterStatus.IN_PROGRESS,
    keyword: '',
  },
  error: null
};
// Select the feature state
export const selectTasksState = createFeatureSelector<TaskState>('tasks');
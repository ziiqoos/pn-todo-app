import { createSelector } from '@ngrx/store';
import { FilterStatus } from '../../../utils/task.utils';
import { selectTasksState, TaskState } from '../state';

// Tasks selectors
export const selectAllTasks = createSelector(selectTasksState, (state: TaskState) => state.tasks);


export const selectCompletedTasks = createSelector(
  selectTasksState,
  (state: TaskState) => state
    .tasks
    .filter(task => task.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
);

export const selectIncompleteTasks = createSelector(
  selectTasksState,
  (state: TaskState) => state
    .tasks
    .filter(task => !task.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
);

export const selectFilters = createSelector(
  selectTasksState,
  (state: TaskState) => state.filters
);


export const selectFilteredTasks = createSelector(
  selectTasksState,
  (state: TaskState) => {
    const { tasks, filters } = state;

    return tasks
      .filter((task) => {
        // Filter by status
        const matchesStatus = filters.status === FilterStatus.ALL || (filters.status === FilterStatus.COMPLETED ? task.completed : !task.completed);

        // Filter by keyword
        const matchesKeyword = task.title.toLowerCase().includes(filters.keyword.toLowerCase()) || task.description?.toLowerCase().includes(filters.keyword.toLowerCase());

        return matchesStatus && matchesKeyword;
      })
      .sort((a, b) => a.position - b.position)
      .filter(task => task.expiresAt > Date.now()); // Filter out the expired tasks
  }
);



import { FilterStatus } from '../../../utils/task.utils';
import { selectAllTasks, selectCompletedTasks, selectFilteredTasks, selectFilters, selectIncompleteTasks } from '../selectors';
import { Task } from '../../../shared/models/Task.model';
import { TASK_TTL_DURATION } from '../../../utils/local-storage.utils';
import { TaskState } from '../state';

describe('Task Selectors', () => {
  const mockState: TaskState = {
    tasks: [
      { id: '1', title: 'Task 1', description: 'Description 1', dueDate: new Date('2024-12-31'), completed: true, position: 1, expiresAt: Date.now() + TASK_TTL_DURATION },
      { id: '2', title: 'Task 2', description: 'Description 2', dueDate: new Date('2024-11-30'), completed: false, position: 2, expiresAt: Date.now() + TASK_TTL_DURATION },
      { id: '3', title: 'Expired Task', description: 'Expired Description', dueDate: new Date('2024-10-30'), completed: false, position: 3, expiresAt: Date.now() + TASK_TTL_DURATION }
    ],
    filters: {
      status: FilterStatus.ALL,
      keyword: 'task'
    },
    error: null
  };

  it('should select all tasks', () => {
    const result = selectAllTasks.projector(mockState);
    expect(result).toEqual(mockState.tasks);
  });

  it('should select completed tasks', () => {
    const result = selectCompletedTasks.projector(mockState);
    expect(result).toEqual([mockState.tasks[0]]);
  });

  it('should select incomplete tasks', () => {
    const result = selectIncompleteTasks.projector(mockState);
    expect(result).toEqual([mockState.tasks[2], mockState.tasks[1]]);
  });

  it('should select filters', () => {
    const result = selectFilters.projector(mockState);
    expect(result).toEqual(mockState.filters);
  });

  it('should select filtered tasks', () => {
    const result = selectFilteredTasks.projector(mockState);
    expect(result).toEqual([
      mockState.tasks[0],
      mockState.tasks[1],
      mockState.tasks[2],
    ]);
  });
});

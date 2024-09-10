import { loadTasksFromLocalStorage, saveTasksToLocalStorage, TASK_TTL_DURATION } from './local-storage.utils';
import { Task } from '../shared/models/Task.model';

describe('Local Storage Utils', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'A sample task description',
    dueDate: '2024-09-10' as any,
    completed: false,
    expiresAt: Date.now() + TASK_TTL_DURATION,
    created: '2024-09-10' as any,
    position: 1,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  describe('loadTasksFromLocalStorage', () => {
    it('should return an empty array if no tasks are stored in localStorage', () => {
      expect(loadTasksFromLocalStorage()).toEqual([]);
    });

    it('should return an array of tasks if tasks are stored in localStorage', () => {
      const tasks = [mockTask];
      localStorage.setItem('tasks', JSON.stringify(tasks));
      
      const loadedTasks = loadTasksFromLocalStorage();
      expect(loadedTasks).toEqual(tasks);
    });

    it('should handle invalid JSON in localStorage gracefully', () => {
      localStorage.setItem('tasks', '{ invalid JSON }');
      expect(() => loadTasksFromLocalStorage()).toThrowError(SyntaxError);
    });
  });

  describe('saveTasksToLocalStorage', () => {
    it('should save tasks to localStorage', () => {
      const tasks = [mockTask];
      saveTasksToLocalStorage(tasks);
      const storedTasks = localStorage.getItem('tasks');

      expect(storedTasks).toBe(JSON.stringify(tasks));
    });

    it('should update localStorage with an empty array when saving empty tasks', () => {
      saveTasksToLocalStorage([]);
      expect(localStorage.getItem('tasks')).toBe(JSON.stringify([]));
    });
  });
});

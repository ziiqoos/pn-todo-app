import { Task } from '../shared/models/Task.model';

// The local-storage key name
const TASKS_STORAGE_KEY = 'tasks';

// The TTL(Time To Live) constant
export const TASK_TTL_DURATION = 24 * 60 * 60 * 1000; // Setting the TTL to 24 hours (h x min x sec x millisec)

// Get Tasks list from localStorage
export const loadTasksFromLocalStorage = (): Task[] => {
  const storedTasks: string | null = localStorage.getItem(TASKS_STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
}

// Set tasks in localStorage
// since we need to persist the tasks in localStorage,
// we update the whole value of our tasks key in the LocalStorage
export const saveTasksToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}
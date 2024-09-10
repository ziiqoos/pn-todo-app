import { v4 as uuidv4 } from 'uuid';

export const FilterStatus = {
  ALL: 'all',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed'
}

// Function to create a unique ID to out tasks
export const newId = () => uuidv4();



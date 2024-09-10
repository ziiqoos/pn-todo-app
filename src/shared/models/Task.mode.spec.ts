import { TaskModel } from './Task.model';

describe('TaskModel', () => {
  let task: TaskModel;
  const id = '1';
  const title = 'Test Task';
  const description = 'This is a test task';
  const completed = true;
  const dueDate = new Date('2024-09-10');
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // expires in 1 day
  const created = new Date('2024-09-01');
  const position = 1;

  beforeEach(() => {
    task = new TaskModel(id, title, description, completed, dueDate, expiresAt, created, position);
  });

  it('should create an instance of TaskModel', () => {
    expect(task).toBeTruthy();
    expect(task instanceof TaskModel).toBeTrue();
  });

  it('should set the id correctly', () => {
    expect(task.id).toBe(id);
  });

  it('should set the title correctly', () => {
    expect(task.title).toBe(title);
  });

  it('should set the description correctly', () => {
    expect(task.description).toBe(description);
  });

  it('should set the completed status correctly', () => {
    expect(task.completed).toBe(completed);
  });

  it('should set the dueDate correctly', () => {
    expect(task.dueDate).toEqual(dueDate);
  });

  it('should set the expiresAt correctly', () => {
    expect(task.expiresAt).toBe(expiresAt);
  });

  it('should set the position correctly', () => {
    expect(task.position).toBe(position);
  });

  it('should set the created date correctly', () => {
    expect(task.created).toEqual(created);
  });

  it('should set default completed status to false if not provided', () => {
    const newTask = new TaskModel(id, title, description, undefined, dueDate, expiresAt, created, position);
    expect(newTask.completed).toBeFalse();
  });
});

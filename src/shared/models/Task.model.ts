export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate: Date;
  expiresAt: number;
  position: number;
  created?: Date;
}

export class TaskModel implements Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate: Date;
  expiresAt: number;
  position: number;
  created: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    completed: boolean = false,
    dueDate: Date,
    expiresAt: number,
    created: Date,
    position: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.created = created;
    this.dueDate = dueDate;
    this.position = position;
    this.expiresAt = expiresAt;
  }
}
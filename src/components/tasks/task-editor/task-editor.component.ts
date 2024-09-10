import { addTask, updateTask } from '../../../store/task/actions';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { newId } from '../../../utils/task.utils';
import { Store } from '@ngrx/store';
import { Task, TaskModel } from '../../../shared/models/Task.model';
import { TASK_TTL_DURATION } from '../../../utils/local-storage.utils';

@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() task!: Task | null;
  @Input() isEditing: boolean = false;
  @Output() cancelEdit = new EventEmitter<void>();

  expirationTime = Date.now() + TASK_TTL_DURATION;
  taskForm: FormGroup;
  today = new Date().toISOString().split('T')[0];

  constructor(private readonly store: Store, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [this.today],
      completed: [false]
    });
  }

  ngOnInit(): void {
    if (this.isEditing && this.task) {
      this.populateForm(this.task);
    }
  }

  /**
   * Saves the current task. If editing, updates the task; otherwise, adds a new task.
   */
  save(): void {
    if (this.taskForm.invalid) {
      this.taskForm.updateValueAndValidity();
      return;
    }

    const { id, title, description, dueDate, completed, created } = this.taskForm.value;
    const task = new TaskModel(
      this.isEditing ? id : newId(),
      title,
      description,
      this.isEditing ? completed : false,
      dueDate,
      this.expirationTime,
      this.isEditing ? created : new Date(),
      this.isEditing ? this.task?.position! : -1
    );

    this.store.dispatch(this.isEditing ? updateTask({ task }) : addTask({ task }));

    if (!this.isEditing) this.resetForm();
  }

  /**
   * Cancels the editing process and resets the form.
   */
  cancel(): void {
    this.closeEditor();
  }

  /**
   * Closes the task editor without saving changes.
   */
  closeEditor(): void {
    this.isEditing = false;
    this.resetForm();
    this.cancelEdit.emit();
  }

  /**
   * Populates the form with the values of the given task.
   * @param {Task | null} task - The task to populate the form with.
   */
  populateForm(task: Task): void {
    this.taskForm.patchValue({
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      completed: task.completed
    });
  }

  /**
   * Handles changes to input properties and updates the form if a task is provided.
   * @param {SimpleChanges} changes - The changes to input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.populateForm(this.task);
    }
  }

  /**
   * Cleans up by resetting the form and setting editing state to false.
   */
  ngOnDestroy(): void {
    this.resetForm();
  }

  /**
   * Resets the task form to its default values.
   */
  private resetForm(): void {
    this.taskForm.reset({
      id: null,
      title: '',
      description: '',
      dueDate: this.today,
      completed: false
    });
    this.taskForm.updateValueAndValidity();
  }
}

import { addTask, updateTask } from '../../../store/task/actions';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  styleUrl: './task-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditorComponent {
  @Input() task!: Task | null;
  @Input() isEditing: boolean = false;
  @Output() cancelEdit = new EventEmitter<void>();

  expirationTime = Date.now() + TASK_TTL_DURATION;
  taskForm: FormGroup;
  today = new Date().toISOString().split('T')[0];

  constructor(private readonly store: Store, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [this.isEditing ? this.task?.id : null],
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [this.today],
      completed: [this.isEditing ? this.task?.completed : false]
    });

  }

  ngOnInit(): void {
    if (this.isEditing) {
      this.taskForm.get('id')?.patchValue(this.task?.id);
    }

  }
  save() {
    const title = this.taskForm.get('title')?.value;
    const description = this.taskForm.get('description')?.value;
    const dueDate = this.taskForm.get('dueDate')?.value;

    if (this.taskForm.invalid) {
      this.taskForm.updateValueAndValidity();
      return;
    }
    if (this.isEditing) {
      console.log('this.taskForm.value', this.taskForm.value);
      const { id, title, description, dueDate, created } = this.taskForm.value;
      const task: Task = new TaskModel(id, title, description, this.task?.completed, dueDate, this.expirationTime, created, this.task?.position!)
      this.store.dispatch(updateTask({ task }));
    } else {
      const task: Task = new TaskModel(newId(), title, description, false, dueDate, this.expirationTime, new Date(), -1)
      this.store.dispatch(addTask({ task }));
      // Reset task fields
      this.taskForm.get('id')?.reset();
      this.taskForm.get('title')?.reset();
      this.taskForm.get('description')?.reset();
      this.taskForm.get('dueDate')?.patchValue(this.today);
    }

  }

  cancel() {
    this.isEditing = false;
    this.taskForm.reset();
    this.cancelEdit.emit();
  }

  closeEditor() {
    this.isEditing = false;
    this.cancelEdit.emit();
  }

  populateForm(task: Task | null) {
    this.taskForm.patchValue({
      id: task?.id,
      title: task?.title,
      description: task?.description,
      dueDate: task?.dueDate,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.populateForm(this.task);
    }
  }

  ngOnDestroy(): void {
    // Reset task fields
    this.taskForm.get('id')?.reset();
    this.taskForm.get('title')?.reset();
    this.taskForm.get('description')?.reset();
    this.taskForm.get('dueDate')?.patchValue(this.today);
    this.taskForm.updateValueAndValidity();
    this.isEditing = false;
  }

}

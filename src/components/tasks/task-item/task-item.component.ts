import { Actions, ofType } from '@ngrx/effects';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { deleteTask, manageTaskSuccess, toggleTaskCompletion } from '../../../store/task/actions';
import { FilterStatus } from '../../../utils/task.utils';
import { Observable, withLatestFrom } from 'rxjs';
import { selectFilters } from '../../../store/task/selectors';
import { Store } from '@ngrx/store';
import { Task } from '../../../shared/models/Task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() editingTask = new EventEmitter<Task>();

  hideItem = false;
  highlightItem = false;
  filters!: { status: string; keyword: string; };
  filters$!: Observable<{ status: string, keyword: string }>;

  constructor(private readonly store: Store, private readonly actions$: Actions) {
    this.filters$ = this.store.select(selectFilters);
  }

  ngOnInit(): void {
    this.filters$.subscribe(filters => {
      this.filters = filters;
    });

    this.actions$.pipe(
      ofType(manageTaskSuccess)
    ).subscribe({
      next: () => {
        this.highlightTask();
      },
      error: () => { }
    });
  }

  /**
   * Emits an event to notify that the task is being edited.
   * @param {Task} task - The task to be edited.
   */
  editTask(task: Task): void {
    this.editingTask.emit(task);
  }

  /**
   * Hides the task or toggles its completion status based on the current filters.
   * @param {string} taskId - The ID of the task to be hidden or toggled.
   * @param {boolean} [removeTask=false] - Whether to delete the task (true) or toggle its completion (false).
   */
  hideTask(taskId: string, removeTask: boolean = false): void {
    const action = removeTask ? deleteTask({ taskId }) : toggleTaskCompletion({ taskId });

    if (this.filters?.status !== FilterStatus.ALL) {
      this.hideItem = true;
      setTimeout(() => this.store.dispatch(action), 300);
    } else {
      this.store.dispatch(action);
    }
  }

  /**
   * Highlights the task temporarily after the click
   */
  highlightTask(): void {
    this.highlightItem = true;

    setTimeout(() => {
      this.highlightItem = false;
    }, 1500);
  }

  /**
   * Truncates the task title if it exceeds 30 characters.
   * @param {string} title - The title of the task.
   * @returns {string} - The truncated title, appended with ellipsis if truncated.
   */
  truncateTitle(title: string): string {
    return title.length > 30 ? title.substring(0, 30) + '...' : title;
  }
}

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
    // On manageTaskSuccess we need to highlight the task
    this.actions$.pipe(
      ofType(manageTaskSuccess),
      withLatestFrom(this.filters$)
    ).subscribe(
      {
        next: ([action, filters]) => {
          this.filters = filters;
          this.highlightTask();
        },
        error: () => {
        }
      }
    );

  }

  editTask(task: Task) {
    this.editingTask.emit(task);
  }

  hideTask(taskId: string, removeTask: boolean = false) {
    if (this.filters.status !== FilterStatus.ALL) {
      this.hideItem = true;
    }
    setTimeout(() => {
      removeTask ? this.store.dispatch(deleteTask({ taskId })) : this.store.dispatch(toggleTaskCompletion({ taskId }))
    }, 300);
  }

  highlightTask() {
    this.highlightItem = true;

    setTimeout(() => {
      this.highlightItem = false;
    }, 1500);
  }

  truncateTitle(title: string): string {
    return title.length > 30 ? title.substring(0, 30) + '...' : title;
  }
}

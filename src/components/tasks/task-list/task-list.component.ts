import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadTasks, updateTask } from '../../../store/task/actions';
import { Observable } from 'rxjs';
import { selectFilteredTasks } from '../../../store/task/selectors';
import { Store } from '@ngrx/store';
import { Task } from '../../../shared/models/Task.model';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, ScrollingModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

  @Output() editingTask = new EventEmitter<Task>();
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  public tasks$: Observable<Task[]> = new Observable<Task[]>();

  constructor(private readonly store: Store) {
    this.tasks$ = this.store.select(selectFilteredTasks);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }

  /**
   * Emits an event to notify that the task is being edited.
   * @param {Task} task - The task to be edited.
   */
  editTask(task: Task): void {
    this.editingTask.emit(task);
  }

  /**
   * Handles the drop event when a task is dragged and dropped to a new position.
   * Updates the positions of tasks and dispatches the update action.
   * @param {CdkDragDrop<Task[]>} event - The drag and drop event.
   */
  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      event.container.data.forEach((task, index) => {
        if (task.position !== index) {
          const updatedTask = { ...task, position: index };
          this.store.dispatch(updateTask({ task: updatedTask }));
        }
      });
    }
  }

  /**
   * Tracks tasks by their ID to optimize rendering.
   * @param {number} index - The index of the task in the list.
   * @param {Task} task - The task object.
   * @returns {string} - The ID of the task.
   */
  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }

}

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

  editTask(task: Task) {
    this.editingTask.emit(task);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousIndex !== event.currentIndex) {
      // Reorder tasks array
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // Update positions and dispatch updateTask action for each task with a changed position
      event.container.data.forEach((task, index) => {
        if (task.position !== index) {
          const updatedTask = { ...task, position: index };

          // Dispatch action to update the task's position in the state
          this.store.dispatch(updateTask({ task: updatedTask }));
        }
      });
    }
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }

}

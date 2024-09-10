import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Task } from '../../shared/models/Task.model';
import { TaskEditorComponent } from '../tasks/task-editor/task-editor.component';
import { TaskFilterComponent } from '../tasks/task-filter/task-filter.component';
import { TaskListComponent } from '../tasks/task-list/task-list.component';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    TaskListComponent,
    ToolbarComponent,
    TaskEditorComponent,
    TaskFilterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isEditing: boolean = false; // Indicates whether a task is being edited
  title: string = 'Papernest To-Do'; // Application title
  selectedTask: Task | null = null; // Currently selected task for editing
  showTaskEditor: boolean = false; // Controls the visibility of the task editor

  /**
   * Toggles the visibility of the task editor.
   * Resets the `isEditing` flag to false since no task is being edited when simply toggling.
   * 
   * @param showEditor - A boolean value indicating whether to show the task editor.
   */
  toggleTaskEditor(showEditor: boolean) {
    this.isEditing = false;
    this.showTaskEditor = showEditor;
    this.selectedTask = null
  }

  /**
   * Enables task editing mode by setting the task to be edited,
   * updating the `isEditing` flag, and showing the task editor.
   * 
   * @param task - The task to be edited, passed from the task list component.
   */
  editTask(task: Task) {
    this.isEditing = true;
    this.selectedTask = task;
    this.showTaskEditor = true;
  }
}

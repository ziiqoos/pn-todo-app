import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { newId } from '../../utils/task.utils';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { Task } from '../../shared/models/Task.model';
import { TaskEditorComponent } from '../tasks/task-editor/task-editor.component';
import { TaskFilterComponent } from '../tasks/task-filter/task-filter.component';
import { TaskListComponent } from '../tasks/task-list/task-list.component';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // Create a mock Task object to use in tests
  const mockTask: Task = {
    id: newId(),
    title: 'Sample Task',
    description: 'Sample description',
    completed: false,
    dueDate: new Date(),
    expiresAt: Date.now(),
    created: new Date(),
    position: 0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        TaskListComponent,
        ToolbarComponent,
        TaskEditorComponent,
        TaskFilterComponent,
      ],
      providers: [provideRouter([]), provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'Papernest To-Do'`, () => {
    expect(component.title).toEqual('Papernest To-Do');
  });

  it('should toggle task editor when toggleTaskEditor is called', () => {
    component.toggleTaskEditor(true);
    expect(component.showTaskEditor).toBeTrue();
    expect(component.isEditing).toBeFalse();

    component.toggleTaskEditor(false);
    expect(component.showTaskEditor).toBeFalse();
    expect(component.isEditing).toBeFalse();
  });

  it('should set isEditing and showTaskEditor when editTask is called', () => {
    component.editTask(mockTask);
    expect(component.isEditing).toBeTrue();
    expect(component.selectedTask).toEqual(mockTask);
    expect(component.showTaskEditor).toBeTrue();
  });

  it('should not render TaskEditorComponent when showTaskEditor is false', () => {
    component.showTaskEditor = false;
    fixture.detectChanges();
    const taskEditor = fixture.nativeElement.querySelector('app-task-editor');
    expect(taskEditor).toBeFalsy();
  });

  it('should hide task editor when toggleTaskEditor is called with false', () => {
    component.toggleTaskEditor(false);
    expect(component.showTaskEditor).toBeFalse();
  });
});

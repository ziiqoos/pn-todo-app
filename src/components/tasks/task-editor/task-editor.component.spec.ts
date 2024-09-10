import { addTask, updateTask } from '../../../store/task/actions';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task, TaskModel } from '../../../shared/models/Task.model';
import { TASK_TTL_DURATION } from '../../../utils/local-storage.utils';
import { TaskEditorComponent } from './task-editor.component';

describe('TaskEditorComponent', () => {
  let component: TaskEditorComponent;
  let fixture: ComponentFixture<TaskEditorComponent>;
  let store: MockStore;

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    dueDate: new Date('2024-09-10'),
    completed: false,
    expiresAt: Date.now() + TASK_TTL_DURATION,
    created: new Date('2024-09-01'),
    position: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEditorComponent, ReactiveFormsModule], // Importing the standalone component
      providers: [provideMockStore()], // Providing the mock store
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditorComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;

    // Spy on the store's dispatch method to verify action dispatches
    spyOn(store, 'dispatch');

    fixture.detectChanges(); // Trigger initial change detection
  });

  it('should populate form if editing mode is active with a task', () => {
    // Arrange
    component.isEditing = true;
    component.task = mockTask;
    spyOn(component, 'populateForm');

    // Act
    component.ngOnInit();

    // Assert
    expect(component.populateForm).toHaveBeenCalledWith(mockTask);
  });

  it('should not populate form if not editing', () => {
    // Arrange
    component.isEditing = false;
    component.task = mockTask;
    spyOn(component, 'populateForm');

    // Act
    component.ngOnInit();

    // Assert
    expect(component.populateForm).not.toHaveBeenCalled();
  });

  it('should not populate form if editing but task is not provided', () => {
    // Arrange
    component.isEditing = true;
    component.task = null; // No task is provided
    spyOn(component, 'populateForm');

    // Act
    component.ngOnInit();

    // Assert
    expect(component.populateForm).not.toHaveBeenCalled();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values when not editing', () => {
    expect(component.taskForm.value).toEqual({
      id: null,
      title: '',
      description: '',
      dueDate: component.today,
      completed: false
    });
  });

  it('should populate the form when editing a task', () => {
    component.isEditing = true;
    component.task = mockTask;

    // Trigger ngOnChanges to populate form values
    component.ngOnChanges({
      task: {
        currentValue: mockTask,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.taskForm.value).toEqual({
      id: mockTask.id,
      title: mockTask.title,
      description: mockTask.description,
      dueDate: mockTask.dueDate,
      completed: mockTask.completed
    });
  });

  it('should emit cancelEdit event and reset the form when canceling', () => {
    spyOn(component.cancelEdit, 'emit');

    component.cancel();

    expect(component.cancelEdit.emit).toHaveBeenCalled();
    expect(component.taskForm.value).toEqual({
      id: null,
      title: '',
      description: '',
      dueDate: '2024-09-10',
      completed: false
    });
  });

  it('should emit cancelEdit event when closeEditor is called', () => {
    spyOn(component.cancelEdit, 'emit');

    component.closeEditor();

    expect(component.isEditing).toBeFalse();
    expect(component.cancelEdit.emit).toHaveBeenCalled();
  });

});

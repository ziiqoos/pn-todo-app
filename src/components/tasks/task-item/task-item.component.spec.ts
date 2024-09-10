import { Actions } from '@ngrx/effects';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { deleteTask, manageTaskSuccess, toggleTaskCompletion } from '../../../store/task/actions';
import { FilterStatus } from '../../../utils/task.utils';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, Subject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { selectFilters } from '../../../store/task/selectors';
import { Task } from '../../../shared/models/Task.model';
import { TASK_TTL_DURATION } from '../../../utils/local-storage.utils';
import { TaskItemComponent } from './task-item.component';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let store: MockStore;
  let actions$: Observable<any>;
  let actionsSubject: Subject<any>;

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    completed: false,
    dueDate: new Date(),
    description: 'Test description',
    position: 1,
    expiresAt: Date.now() + TASK_TTL_DURATION
  };

  const mockFilters = { status: FilterStatus.TODO, keyword: '' };

  beforeEach(async () => {
    actionsSubject = new Subject();
    actions$ = actionsSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [TaskItemComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectFilters, value: mockFilters }],
        }),
        provideMockActions(() => actions$),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filters$ and subscribe to manageTaskSuccess', () => {
    spyOn(component, 'highlightTask');
    actionsSubject.next(manageTaskSuccess({ task: mockTask }));

    expect(component.filters).toEqual(mockFilters);
    expect(component.highlightTask).toHaveBeenCalled();
  });

  it('should emit editingTask when editTask is called', () => {
    spyOn(component.editingTask, 'emit');
    component.editTask(mockTask);

    expect(component.editingTask.emit).toHaveBeenCalledWith(mockTask);
  });

  it('should hide the task and dispatch deleteTask action when hideTask is called with removeTask true', (done) => {
    spyOn(store, 'dispatch');
    component.filters = { status: FilterStatus.TODO, keyword: '' };

    component.hideTask('1', true);

    expect(component.hideItem).toBeTrue();

    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(deleteTask({ taskId: '1' }));
      done();
    }, 300);
  });

  it('should hide the task and dispatch toggleTaskCompletion action when hideTask is called with removeTask false', (done) => {
    spyOn(store, 'dispatch');
    component.filters = { status: FilterStatus.TODO, keyword: '' };

    component.hideTask('1', false);

    expect(component.hideItem).toBeTrue();

    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(toggleTaskCompletion({ taskId: '1' }));
      done();
    }, 300);
  });

  it('should set highlightItem to true when highlightTask is called', (done) => {
    component.highlightTask();

    expect(component.highlightItem).toBeTrue();

    setTimeout(() => {
      expect(component.highlightItem).toBeFalse();
      done();
    }, 1500);
  });

  it('should truncate title if it is longer than 30 characters', () => {
    const longTitle = 'This is a very long task title that should be truncated';
    const truncatedTitle = component.truncateTitle(longTitle);

    expect(truncatedTitle).toBe('This is a very long task title...');
  });

  it('should not truncate title if it is 30 characters or shorter', () => {
    const shortTitle = 'Short task title';
    const truncatedTitle = component.truncateTitle(shortTitle);

    expect(truncatedTitle).toBe(shortTitle);
  });
});

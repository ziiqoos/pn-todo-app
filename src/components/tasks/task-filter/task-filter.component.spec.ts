import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterStatus } from '../../../utils/task.utils';
import { loadTasks, updateTaskFilter } from '../../../store/task/actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TaskFilterComponent } from './task-filter.component';

describe('TaskFilterComponent', () => {
  let component: TaskFilterComponent;
  let fixture: ComponentFixture<TaskFilterComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFilterComponent, ReactiveFormsModule], // Standalone component
      providers: [provideMockStore()], // Mock Store provider
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFilterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;

    // Spy on the store's dispatch method to track action dispatches
    spyOn(store, 'dispatch');

    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const formValues = component.filterForm.value;
    expect(formValues.status).toBe(FilterStatus.TODO);
    expect(formValues.keyword).toBe('');
  });

  it('should dispatch actions when form values change', () => {
    const statusControl = component.filterForm.get('status');
    const keywordControl = component.filterForm.get('keyword');

    // Change form values to trigger valueChanges subscription
    statusControl?.setValue(FilterStatus.COMPLETED);
    keywordControl?.setValue('test keyword');

    fixture.detectChanges(); // Update the DOM

    // Check if updateTaskFilter action was dispatched with correct payload
    expect(store.dispatch).toHaveBeenCalledWith(
      updateTaskFilter({ filters: { status: FilterStatus.COMPLETED, keyword: 'test keyword' } })
    );

    // Check if loadTasks action was also dispatched
    expect(store.dispatch).toHaveBeenCalledWith(loadTasks());
  });

});

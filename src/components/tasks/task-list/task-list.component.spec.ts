import { By } from '@angular/platform-browser';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { loadTasks, updateTask } from '../../../store/task/actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectFilteredTasks } from '../../../store/task/selectors';
import { Task } from '../../../shared/models/Task.model';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: MockStore;
  let mockTasks: Task[];

  beforeEach(async () => {
    mockTasks = [
      { id: '1', title: 'Task 1', position: 0, completed: false, created: new Date(), dueDate: new Date(), expiresAt: Date.now() },
      { id: '2', title: 'Task 2', position: 1, completed: false, created: new Date(), dueDate: new Date(), expiresAt: Date.now() },
    ];

    await TestBed.configureTestingModule({
      imports: [CommonModule, TaskItemComponent, DragDropModule, ScrollingModule, TaskItemComponent, DragDropModule, CdkVirtualScrollViewport],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectFilteredTasks, value: mockTasks }
          ],
        }),
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTasks on init', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadTasks());
  });


  it('should display no tasks message when there are no tasks', () => {
    store.overrideSelector(selectFilteredTasks, []);
    store.refreshState();
    fixture.detectChanges();

    const noTaskMessage = fixture.debugElement.query(By.css('.text-primary'));
    expect(noTaskMessage).toBeTruthy();
    expect(noTaskMessage.nativeElement.textContent).toContain("You're good for now 😎 Enjoy your day!");
  });

  it('should emit editingTask event when editTask is called', () => {
    spyOn(component.editingTask, 'emit');
    const taskToEdit = mockTasks[0];
    component.editTask(taskToEdit);
    expect(component.editingTask.emit).toHaveBeenCalledWith(taskToEdit);
  });

  it('should call moveItemInArray and dispatch updateTask on drop event with changed positions', () => {
    const moveItemInArraySpy = spyOn(component, 'drop').and.callThrough();
    const dropEvent: CdkDragDrop<Task[]> = {
      previousIndex: 0,
      currentIndex: 1,
      item: {} as any,
      container: {
        data: [...mockTasks],
        id: '',
        element: {} as any,
        enterPredicate: () => true,
        connectedTo: [],
      },
      previousContainer: {} as any,
      isPointerOverContainer: true,
      distance: { x: 0, y: 0 },
    } as any;

    component.drop(dropEvent);
    expect(moveItemInArraySpy).toHaveBeenCalledWith(dropEvent);
    expect(store.dispatch).toHaveBeenCalledWith(updateTask({ task: { ...mockTasks[0], position: 1 } }));
    expect(store.dispatch).toHaveBeenCalledWith(updateTask({ task: { ...mockTasks[1], position: 0 } }));
  });

  it('should use trackByTaskId for tracking task items', () => {
    const index = 1;
    const task = mockTasks[1];
    const trackByResult = component.trackByTaskId(index, task);
    expect(trackByResult).toBe(task.id);
  });

  it('should render the CdkVirtualScrollViewport', () => {
    fixture.detectChanges();
    const viewport = fixture.debugElement.query(By.directive(CdkVirtualScrollViewport));
    expect(viewport).toBeTruthy();
  });
});

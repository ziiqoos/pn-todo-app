import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addTask, deleteTask, loadTasks, loadTasksFailure, loadTasksSuccess, manageTaskFailure, manageTaskSuccess, toggleTaskCompletion, updateTask } from '../actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from '../../../utils/local-storage.utils';
import { of } from 'rxjs';
import { selectAllTasks } from '../selectors';
import { Store } from '@ngrx/store';
import { Task } from '../../../shared/models/Task.model';

@Injectable()
export class TaskEffects {

  // Inject the needed dependencies
  private actions$ = inject(Actions);
  private store = inject(Store);

  // the effect responsible for loading the tasks'list from the localStorage
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      map(() => {
        try {
          const tasks = loadTasksFromLocalStorage();
          return loadTasksSuccess({ tasks });
        } catch (error) {
          // If an error occurs, dispatch the loadTasksFailure action
          return loadTasksFailure({ error: (error as Error).message });
        }
      }),
      catchError((error) =>
        of(loadTasksFailure({ error: (error as Error).message }))
      )
    )
  );

  // the effect responsible for updating the tasks'list in the localStorage
  saveTasksToLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask, updateTask, deleteTask, toggleTaskCompletion),
      switchMap(() =>
        this.store.select(selectAllTasks).pipe(
          tap((tasks: Task[]) => {
            try {
              saveTasksToLocalStorage(tasks);
            } catch (error) {
              console.error('Error saving tasks to localStorage:', error);
              throw new Error('Failed to save tasks to localStorage');
            }
          }),
          map(() => manageTaskSuccess({ task: null as any })),
          catchError((error) =>
            of(manageTaskFailure({ error: error.message || 'Unknown error occurred' }))
          )
        )
      )
    )
  );
}

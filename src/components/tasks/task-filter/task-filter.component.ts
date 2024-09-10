import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterStatus } from '../../../utils/task.utils';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { loadTasks, updateTaskFilter } from '../../../store/task/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFilterComponent {
  filterForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.filterForm = this.fb.group({
      status: [FilterStatus.IN_PROGRESS],
      keyword: ['']
    });

    // Dispatch filter action on form changes
    this.filterForm.valueChanges.subscribe((filters) => {
      this.store.dispatch(updateTaskFilter({ filters }));
      this.store.dispatch(loadTasks());
    });
  }
  
}

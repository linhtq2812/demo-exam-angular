import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

export const routes: Routes = [
  {
    path: 'tasks',
    component: TaskListComponent,
  },
  {
    path: 'tasks/add',
    component: TaskCreateComponent,
  },
  {
    path: 'tasks/:id/edit',
    component: TaskEditComponent,
  },
  {
    path: 'tasks/:id/detail',
    component: TaskDetailComponent,
  },
];

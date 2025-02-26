import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css',
})
export class TaskCreateComponent {
  constructor(private http: HttpClient, private router: Router) {}
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl(''),
    priority: new FormControl('high'),
    status: new FormControl(true),
  });

  get title() {
    return this.taskForm.get('title');
  }

  onSubmit() {
    this.http
      .post('http://localhost:3000/tasks', this.taskForm.value)
      .subscribe(() => {
        this.router.navigate(['tasks']);
      });
  }
}

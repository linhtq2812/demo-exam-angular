import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
})
export class TaskEditComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl(''),
    priority: new FormControl('high'),
    status: new FormControl(true),
  });

  get title() {
    return this.taskForm.get('title');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.http
      .get<Task>(`http://localhost:3000/tasks/${id}`)
      .subscribe((res) => {
        this.taskForm.patchValue({
          title: res.title,
          description: res.description,
          priority: res.priority,
          status: res.status,
        });
      });
  }

  onSubmit() {
    const id = this.route.snapshot.params['id'];
    this.http
      .put(`http://localhost:3000/tasks/${id}`, this.taskForm.value)
      .subscribe(() => {
        this.router.navigate(['tasks']);
      });
  }
}

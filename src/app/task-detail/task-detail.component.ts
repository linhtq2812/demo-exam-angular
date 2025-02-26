import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-detail',
  imports: [],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  public task: Task | undefined;
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.http
      .get<Task | undefined>(`http://localhost:3000/tasks/${id}`)
      .subscribe((res) => {
        this.task = res;
      });
  }
}

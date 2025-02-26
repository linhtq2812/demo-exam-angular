import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  constructor(private http: HttpClient) {}
  tasks: Task[] = [];
  search: string = '';

  onGetList() {
    this.http.get<Task[]>('http://localhost:3000/tasks').subscribe((res) => {
      this.tasks = res;
    });
  }

  ngOnInit(): void {
    this.onGetList();
  }

  onSearch() {
    this.http
      .get<Task[]>(`http://localhost:3000/tasks?title_like=${this.search}`)
      .subscribe((res) => {
        this.tasks = res;
      });
  }

  onDelete(id: string) {
    const isConfirm = confirm('Are you want to delete this task?');
    if (!isConfirm) return;
    this.http.delete(`http://localhost:3000/tasks/${id}`).subscribe(() => {
      this.onGetList();
    });
  }
}

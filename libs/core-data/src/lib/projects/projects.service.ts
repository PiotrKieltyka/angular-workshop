import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { NotificationsService } from './../notifications/notifications.service';
import { Project } from './project.model';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  model = 'projects';

  // private projects: Project[] = [
  //   {
  //     id: '1',
  //     title: 'Project One',
  //     details: 'This is a sample project',
  //     percentComplete: 20,
  //     approved: false,
  //   },
  //   {
  //     id: '2',
  //     title: 'Project Two',
  //     details: 'This is a sample project',
  //     percentComplete: 40,
  //     approved: false,
  //   },
  //   {
  //     id: '3',
  //     title: 'Project Three',
  //     details: 'This is a sample project',
  //     percentComplete: 100,
  //     approved: true,
  //   }
  // ];

  constructor(
    private httpClient: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all() {
    return this.httpClient.get<Project[]>(this.getUrl());
  }

  load(id) {
    return this.httpClient.get<Project>(this.getUrlForId(id));
  }

  loadByCustomer(customerId: string) {
    return this.httpClient.get<Project[]>(this.getUrl(), {params: {customerId}})
      .pipe(
        switchMap(projects => {
          if (projects.length) {
            return of(projects);
          } else {
            return throwError(`No projects exist for customer with ID ${customerId}`);
          }
        }),
        catchError(error => {
          this.notificationsService.emit(error);

          return throwError(error);
        })
      )
  }

  create(project: Project) {
    return this.httpClient.post(this.getUrl(), project);
  }

  update(project: Project) {
    return this.httpClient.patch(this.getUrlForId(project.id), project);
  }

  delete(project: Project) {
    return this.httpClient.delete(this.getUrlForId(project.id));
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    private httpClient: HttpClient
  ) {}

  getUrl () {
    return `${BASE_URL}${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all() {
    return this.httpClient.get(this.getUrl());
  }

  create(project) {
    return this.httpClient.post(this.getUrl(), project);
  }

  update(project) {
    return this.httpClient.patch(this.getUrlForId(project.id), project);
  }

  delete(projectId) {
    return this.httpClient.delete(this.getUrlForId(projectId));
  }

}

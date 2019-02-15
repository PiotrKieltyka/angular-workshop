import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '@workshop/core-data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects$;
  selectedProject;

  constructor(
    private projectsService: ProjectsService
  ) {}

  ngOnInit() {
    this.getProjects();
    this.resetProject();
  }

  selectProject(project) {
    this.selectedProject = project;
  }

  resetProject() {
    const emptyProject: Project = {
      id: null,
      title: '',
      details: '',
      percentComplete: 0,
      approved: false
    }
    this.selectProject(emptyProject);
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
     }
  }

  getProjects() {
    this.projects$ = this.projectsService.all();
  }

  createProject(project) {
    this.projectsService.create(project)
    .subscribe(result => {
      this.getProjects();
      this.resetProject();
    })
  }

  updateProject(project) {
    this.projectsService.update(project)
    .subscribe(result => {
      this.getProjects();
      this.resetProject();
    })
  }

  deleteProject(project) {
    this.projectsService.delete(project.id)
      .subscribe( result => this.getProjects());
  }

  cancel() {
    this.resetProject();
  }

}

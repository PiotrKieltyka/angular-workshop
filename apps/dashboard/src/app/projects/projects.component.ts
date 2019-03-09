import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Project, ProjectsService, Customer, NotificationsService, CustomersService, ProjectsState } from '@workshop/core-data';
import { map } from 'rxjs/operators';

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  primaryColor = 'red';
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject: Project;

  constructor(
    private projectsService: ProjectsService,
    private customerService: CustomersService,
    private store: Store<ProjectsState>,
    private ns: NotificationsService
  ) {
    this.projects$ = store.pipe(
      select('projects'),
      map((projectsState: ProjectsState) => projectsState.projects)
    )
  }

  ngOnInit() {
    this.getProjects();
    this.resetCurrentProject();
  }

  selectProject(project) {
    this.currentProject = project;
  }

  resetCurrentProject() {    
    this.currentProject = emptyProject;
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    // this.projects$ = this.projectsService.all();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.store.dispatch({type: 'create', payload: project});

    // this.projectsService.create(project)
    //   .subscribe(result => {
    //     this.ns.emit('Project created!');
    //     this.getProjects();
    //     this.resetCurrentProject();
    //   })
  }

  updateProject(project) {
    this.store.dispatch({type: 'update', payload: project});

    // this.projectsService.update(project)
    //   .subscribe(result => {
    //     this.ns.emit('Project saved!');
    //     this.getProjects();
    //     this.resetCurrentProject();
    //   })
  }

  deleteProject(project) {
    this.store.dispatch({type: 'delete', payload: project});
    
    // this.projectsService.delete(project)
    //   .subscribe(result => {
    //     this.ns.emit('Project deleted!');
    //     this.getProjects();
    //     this.resetCurrentProject();
    //   })
  }

}

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AddProject, Customer, CustomersService, DeleteProject, LoadProjects, NotificationsService, Project, ProjectsService, ProjectsState, selectAllProjects, UpdateProject } from '@workshop/core-data';
import { Observable } from 'rxjs';

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
    private ns: NotificationsService,
  ) {
    this.projects$ = store.pipe(
      select(
        selectAllProjects
      )
      // select('projects'),
      // map(data => data.entities),
      // map(data => Object.keys(data).map(k => data[k]))
    );
  }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
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
    this.store.dispatch(new LoadProjects());
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.store.dispatch(new AddProject(project));
    this.ns.emit('Project created!');
    this.resetCurrentProject();

    // this.store.dispatch({type: 'create', payload: project});

    // this.projectsService.create(project)
    //   .subscribe(result => {
    //     this.ns.emit('Project created!');
    //     this.getProjects();
    //     this.resetCurrentProject();
    //   })
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));
    this.ns.emit('Project saved!');
    this.resetCurrentProject();

    // this.store.dispatch({type: 'update', payload: project});

    // this.projectsService.update(project)
    //   .subscribe(result => {
    //     this.ns.emit('Project saved!');
    //     this.getProjects();
    //     this.resetCurrentProject();
    //   })
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));
    this.ns.emit('Project deleted!');
    this.resetCurrentProject();
    
    // this.store.dispatch({type: 'delete', payload: project});

    // this.projectsService.delete(project)
    //   .subscribe(result => {
    //     this.ns.emit('Project deleted!');
    //     this.getProjects();
    //     this.resetCurrentProject();
    //   })
  }

}

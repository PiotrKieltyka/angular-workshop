import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Project } from '@workshop/core-data';
import { Observable } from 'rxjs';

import { selectAllProjects, selectCurrentProject } from '..';
import { AddProject, DeleteProject, LoadProjects, SelectProject ,UpdateProject } from './projects.actions';
import { ProjectsState } from './projects.reducer';


@Injectable({
    providedIn: 'root'
})
export class ProjectsFacade {

    projects$: Observable<Project[]>;
    currentProject$: Observable<Project>;

    constructor(
        private store: Store<ProjectsState>
    ) {
        this.projects$ = store.pipe(select(selectAllProjects));
        this.currentProject$ = store.pipe(select(selectCurrentProject));
    }

    getProjects() {
        this.store.dispatch(new LoadProjects());
    }

    selectProject(project) {
        this.store.dispatch(new SelectProject(project.id));
    }

    createProject(project) {
        this.store.dispatch(new AddProject(project));
    }

    updateProject(project) {
        this.store.dispatch(new UpdateProject(project));
    }

    deleteProject(project) {
        this.store.dispatch(new DeleteProject(project));
    }

}

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import { Project } from './../../projects/project.model';
import { ProjectsService } from './../../projects/projects.service';
import { AddProject, LoadProjects, ProjectsActionTypes, ProjectsAdded, ProjectsLoaded } from './projects.actions';
import { ProjectsState } from './projects.reducer';
 
@Injectable({
    providedIn: 'root'
})
export class ProjectsEffects {

    @Effect()
    loadProjects$ = this.dataPersistence.fetch(ProjectsActionTypes.LoadProjects, {
        run: (action: LoadProjects, state: ProjectsState) => {
            return this.projectsService.all().pipe(
                map(
                    (result: Project[]) => new ProjectsLoaded(result)
                ))},
        onError: (action: LoadProjects, error) => {
            console.error('Error', error)
        }
    });

    @Effect()
    addProjects$ = this.dataPersistence.pessimisticUpdate(ProjectsActionTypes.AddProject, {
        run: (action: AddProject, state: ProjectsState) => {
            return this.projectsService.create(action.payload).pipe(
                map(
                    (result: Project) => new ProjectsAdded(result)
                ))},
        onError: (action: AddProject, error) => {
            console.error('Error', error)
        }
    });
    
    constructor(
        private actions$: Actions,
        private dataPersistence: DataPersistence<ProjectsState>,
        private projectsService: ProjectsService
    ) {}
}

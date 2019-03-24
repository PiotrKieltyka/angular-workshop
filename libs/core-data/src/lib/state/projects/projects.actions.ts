import { Action } from '@ngrx/store';
import { Project } from '@workshop/core-data';

export enum ProjectsActionTypes {
  ProjectSelected = '[Projects] Selected',

  AddProject = '[Projects] Add Data',
  ProjectAdded = '[Project] Added Data',

  LoadProjects = '[Projects] Load Data',
  ProjectsLoaded = '[Projects] Data Loaded',

  UpdateProject = '[Projects] Update Data',
  DeleteProject = '[Projects] Delete Data',
}

export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.ProjectSelected;
  constructor(
    public payload: Project
  ) {}
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
}

export class ProjectsLoaded implements Action {
  readonly type = ProjectsActionTypes.ProjectsLoaded;
  constructor(
    public payload: Project[]
  ) {}
}

export class AddProject implements Action {
  readonly type = ProjectsActionTypes.AddProject;
  constructor(
    public payload: Project
  ) {}
}

export class ProjectsAdded implements Action {
  readonly type = ProjectsActionTypes.ProjectAdded;
  constructor(
    public payload: Project
  ) {}
}

export class UpdateProject implements Action {
  readonly type = ProjectsActionTypes.UpdateProject;
  constructor(
    public payload: Project
  ) {}
}

export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;
  constructor(
    public payload: Project
  ) {}
}

export type ProjectActions = SelectProject
  | LoadProjects
  | ProjectsLoaded
  | AddProject
  | ProjectsAdded
  | UpdateProject
  | DeleteProject
  ;

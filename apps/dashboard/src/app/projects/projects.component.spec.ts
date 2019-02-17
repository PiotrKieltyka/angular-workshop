import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Project, ProjectsService } from '@workshop/core-data';
import { MaterialModule } from '@workshop/material';

import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';


describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let de: DebugElement;
  let projectService: ProjectsService;

  const mockProjectService = {};

  const emptyProject: Project = {
    id: null,
    title: '',
    details: '',
    percentComplete: 0,
    approved: false
  };

  beforeEach( () => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        ProjectsComponent,
        ProjectsListComponent,
        ProjectDetailsComponent,
      ],
      providers: [
        { provide: ProjectsService, useValue: mockProjectService }
      ],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ]
    })
    .createComponent(ProjectsComponent);

    component = fixture.componentInstance;
    de = fixture.debugElement;
    projectService = de.injector.get(ProjectsService);

    fixture.detectChanges();
  });

  it('should have a primaryColor of `red`', () => {
    expect(component.primaryColor).toBe('red');
  });

  it('should select a project', () => {
    component.selectProject(emptyProject);
    expect(component.selectedProject).toBe(emptyProject); 
  });

  it('should display primaryColor', () => {
    const h1 = de.query(By.css('h1'));
    component.primaryColor = 'black';
    fixture.detectChanges();
    expect(h1.nativeElement.innerText).toBe('black');
  });

  // let component: ProjectsComponent;
  // let fixture: ComponentFixture<ProjectsComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ ProjectsComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ProjectsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

});

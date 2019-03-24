import { Project, Customer } from '@workshop/core-data';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {
  originalTitle: string;
  selectedProject: Project;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() customers: Customer[];
  @Input() set project(value) {
    if (value) this.originalTitle = value.title;
    this.selectedProject = Object.assign({}, value);
  };
}

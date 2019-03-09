import { RouterModule } from '@angular/router';
import { MaterialModule } from '@workshop/material';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule, RouterModule],
  exports: [LoginComponent],
  declarations: [LoginComponent],
  entryComponents:[LoginComponent]
})
export class UiLoginModule {}

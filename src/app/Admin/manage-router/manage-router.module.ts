import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageRouterPageRoutingModule } from './manage-router-routing.module';

import { ManageRouterPage } from './manage-router.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageRouterPageRoutingModule,
    TranslateModule.forChild()

  ],
  declarations: [ManageRouterPage]
})
export class ManageRouterPageModule {}

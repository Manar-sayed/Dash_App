import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashBoardComponent } from './main-dash-board/main-dash-board.component';

import { ProductListComponent } from './product/product-list/product-list.component';
import { DashHomeComponent } from './dash-home/dash-home.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';
import { CategoryListComponent } from './Category/category-list/category-list.component';
import { CategoryCreateComponent } from './Category/category-create/category-create.component';
import { CategoryUpdateComponent } from './Category/category-update/category-update.component';
import { ServiceUpdateComponent } from '../_sharedService/service-update/service-update.component';
import { ServicegetComponent } from '../_sharedService/serviceget/serviceget.component';
import { MessageAddComponent } from '../_sharedService/contact_message/message-add/message-add.component';
import { RelatedWorkListComponent } from './RelatedWork/related-work-list/related-work-list.component';
import { UpdaterelatedWorkComponent } from './RelatedWork/updaterelated-work/updaterelated-work.component';
import { CreaterelatedWorkComponent } from './RelatedWork/createrelated-work/createrelated-work.component';
import { MessageGetComponent } from '../_sharedService/contact_message/message-get/message-get.component';
import { AuthguardGuard } from '../auth/authguard.guard';
import { LoginComponent } from '../auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainDashBoardComponent,
    canActivate: [AuthguardGuard],
    children: [
      {
        path: 'maincontent',
        component: DashHomeComponent,
        // canActivate: [AuthguardGuard],
      },
      {
        path: 'listproduct',
        component: ProductListComponent,
        // canActivate: [AuthguardGuard],
      },
      {
        path: 'addproduct',
        component: ProductCreateComponent,
        // canActivate: [AuthguardGuard],
      },
      {
        path: 'updateproduct/:id',
        component: ProductUpdateComponent,
        // canActivate: [AuthguardGuard],
      },
      {
        path: 'deleteproduct/:id',
        component: ProductDeleteComponent,
        // canActivate: [AuthguardGuard],
      },

      {
        path: 'listcategory',
        component: CategoryListComponent,
        // canActivate: [AuthguardGuard],
      },
      {
        path: 'addcategory',
        component: CategoryCreateComponent,
        // canActivate: [AuthguardGuard],
      },
      {
        path: 'listsetting',
        component: ServicegetComponent,
        // canActivate: [AuthguardGuard],
      },
      {
        path: 'updatesetting/:id',
        component: ServiceUpdateComponent,
        // canActivate: [AuthguardGuard],
      },
      {
        path: 'updatecategory/:id',
        component: CategoryUpdateComponent,
        // canActivate: [AuthguardGuard],
      },

      {
        path: 'listrelatedwork',
        component: RelatedWorkListComponent,
        // canActivate: [AuthguardGuard],
      },
      {
        path: 'addrelatedwork',
        component: CreaterelatedWorkComponent,
        // canActivate: [AuthguardGuard],
      },
      {
        path: 'updaterelatedwork/:id',
        component: UpdaterelatedWorkComponent,
        // canActivate: [AuthguardGuard],
      },
      {
        path: 'updateservice/:id',
        component: ServiceUpdateComponent,
        // canActivate: [AuthguardGuard],
      },

      {
        path: 'listMessage',
        component: MessageGetComponent,
        // canActivate: [AuthguardGuard],
      },
      {
        path: 'addMessage',
        component: MessageAddComponent,
        // canActivate: [AuthguardGuard],
      },
      // {
      //   path: 'login',
      //   component: LoginComponent,
      //   canActivate: [AuthguardGuard],
      // },
      {
        path: 'auth',
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

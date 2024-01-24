import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainDashBoardComponent } from './main-dash-board/main-dash-board.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './product/product-list/product-list.component';
import { DashHomeComponent } from './dash-home/dash-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { CategoryListComponent } from './Category/category-list/category-list.component';
import { CategoryCreateComponent } from './Category/category-create/category-create.component';
import { CategoryUpdateComponent } from './Category/category-update/category-update.component';
import { DeleteCategoryComponent } from './Category/delete-category/delete-category.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationPipe } from '../translation/translation.pipe';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';
import { RelatedWorkListComponent } from './RelatedWork/related-work-list/related-work-list.component';
import { CreaterelatedWorkComponent } from './RelatedWork/createrelated-work/createrelated-work.component';
import { DeleterelatedWorkComponent } from './RelatedWork/deleterelated-work/deleterelated-work.component';
import { UpdaterelatedWorkComponent } from './RelatedWork/updaterelated-work/updaterelated-work.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MainDashBoardComponent,
    ProductListComponent,
    DashHomeComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ProductDeleteComponent,
    RelatedWorkListComponent,
    CreaterelatedWorkComponent,
    DeleterelatedWorkComponent,
    UpdaterelatedWorkComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryUpdateComponent,
    DeleteCategoryComponent,
    TranslationPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    // TranslateModule.forRoot({
    //   defaultLanguage: 'en',
    //   useDefaultLang: true,
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient],
    //   },
    // }),
  ],
  exports: [MainDashBoardComponent, ProductListComponent],
})
export class DashboardModule {
  // constructor(public translate: TranslateService) {
  //   translate.addLangs(['en', 'ar']);
  //   translate.setDefaultLang('en');
  // }
  // switchLanguage(language: string) {
  //   this.translate.use(language);
  // }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { TranslatedashService } from 'src/app/translation/translatedash.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css'],
})
export class DeleteCategoryComponent implements OnInit {
  categoryId: number = 0;
  language: string = 'ar';

  constructor(
    public categoryService: CategoryService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private translatedashService: TranslatedashService,

    public dialogRef: MatDialogRef<DeleteCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit() {
    this.translatedashService.getLanguage().subscribe((language) => {
      this.language = language;
    });
    this.categoryId = this.data.id;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteProduct() {
    this.activatedRoute.params.subscribe((p) => {
      this.categoryService
        .deleteById(this.categoryId)
        .subscribe((d) =>
          this.router
            .navigateByUrl('/dash/listcategory')
            .then((page) => window.location.reload())
        );
    });

    this.dialogRef.close();
  }
}

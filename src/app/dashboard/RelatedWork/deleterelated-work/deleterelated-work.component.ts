import { Component, Inject, OnInit } from '@angular/core';
import { RelatedWorkService } from '../related-work.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatedashService } from 'src/app/translation/translatedash.service';

@Component({
  selector: 'app-deleterelated-work',
  templateUrl: './deleterelated-work.component.html',
  styleUrls: ['./deleterelated-work.component.css'],
})
export class DeleterelatedWorkComponent implements OnInit {
  relatedWorkId: number = 0;
  language: string = 'ar';

  constructor(
    public relatedWorkService: RelatedWorkService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private translatedashService: TranslatedashService,

    public dialogRef: MatDialogRef<DeleterelatedWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

 


  ngOnInit() {
    this.translatedashService.getLanguage().subscribe((language) => {
      this.language = language;
    });
    this.relatedWorkId = this.data.id;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteRelatedWork() {
    this.activatedRoute.params.subscribe((p) => {
      this.relatedWorkService.deleteById(this.relatedWorkId).subscribe(
        (d) => {
          this.router
            .navigateByUrl('/dash/listrelatedwork')
            .then((page) => window.location.reload());
        },
        (error) => {
          window.location.reload();
        }
      );
    });

    this.dialogRef.close();
  }
}

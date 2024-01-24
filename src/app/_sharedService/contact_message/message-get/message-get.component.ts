import { Component } from '@angular/core';
import { ContactmessageService } from '../contactmessage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contactmessage } from '../contactmessage';
import { TranslatedashService } from 'src/app/translation/translatedash.service';

@Component({
  selector: 'app-message-get',
  templateUrl: './message-get.component.html',
  styleUrls: ['./message-get.component.css'],
})
export class MessageGetComponent {
  isLoading: boolean = false;

  constructor(
    private messageService: ContactmessageService,
    activatedRoute: ActivatedRoute,
    public router: Router,
    private translatedashService: TranslatedashService
  ) {}
  currentLanguage: any = 'en';
  textDir: any;

  messages: Contactmessage[] = [];
  ngOnInit(): void {
    this.isLoading = true;

    this.translatedashService.getLanguage().subscribe((language) => {
      this.currentLanguage = language;

      if (this.currentLanguage === 'en') {
        this.textDir = 'ltr';
        console.log(this.textDir);
      } else {
        this.textDir = 'rtl';
        console.log(this.textDir);
      }
      console.log('lang from services', this.currentLanguage);
    });
    this.loadMessages();
  }

  loadMessages() {
    const index = 0;
    const size = 20;
    // all messages
    this.messageService.getAllMessage(index, size).subscribe(
      (data) => {
        this.messages = data.items;
        console.log(this.messages);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching messages:', error);
        this.isLoading = false;
      }
    );
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from './environments/environment';
import { MailService } from './services/mail.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-vercel-deploy';

  contactFormValues = {
    email: '',
  };

  constructor(
    private mailService: MailService,
  ) {}

  async submitEmail(contactForm: NgForm) {
    let formData: FormData = new FormData();
    formData.append('email', this.contactFormValues.email);
    formData.append('access_key', environment.form_access_key);
    formData.append('subject', 'Email Support From Your Site');
    formData.append('from_name', 'Contact Notification');
  
    try {
      const res = await this.mailService.sendEmail(formData);
      contactForm.reset();
      setTimeout(() => {
        window.location.href = "https://row.representclo.com/"
      }, 2000);
    } catch (err) {
      console.log("Error")
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageFormComponent } from "../message-form/message-form.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MessageFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor() {

  }


}

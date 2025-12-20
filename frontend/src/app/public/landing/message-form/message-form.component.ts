import { Component } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageDto } from '../../../models/message.model';
import { MessageService } from '../../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-message-form',
  imports: [],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.css'
})
export class MessageFormComponent {
messageForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
    private messageService : MessageService,
    private activiteRoute : ActivatedRoute
  ) {
    this.messageForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    const dto: MessageDto = this.messageForm.value;

    // Send MessageDto to backend API
    this.messageService.sendMessage(dto);

    console.log('MessageDto:', dto);

    this.messageForm.reset();
    this.submitted = false;
  }
}



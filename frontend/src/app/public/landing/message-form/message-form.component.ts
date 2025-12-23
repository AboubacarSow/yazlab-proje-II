import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageDto } from '../../../models/message.model';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.css'
})
export class MessageFormComponent {

  messageForm: FormGroup;
  submitted = false;

  constructor(
    private formbuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.messageForm = this.formbuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.messageForm.invalid) return;

    const dto: MessageDto = this.messageForm.value;
    this.messageService.sendMessage(dto);

    this.messageForm.reset();
    this.submitted = false;
  }
}

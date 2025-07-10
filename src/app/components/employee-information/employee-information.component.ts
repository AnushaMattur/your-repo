import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common'
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

export interface Person {
  id: number;
  name: string;
}

@Component({
  selector: 'app-employee-information',
  standalone: true,
  providers: [MessageService],
  imports: [ReactiveFormsModule, ToastModule, FormsModule, NgIf, ButtonModule, InputTextModule,
    TableModule, ButtonModule, MessageModule],
  templateUrl: './employee-information.component.html',
  styleUrl: './employee-information.component.css'
})
export class EmployeeInformationComponent {
  delimiter = '';
  employeeData: Person[] = [];
  errorMessage = '';

  constructor(private dataService: DataService, private messageService: MessageService) { }

  loadData() {
    let request = {
      delimiter: this.delimiter.toString()
    }
    this.dataService.post<Person[]>('GetCsvData', request)
      .subscribe({
        next: (data) => {
          this.employeeData = data;
        },
        error: (err) => {
          // Try to extract a user-friendly message
          let msg = 'An unexpected error occurred.';
          if (err.error && err.error.errors && err.error.errors.delimiter) {
            msg = err.error.errors.delimiter[0];
          } else if (err.error && typeof err.error === 'string') {
            msg = err.error;
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: msg,
            life: 5000 // popup will disappear after 5 seconds
          });
        }
      });
  }
}

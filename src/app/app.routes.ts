import { Routes } from '@angular/router';
import { EmployeeInformationComponent } from './components/employee-information/employee-information.component';

export const routes: Routes = [
    { path: 'employeeInformation', component: EmployeeInformationComponent },
    { path: '**', component: EmployeeInformationComponent }
];

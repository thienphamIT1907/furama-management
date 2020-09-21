import { Subscription } from 'rxjs';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from './../../../models/employee/Employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  employees: Employee[];
  subscription: Subscription;

  term: string;
  p = 1;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployeerList();
  }

  getEmployeerList(): void {
    this.subscription = this.employeeService.getAllEmployee().subscribe({
      next: data => this.employees = data,
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  confirmDelete(id: number): void {
    if (confirm('Xoá thông tin ?')) {
      this.subscription = this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.getEmployeerList(),
        error: err => console.log(err),
        complete: () => this.router.navigateByUrl('/employee-list')
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

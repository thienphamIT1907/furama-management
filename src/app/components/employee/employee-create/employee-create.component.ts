import { Subscription } from 'rxjs';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validationPhoneNumber } from '../../../validation/validation-phone-number';
import { validationIdCard } from '../../../validation/validation-id-card';
import { validationEmail } from '../../../validation/validation-email';
import { validationPositiveNumber } from 'src/app/validation/validation-positive-number';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee/Employee.model';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  subscription: Subscription;
  employeeCreateForm: FormGroup;
  employeeNew: Employee;

  maxDate = new Date();
  minDate = new Date(1900, 0, 1);

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employeeCreateForm = this.fb.group({
      employeeId: '',
      employeeCode: ['', [Validators.pattern('^NV-[0-9]{4}$')]],
      employeeName: ['', [Validators.required]],
      employeeRole: '',
      employeeLevel: '',
      employeeDepartment: '',
      birthday: '',
      idCard: ['', [validationIdCard]],
      salary: ['', [validationPositiveNumber]],
      phoneNumber: ['', [validationPhoneNumber]],
      email: ['', [validationEmail]],
      address: '',
      gender: ''
    });
  }

  onSubmit(): void {
    this.employeeNew = Object.assign({}, this.employeeCreateForm.value);
    this.subscription = this.employeeService.postEmployee(this.employeeNew).subscribe({
      next: () => this.employeeService.getAllEmployee().subscribe(),
      error: err => console.log(err),
      complete: () => this.router.navigateByUrl('employee-list')
    });
  }

  validationNameAndCheckTouched(): boolean {
    return this.employeeCreateForm.get('employeeName').hasError('required') && this.employeeCreateForm.get('employeeName').touched;
  }

  validationCodeAndCheckTouched(): boolean {
    return this.employeeCreateForm.get('employeeCode').hasError('pattern') && this.employeeCreateForm.get('employeeCode').touched;
  }

  validationPhoneNumber(): boolean {
    return this.employeeCreateForm.get('phoneNumber').hasError('wrongPhoneNumberPattern') &&
      this.employeeCreateForm.get('phoneNumber').touched;
  }

  validationIdCard(): boolean {
    return this.employeeCreateForm.get('idCard').hasError('wrongIdCardPattern') &&
      this.employeeCreateForm.get('idCard').touched;
  }

  validationEmail(): boolean {
    return this.employeeCreateForm.get('email').hasError('wrongEmailPattern') &&
      this.employeeCreateForm.get('email').touched;
  }

  validationPostitiveNumber(): boolean {
    return this.employeeCreateForm.get('salary').hasError('forbiddenNumber') && this.employeeCreateForm.get('salary').touched;
  }
}

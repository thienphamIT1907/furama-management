import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './../../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from 'src/app/models/employee/Employee.model';
import { validationIdCard } from 'src/app/validation/validation-id-card';
import { validationPositiveNumber } from 'src/app/validation/validation-positive-number';
import { validationPhoneNumber } from 'src/app/validation/validation-phone-number';
import { validationEmail } from 'src/app/validation/validation-email';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit, OnDestroy {

  employeeEditForm: FormGroup;

  private subscription: Subscription;
  private employeeToEdit: Employee;
  private idHook: number;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscription = this.actRoute.params.subscribe(param => {
      const id = (+param.id);
      this.subscription = this.employeeService.getEmployeeById(id).subscribe({
        next: data => {
          this.employeeToEdit = data;
          this.idHook = this.employeeToEdit.id;
          this.employeeEditForm.patchValue({
            employeeCode: this.employeeToEdit.employeeCode,
            employeeName: this.employeeToEdit.employeeName,
            employeeRole: this.employeeToEdit.employeeRole,
            employeeLevel: this.employeeToEdit.employeeLevel,
            employeeDepartment: this.employeeToEdit.employeeDepartment,
            birthday: this.employeeToEdit.birthday,
            idCard: this.employeeToEdit.idCard,
            salary: this.employeeToEdit.salary,
            phoneNumber: this.employeeToEdit.phoneNumber,
            email: this.employeeToEdit.email,
            address: this.employeeToEdit.address,
            gender: this.employeeToEdit.gender
          });
        },
        error: err => console.log(err),
      });
    });

    this.employeeEditForm = this.fb.group({
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

  saveEdit(): void {
    this.employeeToEdit = Object.assign({}, this.employeeEditForm.value);
    this.employeeToEdit.id = this.idHook;

    this.subscription = this.employeeService.patchEmployee(this.employeeToEdit).subscribe({
      next: () => this.router.navigateByUrl('/employee-list'),
      error: err => console.log(err),
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  validationNameAndCheckTouched(): boolean {
    return this.employeeEditForm.get('employeeName').hasError('required') && this.employeeEditForm.get('employeeName').touched;
  }

  validationCodeAndCheckTouched(): boolean {
    return this.employeeEditForm.get('employeeCode').hasError('pattern') && this.employeeEditForm.get('employeeCode').touched;
  }

  validationPhoneNumber(): boolean {
    return this.employeeEditForm.get('phoneNumber').hasError('wrongPhoneNumberPattern') &&
      this.employeeEditForm.get('phoneNumber').touched;
  }

  validationIdCard(): boolean {
    return this.employeeEditForm.get('idCard').hasError('wrongIdCardPattern') &&
      this.employeeEditForm.get('idCard').touched;
  }

  validationEmail(): boolean {
    return this.employeeEditForm.get('email').hasError('wrongEmailPattern') &&
      this.employeeEditForm.get('email').touched;
  }

  validationPostitiveNumber(): boolean {
    return this.employeeEditForm.get('salary').hasError('forbiddenNumber') && this.employeeEditForm.get('salary').touched;
  }

}

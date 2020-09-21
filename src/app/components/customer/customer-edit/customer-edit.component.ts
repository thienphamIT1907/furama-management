import { Subscription } from 'rxjs';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { validationPhoneNumber } from '../../../validation/validation-phone-number';
import { validationIdCard } from '../../../validation/validation-id-card';
import { validationEmail } from '../../../validation/validation-email';
import { Customer } from './../../../models/customer/Customer.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  customerEditForm: FormGroup;
  customerToEdit: Customer;
  idHook: number;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(customer => {
      const id = (+customer.id);
      this.subscription = this.customerService.getCustomerById(id).subscribe({
        next: data => {
          this.customerToEdit = data;
          this.idHook = this.customerToEdit.id;
          this.customerEditForm.patchValue({
            customerCode: this.customerToEdit.customerCode,
            customerType: this.customerToEdit.customerType,
            customerName: this.customerToEdit.customerName,
            birthday: this.customerToEdit.birthday,
            idCard: this.customerToEdit.idCard,
            phoneNumber: this.customerToEdit.phoneNumber,
            email: this.customerToEdit.email,
            address: this.customerToEdit.address,
            gender: this.customerToEdit.gender
          });
        },
        error: err => console.log(err)
      });
    });

    this.customerEditForm = this.fb.group({
      customerCode: ['', [Validators.pattern('^KH-[0-9]{4}$')]],
      customerType: '',
      customerName: '',
      birthday: '',
      idCard: ['', [validationIdCard]],
      phoneNumber: ['', [validationPhoneNumber]],
      email: ['', [validationEmail]],
      address: '',
      gender: ''
    });
  }

  onSubmit(): void {
    this.customerToEdit = Object.assign({}, this.customerEditForm.value);
    this.customerToEdit.id = this.idHook;

    this.subscription = this.customerService.patchCustomer(this.customerToEdit).subscribe({
      next: () => {
        this.router.navigateByUrl('/customer-list');
      },
      error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get getCustomerCode(): AbstractControl {
    return this.customerEditForm.get('customerCode');
  }

  get getPhoneNumber(): AbstractControl {
    return this.customerEditForm.get('phoneNumber');
  }

  get getEmail(): AbstractControl {
    return this.customerEditForm.get('email');
  }

  get getIdCard(): AbstractControl {
    return this.customerEditForm.get('idCard');
  }

  validationCustomerCode(): boolean {
    return this.getCustomerCode.hasError('pattern') && this.getCustomerCode.touched;
  }

  validationPhoneNumber(): boolean {
    return this.getPhoneNumber.hasError('wrongPhoneNumberPattern') && this.getPhoneNumber.touched;
  }

  validationIdCard(): boolean {
    return this.getIdCard.hasError('wrongIdCardPattern') && this.getIdCard.touched;
  }

  validationEmail(): boolean {
    return this.getEmail.hasError('wrongEmailPattern') && this.getEmail.touched;
  }
}

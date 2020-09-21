import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { validationPhoneNumber } from '../../../validation/validation-phone-number';
import { validationIdCard } from '../../../validation/validation-id-card';
import { validationEmail } from '../../../validation/validation-email';
import { Customer } from './../../../models/customer/Customer.model';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit, OnDestroy {

  customerRegisterForm: FormGroup;
  customerNew: Customer;
  subscription: Subscription;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.customerRegisterForm = this.fb.group({
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

  addNewCustomer(): void {
    this.customerNew = Object.assign({}, this.customerRegisterForm.value);
    this.subscription = this.customerService.postCustomer(this.customerNew).subscribe({
      next: () => this.customerService.getAllCustomer().subscribe(),
      error: err => console.log(err),
      complete: () => this.router.navigateByUrl('customer-list')
    });
  }


  get getCustomerCode(): AbstractControl {
    return this.customerRegisterForm.get('customerCode');
  }

  get getPhoneNumber(): AbstractControl {
    return this.customerRegisterForm.get('phoneNumber');
  }

  get getEmail(): AbstractControl {
    return this.customerRegisterForm.get('email');
  }

  get getIdCard(): AbstractControl {
    return this.customerRegisterForm.get('idCard');
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

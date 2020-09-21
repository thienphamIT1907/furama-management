import { Router } from '@angular/router';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from './../../../models/customer/Customer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  customers: Customer[];

  subscription: Subscription;

  constructor(private customerSerivce: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList(): void {
    this.subscription = this.customerSerivce.getAllCustomer().subscribe({
      next: data => this.customers = data,
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  confirmDelete(id: number): void {
    if (confirm('Xoá thông tin ?')) {
      this.subscription = this.customerSerivce.deleteCustomer(id).subscribe({
        next: () => this.getCustomerList(),
        error: err => console.log(err),
        complete: () => this.router.navigateByUrl('/customer-list')
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

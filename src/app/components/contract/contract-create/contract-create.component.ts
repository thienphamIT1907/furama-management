import { FService } from './../../../models/f-service/FService.model';
import { FServiceService } from 'src/app/services/fservice.service';
import { EmployeeService } from './../../../services/employee.service';
import { CustomerService } from './../../../services/customer.service';
import { Contract } from './../../../models/contract/Contract.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import { Customer } from 'src/app/models/customer/Customer.model';
import { Employee } from 'src/app/models/employee/Employee.model';

@Component({
  selector: 'app-contract-create',
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.css']
})
export class ContractCreateComponent implements OnInit, OnDestroy {

  contractRegisterForm: FormGroup;
  contractNew: Contract;
  subscription: Subscription;

  customerList: Customer[];
  employeeList: Employee[];
  fServicelist: FService[];

  constructor(
    private fb: FormBuilder,
    private contractService: ContractService,
    private router: Router,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private fServiceService: FServiceService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.contractRegisterForm = this.fb.group({
      contract: '',
      employee: '',
      customer: '',
      fService: '',
      startDate: '',
      endDate: '',
      preCost: ''
    });
  }

  getList(): void {
    this.subscription = this.customerService.getAllCustomer().subscribe({
      next: data => this.customerList = data,
      error: err => console.log(err)
    });

    this.subscription = this.employeeService.getAllEmployee().subscribe({
      next: data => this.employeeList = data,
      error: err => console.log(err)
    });

    this.subscription = this.fServiceService.getAllFService().subscribe({
      next: data => this.fServicelist = data,
      error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addNewContract(): void {
    this.contractNew = Object.assign({}, this.contractRegisterForm.value);
    this.subscription = this.contractService.postContract(this.contractNew).subscribe({
      next: () => this.contractService.getAllContract().subscribe(),
      error: err => console.log(err),
      complete: () => this.router.navigateByUrl('customer-list')
    });
  }

  onSubmit(): void {
    console.log(this.contractRegisterForm);
  }
}

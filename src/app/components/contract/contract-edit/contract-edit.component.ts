import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contract } from 'src/app/models/contract/Contract.model';
import { ContractService } from 'src/app/services/contract.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer/Customer.model';
import { Employee } from 'src/app/models/employee/Employee.model';
import { FService } from 'src/app/models/f-service/FService.model';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { FServiceService } from 'src/app/services/fservice.service';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.css']
})
export class ContractEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  contractEditForm: FormGroup;
  contractToEdit: Contract;
  idHook: number;

  customerList: Customer[];
  employeeList: Employee[];
  fServicelist: FService[];

  constructor(
    private fb: FormBuilder,
    private contractService: ContractService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private fServiceService: FServiceService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.activatedRoute.params.subscribe(contract => {
      const id = (+contract.id);
      this.subscription = this.contractService.getContractById(id).subscribe({
        next: data => {
          this.contractToEdit = data;
          this.idHook = this.contractToEdit.id;
          this.contractEditForm.patchValue({
            employee: this.contractToEdit.employee,
            customer: this.contractToEdit.customer,
            fService: this.contractToEdit.fService,
            startDate: this.contractToEdit.startDate,
            endDate: this.contractToEdit.endDate,
            preCost: this.contractToEdit.preCost,
          });
        },
        error: err => console.log(err)
      });
    });

    this.contractEditForm = this.fb.group({
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

  saveEdit(): void {
    this.contractToEdit = Object.assign({}, this.contractEditForm.value);
    this.contractToEdit.id = this.idHook;

    this.subscription = this.contractService.patchContract(this.contractToEdit).subscribe({
      next: () => {
        this.router.navigateByUrl('/contract-list');
      },
      error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

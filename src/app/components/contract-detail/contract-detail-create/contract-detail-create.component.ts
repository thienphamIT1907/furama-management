import { ContractDetailService } from './../../../services/contract-detail.service';
import { ContractService } from './../../../services/contract.service';
import { Contract } from './../../../models/contract/Contract.model';
import { ContractDetail } from './../../../models/contract/ContractDetail.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { validationPositiveNumber } from 'src/app/validation/validation-positive-number';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-detail-create',
  templateUrl: './contract-detail-create.component.html',
  styleUrls: ['./contract-detail-create.component.css']
})
export class ContractDetailCreateComponent implements OnInit, OnDestroy {

  contractDetailRegisterForm: FormGroup;
  contractDetailNew: ContractDetail;
  subscription: Subscription;
  contracts: Contract[];

  constructor(
    private fb: FormBuilder,
    private contractDetailService: ContractDetailService,
    private router: Router,
    private contractService: ContractService
  ) { }

  ngOnInit(): void {
    this.subscription = this.contractService.getAllContract().subscribe({
      next: data => this.contracts = data,
      error: err => console.log(err)
    });

    this.contractDetailRegisterForm = this.fb.group({
      contractDetail: '',
      contractName: '',
      fServiceBonusName: '',
      amount: ['', [validationPositiveNumber]]
    });
  }

  addNewContractDetail(): void {
    this.contractDetailNew = Object.assign({}, this.contractDetailRegisterForm.value);
    this.subscription = this.contractDetailService.postContractDetail(this.contractDetailNew).subscribe({
      next: () => this.contractDetailService.getAllContractDetail().subscribe(),
      error: err => console.log(err),
      complete: () => this.router.navigateByUrl('contract-detail-list')
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  validationPostitiveNumber(field: string): boolean {
    return this.contractDetailRegisterForm.get(field).hasError('forbiddenNumber')
          && this.contractDetailRegisterForm.get(field).touched;
  }
}

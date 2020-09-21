import { ContractDetailService } from './../../../services/contract-detail.service';
import { ContractDetail } from './../../../models/contract/ContractDetail.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { validationPositiveNumber } from 'src/app/validation/validation-positive-number';
import { Contract } from 'src/app/models/contract/Contract.model';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-contract-detail-edit',
  templateUrl: './contract-detail-edit.component.html',
  styleUrls: ['./contract-detail-edit.component.css']
})
export class ContractDetailEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  contractDetailEditForm: FormGroup;
  contractDetailToEdit: ContractDetail;
  idHook: number;
  constracts: Contract[];

  constructor(
    private fb: FormBuilder,
    private contractDetailService: ContractDetailService,
    private contractService: ContractService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.contractService.getAllContract().subscribe({
      next: data => this.constracts = data,
      error: err => console.log(err)
    });

    this.activatedRoute.params.subscribe(param => {
      const id = (+param.id);
      this.subscription = this.contractDetailService.getContractDetailById(id).subscribe({
        next: data => {
          this.contractDetailToEdit = data;
          this.idHook = this.contractDetailToEdit.id;
          this.contractDetailEditForm.patchValue({
            contractName: this.contractDetailToEdit.contractName,
            fServiceBonusName: this.contractDetailToEdit.fServiceBonusName,
            amount: this.contractDetailToEdit.amount
          });
        },
        error: err => console.log(err)
      });
    });

    this.contractDetailEditForm = this.fb.group({
      contractName: '',
      fServiceBonusName: '',
      amount: ['', [validationPositiveNumber]]
    });
  }

  saveEdit(): void {
    this.contractDetailToEdit = Object.assign({}, this.contractDetailEditForm.value);
    this.contractDetailToEdit.id = this.idHook;

    this.subscription = this.contractDetailService.patchContractDetail(this.contractDetailToEdit).subscribe({
      next: () => {
        this.router.navigateByUrl('/contract-detail-list');
      },
      error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  validationPostitiveNumber(field: string): boolean {
    return this.contractDetailEditForm.get(field).hasError('forbiddenNumber')
      && this.contractDetailEditForm.get(field).touched;
  }
}

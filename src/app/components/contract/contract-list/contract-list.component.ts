import { ContractService } from './../../../services/contract.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contract } from '../../../models/contract/Contract.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit, OnDestroy {

  contracts: Contract[];

  subscription: Subscription;

  constructor(private contractService: ContractService, private router: Router) { }

  ngOnInit(): void {
    this.getContractList();
  }

  getContractList(): void {
    this.subscription = this.contractService.getAllContract().subscribe({
      next: data => this.contracts = data,
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  confirmDelete(id: number): void {
    if (confirm('Xoá thông tin ?')) {
      this.subscription = this.contractService.deleteContract(id).subscribe({
        next: () => this.getContractList(),
        error: err => console.log(err),
        complete: () => this.router.navigateByUrl('/contract-list')
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

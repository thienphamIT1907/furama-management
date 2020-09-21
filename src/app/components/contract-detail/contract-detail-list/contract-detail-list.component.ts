import { ContractDetailService } from './../../../services/contract-detail.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContractDetail } from './../../../models/contract/ContractDetail.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-detail-list',
  templateUrl: './contract-detail-list.component.html',
  styleUrls: ['./contract-detail-list.component.css']
})
export class ContractDetailListComponent implements OnInit, OnDestroy {

  contractDetails: ContractDetail[];
  subscription: Subscription;

  constructor(private contractDetailService: ContractDetailService, private router: Router) { }

  ngOnInit(): void {
    this.getContractDetailList();
  }

  getContractDetailList(): void {
    this.subscription = this.contractDetailService.getAllContractDetail().subscribe({
      next: data => this.contractDetails = data,
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  confirmDelete(id: number): void {
    if (confirm('Xoá thông tin ?')) {
      this.subscription = this.contractDetailService.deleteContractDetail(id).subscribe({
        next: () => this.getContractDetailList(),
        error: err => console.log(err),
        complete: () => this.router.navigateByUrl('/contract-detail-list')
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

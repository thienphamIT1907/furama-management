import { Subscription } from 'rxjs';
import { FServiceService } from './../../../services/fservice.service';
import { FService } from './../../../models/f-service/FService.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-f-service-list',
  templateUrl: './f-service-list.component.html',
  styleUrls: ['./f-service-list.component.css']
})
export class FServiceListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  fServices: FService[];

  constructor(private fs: FServiceService, private router: Router) { }

  ngOnInit(): void {
   this.getFServiceList();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getFServiceList(): void {
    this.subscription = this.fs.getAllFService().subscribe({
      next: data => this.fServices = data,
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  confirmDelete(id: number): void {
    if (confirm('Xoá thông tin ?')) {
      this.subscription = this.fs.deleteFService(id).subscribe({
        next: () => this.getFServiceList(),
        error: err => console.log(err),
        complete: () => this.router.navigateByUrl('/fservice-list')
      });
    }
  }
}

import { Subscription } from 'rxjs';
import { FServiceService } from './../../../services/fservice.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { validationPositiveNumber } from '../../../validation/validation-positive-number';
import { Router } from '@angular/router';
import { FService } from 'src/app/models/f-service/FService.model';

@Component({
  selector: 'app-f-service-create',
  templateUrl: './f-service-create.component.html',
  styleUrls: ['./f-service-create.component.css']
})
export class FServiceCreateComponent implements OnInit, OnDestroy {

  fServiceRegisterForm: FormGroup;
  subscription: Subscription;
  fServiceNew: FService;

  constructor(
    private fb: FormBuilder,
    private fs: FServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fServiceRegisterForm = this.fb.group({
      fServiceId: '',
      fServiceCode: ['', [Validators.pattern('^DV-[0-9]{4}$')]],
      fServiceName: '',
      area: '',
      poolArea: '',
      floors: ['', [validationPositiveNumber]],
      maxPeople: '',
      cost: ['', [validationPositiveNumber]],
      rentTypeId: '',
      fServiceTypeId: '',
      status: '',
      description: ''
    });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addNewFService(): void {
    this.fServiceNew = Object.assign({}, this.fServiceRegisterForm.value);
    this.subscription = this.fs.postFService(this.fServiceNew).subscribe({
      next: () => this.fs.getAllFService().subscribe(),
      error: err => console.log(err),
      complete: () => this.router.navigateByUrl('fservice-list')
    });
  }

  validationCode(): boolean {
    return this.fServiceRegisterForm.get('fServiceCode').hasError('pattern') && this.fServiceRegisterForm.get('fServiceCode').touched;
  }

  validationPostitiveNumber(field: string): boolean {
    return this.fServiceRegisterForm.get(field).hasError('forbiddenNumber') && this.fServiceRegisterForm.get(field).touched;
  }
}

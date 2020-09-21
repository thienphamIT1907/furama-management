import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FServiceService } from 'src/app/services/fservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FService } from 'src/app/models/f-service/FService.model';
import { validationPositiveNumber } from 'src/app/validation/validation-positive-number';

@Component({
  selector: 'app-f-service-edit',
  templateUrl: './f-service-edit.component.html',
  styleUrls: ['./f-service-edit.component.css']
})
export class FServiceEditComponent implements OnInit, OnDestroy {

  fServiceEditForm: FormGroup;

  private subscription: Subscription;
  private idHook: number;
  private fServiceToEdit: FService;

  constructor(
    private fb: FormBuilder,
    private fs: FServiceService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.actRoute.params.subscribe(param => {
      const id = (+param.id);
      this.subscription = this.fs.getFServiceById(id).subscribe({
        next: data => {
          this.fServiceToEdit = data;
          this.idHook = this.fServiceToEdit.id;
          this.fServiceEditForm.patchValue({
            fServiceCode: this.fServiceToEdit.fServiceCode,
            fServiceName: this.fServiceToEdit.fServiceName,
            area: this.fServiceToEdit.area,
            poolArea: this.fServiceToEdit.poolArea,
            floors: this.fServiceToEdit.floors,
            maxPeople: this.fServiceToEdit.maxPeople,
            cost: this.fServiceToEdit.cost,
            rentType: this.fServiceToEdit.rentType,
            fServiceType: this.fServiceToEdit.fServiceType,
            status: this.fServiceToEdit.status,
            description: this.fServiceToEdit.description
          });
        },
        error: err => console.log(err)
      });
    });

    this.fServiceEditForm = this.fb.group({
      fServiceCode: ['', [Validators.pattern('^DV-[0-9]{4}$')]],
      fServiceName: '',
      area: '',
      poolArea: '',
      floors: ['', [validationPositiveNumber]],
      maxPeople: '',
      cost: ['', [validationPositiveNumber]],
      rentType: '',
      fServiceType: '',
      status: '',
      description: ''
    });
  }

  saveEdit(): void {
    this.fServiceToEdit = Object.assign({}, this.fServiceEditForm.value);
    this.fServiceToEdit.id = this.idHook;

    this.subscription = this.fs.patchFService(this.fServiceToEdit).subscribe({
      next: (data) => this.router.navigateByUrl('/fservice-list'),
      error: err => console.log(err),
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  validationCode(): boolean {
    return this.fServiceEditForm.get('fServiceCode').hasError('pattern') && this.fServiceEditForm.get('fServiceCode').touched;
  }

  validationPostitiveNumber(field: string): boolean {
    return this.fServiceEditForm.get(field).hasError('forbiddenNumber') && this.fServiceEditForm.get(field).touched;
  }
}

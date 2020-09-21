import { ContractDetailEditComponent } from './components/contract-detail/contract-detail-edit/contract-detail-edit.component';
import { ContractDetailListComponent } from './components/contract-detail/contract-detail-list/contract-detail-list.component';
import { ContractDetailCreateComponent } from './components/contract-detail/contract-detail-create/contract-detail-create.component';
import { ContractEditComponent } from './components/contract/contract-edit/contract-edit.component';
import { ContractListComponent } from './components/contract/contract-list/contract-list.component';
import { ContractCreateComponent } from './components/contract/contract-create/contract-create.component';
import { FServiceEditComponent } from './components/f-service/f-service-edit/f-service-edit.component';
import { FServiceListComponent } from './components/f-service/f-service-list/f-service-list.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { FServiceCreateComponent } from './components/f-service/f-service-create/f-service-create.component';

const configRouter: Routes = [

  // CUSTOMER ROUTING
  {
    path: 'customer-list',
    component: CustomerListComponent
  },
  {
    path: 'customer-create',
    component: CustomerCreateComponent
  },
  {
    path: 'customer-edit/:id',
    component: CustomerEditComponent
  },

  // EMPLOYEE ROUTING
  {
    path: 'employee-create',
    component: EmployeeCreateComponent
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent
  },
  {
    path: 'employee-edit/:id',
    component: EmployeeEditComponent
  },

  // FSERVICE ROUTING
  {
    path: 'fservice-create',
    component: FServiceCreateComponent
  },
  {
    path: 'fservice-list',
    component: FServiceListComponent
  },
  {
    path: 'fservice-edit/:id',
    component: FServiceEditComponent
  },

  // CONTRACT ROUTING
  {
    path: 'contract-create',
    component: ContractCreateComponent
  },
  {
    path: 'contract-list',
    component: ContractListComponent
  },
  {
    path: 'contract-edit/:id',
    component: ContractEditComponent
  },

  // CONTRACT DETAIL ROUTING
  {
    path: 'contract-detail-create',
    component: ContractDetailCreateComponent
  },
  {
    path: 'contract-detail-list',
    component: ContractDetailListComponent
  },
  {
    path: 'contract-detail-edit/:id',
    component: ContractDetailEditComponent
  },

  // OUT ROUTING
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(configRouter)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

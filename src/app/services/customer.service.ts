import { Injectable } from '@angular/core';
import { Customer } from './../models/customer/Customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private API_URL = 'http://localhost:3000/customerList';

  constructor(private http: HttpClient) { }

  getAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API_URL);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.API_URL}/${id}`);
  }

  postCustomer(customer: Customer): Observable<void> {
    return this.http.post<void>(this.API_URL, customer);
  }

  patchCustomer(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(`${this.API_URL}/${customer.id}`, customer);
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.API_URL}/${id}`);
  }

}

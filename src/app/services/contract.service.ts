import { Contract } from './../models/contract/Contract.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private API_URL = 'http://localhost:3000/contractList';

  constructor(private http: HttpClient) { }

  getAllContract(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.API_URL);
  }

  getContractById(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${this.API_URL}/${id}`);
  }

  postContract(contract: Contract): Observable<void> {
    return this.http.post<void>(this.API_URL, contract);
  }

  patchContract(contract: Contract): Observable<Contract> {
    return this.http.patch<Contract>(`${this.API_URL}/${contract.id}`, contract);
  }

  deleteContract(id: number): Observable<Contract> {
    return this.http.delete<Contract>(`${this.API_URL}/${id}`);
  }
}

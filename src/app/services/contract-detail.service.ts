import { ContractDetail } from './../models/contract/ContractDetail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractDetailService {

  private API_URL = 'http://localhost:3000/contractDetailList';

  constructor(private http: HttpClient) { }

  getAllContractDetail(): Observable<ContractDetail[]> {
    return this.http.get<ContractDetail[]>(this.API_URL);
  }

  getContractDetailById(id: number): Observable<ContractDetail> {
    return this.http.get<ContractDetail>(`${this.API_URL}/${id}`);
  }

  postContractDetail(contractDetail: ContractDetail): Observable<void> {
    return this.http.post<void>(this.API_URL, contractDetail);
  }

  patchContractDetail(contractDetail: ContractDetail): Observable<ContractDetail> {
    return this.http.patch<ContractDetail>(`${this.API_URL}/${contractDetail.id}`, contractDetail);
  }

  deleteContractDetail(id: number): Observable<ContractDetail> {
    return this.http.delete<ContractDetail>(`${this.API_URL}/${id}`);
  }

}

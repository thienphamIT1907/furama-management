import { Injectable } from '@angular/core';
import { FService } from './../models/f-service/FService.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FServiceService {

  private API_URL = 'http://localhost:3000/fServiceList';

  constructor(private http: HttpClient) { }

  getAllFService(): Observable<FService[]> {
    return this.http.get<FService[]>(this.API_URL);
  }

  getFServiceById(id: number): Observable<FService> {
    return this.http.get<FService>(`${this.API_URL}/${id}`);
  }

  postFService(fService: FService): Observable<void> {
    return this.http.post<void>(this.API_URL, fService);
  }

  patchFService(fService: FService): Observable<FService> {
    return this.http.patch<FService>(`${this.API_URL}/${fService.id}`, fService);
  }

  deleteFService(id: number): Observable<FService> {
    return this.http.delete<FService>(`${this.API_URL}/${id}`);
  }

}

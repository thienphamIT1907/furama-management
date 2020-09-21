import { Injectable } from '@angular/core';
import { Employee } from './../models/employee/Employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private API_URL = 'http://localhost:3000/employeeList';

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API_URL);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.API_URL}/${id}`);
  }

  postEmployee(employee: Employee): Observable<void> {
    return this.http.post<void>(this.API_URL, employee);
  }

  patchEmployee(employee: Employee): Observable<Employee> {
    return this.http.patch<Employee>(`${this.API_URL}/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.API_URL}/${id}`);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageDatabase } from './storage.database';

@Injectable({
  providedIn: 'root'
})
export class APIserviceService {

  constructor(private http:HttpClient, private db:StorageDatabase) { }

  // Methods
}

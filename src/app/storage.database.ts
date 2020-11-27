import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class StorageDatabase extends Dexie {
  
  // Tables
  private db: Dexie.Table<string, string>

  constructor() { 
    // Database name
    super('table');
    // Setup schema for v1
    this.version(1).stores({
      db: 'id' // ++id for autoincrement
    })
    // Get a reference to the db collection
    this.db = this.table('db');
  }

  // METHODS // 
  
}

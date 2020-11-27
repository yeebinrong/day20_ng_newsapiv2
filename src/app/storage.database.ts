import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { ApiKey, Articles, countryList, countryListwithKey } from './models';

@Injectable({
  providedIn: 'root'
})
export class StorageDatabase extends Dexie {
  
  // Tables
  private api: Dexie.Table<ApiKey, string>
  private list: Dexie.Table<countryListwithKey, string>
  private article: Dexie.Table<Articles, string>
  constructor() { 
    // Database name
    super('table');
    // Setup schema for v1
    this.version(1).stores({
      api: 'id', // ++id for autoincrement
      list: 'id',
      article: 'id++'
    })
    // Get a reference to the db collection
    this.api = this.table('api');
    this.list = this.table('list');
    this.article = this.table('article');
  }

  // METHODS // 

  // api key methods
  async saveKey(key: ApiKey):Promise<any> {
    await this.api.put(key);
  }
  async getKey():Promise<ApiKey> {
    return await this.api.get('key');
  }
  async hasKey():Promise<boolean> {
    return (await this.api.get('key')) != null;
  }
  async deleteKey():Promise<any> {
    return await this.api.delete('key');
  }

  // list methods
  async saveList(data: countryList[]):Promise<any> {
    const listwithkey:countryListwithKey = {
      id: 'list',
      array: data
    }
    await this.list.put(listwithkey);
  }
  async getList():Promise<countryList[]> {
    return (await this.list.get('list')).array;
  }
  async hasList():Promise<boolean> {
    return (await this.list.get('list')) != null;
  }

  // get articles
  async addArticles(a:Articles[]):Promise<any> {
    console.info(a)
    return await this.article.bulkAdd(a);
  }
}

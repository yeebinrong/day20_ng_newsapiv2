import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articles, countryList, Results } from './models';
import { StorageDatabase } from './storage.database';

@Injectable({
  providedIn: 'root'
})
export class APIservice {
  codes:string = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za'
  allowedCodes:string = this.codes.split(' ').join(';');
  //https://restcountries.eu/rest/v2/alpha?codes={code};{code};{code}
  listURL:string = 'https://restcountries.eu/rest/v2/alpha'
  newsURL:string = 'https://newsapi.org/v2/top-headlines'
  constructor(private http:HttpClient, private db:StorageDatabase) { }

  // Methods
  getList () {
    const params = new HttpParams().set('codes', this.allowedCodes)
    return this.http.get<countryList[]>(this.listURL, {params: params}).toPromise();
  }

  async getArticles (code: string) {
    const params = new HttpParams().set('category', 'general').set('pageSize', '30').set('country', code);
    const apikey = await this.db.getKey()
    const headers = new HttpHeaders().set('X-Api-Key', apikey.key);
    return await this.http.get<Results>(this.newsURL, {headers: headers, params: params}).toPromise()
  }
}

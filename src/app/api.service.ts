import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { countryList, Results } from './models';
import { StorageDatabase } from './storage.database';

const ARTICLE_EXPIRY_DURATION = 1000 * 60 * 5
const listURL:string = 'https://restcountries.eu/rest/v2/alpha'
const newsURL:string = 'https://newsapi.org/v2/top-headlines'
const codes:string = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za'
const allowedCodes:string = codes.split(' ').join(';');

@Injectable({
  providedIn: 'root'
})
export class APIservice {
  //https://restcountries.eu/rest/v2/alpha?codes={code};{code};{code}
  constructor(private http:HttpClient, private db:StorageDatabase) { }

  // Methods
  getList ():Promise<countryList[]> {
    const params = new HttpParams().set('codes', allowedCodes)
    return this.http.get<countryList[]>(listURL, {params: params}).toPromise();
  }

  async getArticles (code: string):Promise<Results> {
    const params = new HttpParams().set('category', 'general').set('pageSize', '30').set('country', code);
    const apikey = await this.db.getKey()
    const headers = new HttpHeaders().set('X-Api-Key', apikey.key);

    let articles = await this.db.getArticles(code);
    // should refresh if no articles
    let shouldRefresh = articles.length < 0;

    if (articles.length > 0) {
      // find the first not saved article
      const a = articles.find(a => !a.saved)
      // check if it has exceed expiry duration
      if ((Date.now() - a.timestamp) >= ARTICLE_EXPIRY_DURATION) {
        
      }
    }

    return await this.http.get<Results>(newsURL, {headers: headers, params: params}).toPromise()
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIservice } from '../api.service';
import { Articles } from '../models';
import { StorageDatabase } from '../storage.database';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  code:string;
  articlesArray:Articles[] = [];
  constructor(private activatedRoute: ActivatedRoute, private db: StorageDatabase, private apiSvc:APIservice) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params['code'];
    this.apiSvc.getArticles(this.code)
    // this.list = data.map(d => {
    //   return <countryList> {
    //     name: d.name,
    //     flag: d.flag,
    //     alpha2Code: d.alpha2Code
    //   }
    .then (results => {
      console.info(results)
      this.articlesArray = results['articles'].map(d => {
        return<Articles> {
          alpha2Code: this.code,
          timestamp: new Date(),
          source: d.source,
          author: d.author,
          title: d.title,
          description: d.description,
          url: d.url,
          urlToImage: d.urlToImage,
          publishedAt: d.publishedAt,
          content: d.content
        }
      })
      this.db.addArticles(this.articlesArray);
    })

  }

}

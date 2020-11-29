import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
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
    this.db.hasArticles(this.code)
    .then (bool => {
      if (bool) {
        // get from db
        console.info("articles from db");
        this.db.getArticles(this.code)
        .then (results => {
          // check if caching has passed 5 minutes
          for (let i of results) {
            if (moment(i.timestamp).add(5, 'minutes').toDate() >= new Date()) {
              // have not passed 5 minutes
              console.info("have not passed 5minutes")
              this.articlesArray.push(i);
            } else {
              console.info("have passed 5minutes")
              if (i.saved) {
                // if article is saved
                console.info("an article was saved")
                this.articlesArray.push(i)
              } else {
                // delete article
                console.info("an article is deleted")
                this.db.deleteArticle(i);
                // get new article from newsapi
                // check if got duplicate articles with saved
              }
            }
          }
        })
      } else {
        // get from api
        this.getArticles();
      }
    })
  }

  getArticles() {
    console.info("articles from api");
    this.apiSvc.getArticles(this.code)
    .then (results => {
      console.info(results)
      this.articlesArray = results['articles'].map(d => {
        return<Articles> {
          alpha2Code: this.code,
          timestamp: Date.now(),
          saved: false,
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

  async checkToggle(i:Articles) {
    i.saved = !i.saved;
    // update db on saved article
    await this.db.updateArticle(i);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIservice } from '../api.service';
import { countryList } from '../models';
import { StorageDatabase } from '../storage.database';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  list:countryList[];

  constructor(private apiSvc:APIservice, private db:StorageDatabase, private router:Router) { }

  ngOnInit(): void {
    // check if api key exists
    this.db.hasKey()
    .then (bool => {
      if (!bool) {
        // redirect user to set their api key if it is not set
        alert('Please set your API key');
        this.router.navigate(['/form']);
      }
    })

    // check if list exists
    this.db.hasList()
    .then (bool => {
      if (!bool) {
        // list not stored, get data from api
        this.apiSvc.getList()
        .then (data => {
          console.info("list from api");
          this.list = data.map(d => {
             return <countryList> {
               name: d.name,
               flag: d.flag,
               alpha2Code: d.alpha2Code
             }
          })
          this.db.saveList(this.list);
          }
        )
      } else {
        // list stored, get from db
        this.db.getList()
        .then (data => {
          console.info("list from db");
          this.list = data as countryList[];
        })
      }
    })
  }

  gotoDetail(code: string) {
    this.router.navigate(['/detail', code])
  }

}

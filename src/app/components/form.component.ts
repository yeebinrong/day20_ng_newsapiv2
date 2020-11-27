import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiKey } from '../models';
import { StorageDatabase } from '../storage.database';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  hide:boolean = true; // hide password
  form:FormGroup;
  _key:string = '';
  constructor(private fb:FormBuilder, private db:StorageDatabase, private router:Router) { }

  ngOnInit(): void {
    this.createForm();
    this.db.hasKey()
    .then( bool => {
      if (bool) {
        this.getKey();
      }
    })
  }

  // Saves the api key
  saveKey () {
    const key:ApiKey = {
      id: 'key',
      key: this.form.get('api').value
    }
    this.db.saveKey(key);
    this.redirectHome();
  }
  // Gets the api key
  getKey () {
    this.db.getKey()
    .then (data => {
      this.form.patchValue({
        api: data.key
      })
    })
  }
  // Deletes the api key
  deleteKey () {
    this.db.deleteKey();
    this.redirectHome();
  }

  // Redirect to main page
  redirectHome () {
    this.router.navigate(['/'])
  }

  //// PRIVATE METHODS
  // Generates the form
  private createForm () {
    this.form = this.fb.group({
      api: this.fb.control('', [Validators.required]),
    })
  }

}

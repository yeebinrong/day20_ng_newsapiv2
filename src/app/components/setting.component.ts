import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  hide:boolean = true; // hide password
  form:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  // Generates the form
  private createForm () {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      priority: this.fb.control('', [Validators.required]),
      date: this.fb.control('', [Validators.required]),
    })
  }

}

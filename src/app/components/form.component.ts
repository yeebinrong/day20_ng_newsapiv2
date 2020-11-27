import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  code:string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params['code'];
  }

}

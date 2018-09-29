import { Component, OnInit } from '@angular/core';
import { SessionService } from '@shared/auth/session.service'


@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})

export class TitleComponent implements OnInit {

  constructor(private session: SessionService) { }

  isAdmin = false;

  ngOnInit() {
  	this.isAdmin = this.session.user.userName == "admin";
  }

}

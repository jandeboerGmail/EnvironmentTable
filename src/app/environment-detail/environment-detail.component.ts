import { Component, OnInit, Input , Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material';

import { Environment } from '../environment';

@Component({
  selector: 'app-environment-detail',
  templateUrl: './environment-detail.component.html',
  styleUrls: ['./environment-detail.component.css']
})
export class EnvironmentDetailComponent implements OnInit {
  
  env: Environment;

  constructor(public dialogRef: MatDialogRef<EnvironmentDetailComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
    this.env = this.data;
  }

  base64_decode (s: string) {
    console.log(this.env['installed-at']);
    console.log(this.env['stopped-at']);
    try {
      return atob(s);
    } catch (e) {
      return s;
    }
  }

  onOkEnvironment(env : Environment) {
    console.log("onOkEnvironment");
  }
  onCancelEnvironment(env : Environment) {
    console.log("onCancelEnvironment");
  }

  onDatePicker(date : string) {
    console.log("onDatePicker");
  }

  OnEditString(s : string) {
    console.log("OnEditString:" + s);
  }
}

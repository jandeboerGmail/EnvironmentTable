import { Component, OnInit, Input , Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material';

import { Environment } from '../environment';
import { EnvironmentService } from '../environment.service';

@Component({
  selector: 'app-environment-detail',
  templateUrl: './environment-detail.component.html',
  styleUrls: ['./environment-detail.component.css']
})
export class EnvironmentDetailComponent implements OnInit {
  
  env: Environment;

  constructor(private environmentService: EnvironmentService,public dialogRef: MatDialogRef<EnvironmentDetailComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
    this.env = this.data;
    //console.log(this.env);
  }

  base64_decode (s: string) {
    try {
      return atob(s);
    } catch (e) {
      return s;
    }
  }
  
  onApplyEnvironment(env : Environment) {
    console.log("Apply : ");
    console.log(env);
    this.dialogRef.close();
    this.environmentService.updateEnvironment(env).subscribe();
    this.environmentService.getEnvironments().subscribe();
  }

  onCancelEnvironment() {
    this.dialogRef.close();
  }
}

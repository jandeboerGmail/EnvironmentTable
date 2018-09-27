import { Component, OnInit, ViewChild } from '@angular/core';
import { Environment } from '../environment';
import { EnvironmentDetailComponent } from '../environment-detail/environment-detail.component';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { MatDialog } from '@angular/material';

import { EnvironmentService } from '../environment.service';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.css']
})
export class EnvironmentsComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['id', 'version','installed','stopped','status','actions'];
  filter = '';
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  envs: Environment[];
  currentEnv: Environment;

  constructor(private environmentService: EnvironmentService, public dialog: MatDialog) { }

  ngOnInit() {
    //this.displayedColumns = this.columnNames.map(x => x.id);
    //this.getEnvironments();
    //setInterval(() => this.getEnvironments(), 1000); // 1 second
    setInterval(() => this.getEnvironments(), 5000); // 5 seconds
    console.log("ngOnit");
  }
  
  onButtonClick(env: Environment, newStatus: string) { 
    event.stopPropagation();
    env.status = newStatus;
    this.environmentService.updateEnvironment(env).subscribe();
  }
  
  onDeleteEnvironment(env: Environment) {
    event.stopPropagation();
    this.environmentService.deleteEnvironment(env).subscribe();
  }

  onSelect(env: Environment) {
    this.currentEnv = env;
    const dialogRef = this.dialog.open(EnvironmentDetailComponent, {data: this.currentEnv} );
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog was closed');
    });
  }
  
  applyFilter(filterValue: string) {
    this.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEnvironments(): void {
    // console.log("getEnvironments");
    this.environmentService.getEnvironments()
      .subscribe(envs => {
        this.envs = envs;
        this.dataSource = new MatTableDataSource(this.envs);
        this.applyFilter(this.filter);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

}

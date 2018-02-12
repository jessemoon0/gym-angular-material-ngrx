import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-stop-dialog',
  templateUrl: './stop-dialog.component.html',
  styleUrls: ['./stop-dialog.component.scss']
})
export class StopDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit() {
  }

}

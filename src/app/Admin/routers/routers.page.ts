import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { first } from 'rxjs/operators';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import * as $ from 'jquery';
import * as dt from 'node_modules/datatables.net';
import { ChangeDetectorRef } from '@angular/core'
@Component({
  selector: 'app-routers',
  templateUrl: './routers.page.html',
  styleUrls: ['./routers.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoutersPage implements OnInit {

  routersdata: any;
  selectedLanguage: string;
  sub: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private translateConfigService: TranslateConfigService,
    private http: HttpClient, public navCtrl: NavController,
    private changeRef: ChangeDetectorRef
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();

  }
  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  getRouters() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {

      this.adminservices.getRouters().subscribe(res => {
        this.routersdata = res;
      }, err => {
        this.routersdata = err;
      });
    });

  }
  ngOnInit(): void {
    $(document).ready(function () {
      dt.$('#table_id').DataTable();
    });

    this.getRouters();
  }

}

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
import * as dt from 'node_modules/datatables.net-dt';

// declare var $: any;
@Component({
  selector: 'app-courses',
  templateUrl: 'courses.page.html',
  styleUrls: ['courses.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class adminCoursesPage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  coursedata: any[];
  department: any;
  selectedLanguage: string;
  sub: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private translateConfigService: TranslateConfigService,
    private http: HttpClient, public navCtrl: NavController
  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();

  }
  onSelectChange(event: any) {
    //update the ui
    this.department = event.target.value;
    if (this.department == '') {
      this.adminservices.getCourses().subscribe(res => {
        this.coursedata = res;
      }, err => {
        this.coursedata = err;
      });
    }
    else if (this.department == 'active') {
      this.getActiveCourses();
    }
    else {
      this.adminservices.getDepartmentCourses(this.department).subscribe(res => {
        this.coursedata = res;
      }, err => {
        this.coursedata = err;
      });
    }

  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  getActiveCourses() {
    this.adminservices.getActiveCourses().subscribe(res => {
      this.coursedata = res;
    }, err => {
      this.coursedata = err;
    });
  }
  getCourses() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.adminservices.getCourses().subscribe(res => {
        this.coursedata = res;
      }, err => {
        this.coursedata = err;
      });
    });
  }
  ngOnInit(): void {

    this.getCourses();
    $(document).ready(function () {
      dt.$('#table_id').DataTable({
        "scrollX": true
      });
    });
  }



}

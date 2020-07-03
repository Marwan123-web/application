import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-router',
  templateUrl: './add-router.page.html',
  styleUrls: ['./add-router.page.scss'],
})
export class AddRouterPage implements OnInit {
  locationId: string;
  locationName: string;
  routerAddress: string;
  selectedLanguage: string;
  validations_form: FormGroup;
  constructor(private adminservices: AdminservicesService, private alertservice: AlertService, private formBuilder: FormBuilder,
    private translateConfigService: TranslateConfigService, private _router: Router) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  addRouter(locationId: HTMLInputElement, locationName: HTMLInputElement, routerAddress: HTMLInputElement) {
    this.locationId = locationId.value, this.locationName = locationName.value, this.routerAddress = routerAddress.value;
    this.adminservices.addRouter(this.locationId, this.locationName, this.routerAddress).subscribe(res => {
      this.alertservice.showAlert("&#xE876;", "success", res.msg);
      locationId.value = "";
      locationName.value = "";
      routerAddress.value = "";
      this.validations_form.reset();
      this.navigateToRouters();
    }, err => {
      this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
    }
    );
  }
  navigateToRouters() {
    this._router.navigate(['/routers']);
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }


  // static validCourseCode(fc: FormControl) {

  //   if (fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc") {
  //     return {
  //       validCourseCode: true
  //     };
  //   } else {
  //     return null;
  //   }
  // }

  ngOnInit(): void {
    // this.validations_form = this.formBuilder.group({
    //   courseCode: new FormControl('', Validators.compose([
    //     addCoursePage.validCourseCode,
    //     Validators.maxLength(5),
    //     Validators.minLength(5),
    //     Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    //     Validators.required
    //   ])),
    //   name: new FormControl('', Validators.required),
    //   department: new FormControl(this.departments[0], Validators.required),
    //   creditHours: new FormControl('', Validators.compose([
    //     Validators.max(140),
    //     Validators.min(0),
    //     Validators.required
    //   ])),
    //   prerequisite: new FormControl('', Validators.required),
    // });


  }

  // validation_messages = {
  //   'locationId': [
  //     { type: 'required', message: 'Location ID is required.' },
  //     { type: 'minlength', message: 'Location ID must be at least 5 characters long.' },
  //     { type: 'maxlength', message: 'Location ID cannot be more than 5 characters long.' },
  //     { type: 'pattern', message: 'Your Location ID must contain only numbers and letters.' },
  //     { type: 'validCourseCode', message: 'Your Location ID has already been taken.' }
  //   ],
  //   'name': [
  //     { type: 'required', message: 'Location Name is required.' }
  //   ],
  //   'routerAddress': [
  //     { type: 'required', message: 'Router Address is required.' },
  //     { type: 'min', message: 'Router Address must be at least 0 Hours.' },
  //     { type: 'max', message: 'Router Address cannot be more than 140 Hours.' },
  //   ],

  // };


}

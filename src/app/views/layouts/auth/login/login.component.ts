import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { FormValidationError } from "../../../../core/models/form-validator";
import { AuthService } from "../../../../core/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  returnUrl: any;
  modalName: any = "Login";
  loginForm: FormGroup;
  submited = false;
  payloadData: any;
  formValdationError = FormValidationError;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authServise: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authServise.isAuthenticated) {
      this.router.navigateByUrl("/dashbord");
    }

    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onLoggedin() {
    this.submited = true;
    if (this.loginForm.invalid) {
      return;
    }

    // console.log(this.loginForm.value);
    this.payloadData = this.loginForm.value;
    this.authServise.login(this.payloadData).subscribe(
      (data) => {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 11000,
          title: "Successfully loged in",
          icon: "success",
        });
        localStorage.setItem("token", data["data"]["token"]);
        localStorage.setItem(
          "user_info",
          JSON.stringify(data["data"]["user_info"])
        );
        this.router.navigate(["dashbord"]);
      },
      (error) => {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 11000,
          title: "Invalid credential",
          icon: "error",
        });
      }
    );
    // e.preventDefault();
    /*localStorage.setItem("isLoggedin", "true");
    if (localStorage.getItem("isLoggedin")) {
      this.router.navigate([this.returnUrl]);
    }*/
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/Models/api-response';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private service: AuthService, private router: Router) { }

  loginForm!: FormGroup;
  submitted: boolean = false;
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.service.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response) {
            localStorage.setItem("accessToken", response.accessToken);
            this.loginForm.reset();
            this.submitted = false;
            this.service.loggedIn = true;
            this.service.token = response.accessToken;
            this.router.navigate(['']);
          }
          else {
            alert("error")
          }
        },
        error: (err: HttpErrorResponse) => {
          this.submitted = false;
          console.log(err);
          alert(err.error.message)
        },
      });
    } else {
      this.submitted = false;
    }
  }
}

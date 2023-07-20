import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/Service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder,private service: RegisterService, private router: Router) { }

  registerForm!: FormGroup;
  submitted: boolean = false;
  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      contactNumber: ['',[Validators.required, Validators.minLength(10),Validators.maxLength(10)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.service.registerUser(this.registerForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response) {
            localStorage.setItem("accessToken", response.accessToken);
            this.registerForm.reset();
            this.submitted = false;
            this.router.navigate(['/login']);
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
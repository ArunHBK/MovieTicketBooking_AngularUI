import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movie';
import { AuthService } from 'src/app/Service/auth.service';
import { MovieService } from 'src/app/Service/movie.service';
import { ToastService } from 'src/app/Service/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movieList: Movie[] = [];
  loading: boolean = true;

  constructor(private movieService: MovieService, private service: AuthService, private toast: ToastService) { }

  ngOnInit(): void {
    this.loadMovies()
  }

  loadMovies(): void {
    this.movieService.loadMovies().subscribe({
      next: (response: Movie[]) => {
        console.log(response)
        this.movieList = response;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
        this.loading = false;
      }
    })
  }

  deleteMovie(id: string) {
    this.movieService.deleteMovie(id).subscribe({
      next: (res: any) => {
        this.loadMovies()
        this.toast.show(res.message, { classname: 'bg-success text-light', delay: 5000 })
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
        this.toast.show(err.error.message, { classname: 'bg-warning text-light', delay: 5000 })
      }
    })
  }

  isAdmin() {
    return this.service.isAdmin()
  }
}

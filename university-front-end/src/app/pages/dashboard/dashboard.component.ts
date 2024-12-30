import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  courses: any[] = [];
  availableCourses: any[] = [];
  isModalOpen = false;
  selectedCourse: string | null = null;
  username = 'Student';
  router: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('name') || 'Student';
    this.fetchCourses();
    this.loadAvailableCourses();
  }

  // Fetch all courses for displaying in the main dashboard
  fetchCourses(): void {
    const apiUrl = 'http://localhost:8080/api/v1/courses/find-all-courses';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      },
    });
  }

  // Fetch available courses for enrollment
  loadAvailableCourses(): void {
    const apiUrl = 'http://localhost:8080/api/v1/courses';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.availableCourses = data;
      },
      error: (error) => {
        console.error('Error loading available courses:', error);
      },
    });
  }

  // Open the enrollment modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Close the enrollment modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCourse = null;
  }

  // Handle course selection
  selectCourse(course: any): void {
    this.selectedCourse = course.id;
  }

  // Confirm enrollment and persist the data
  confirmEnrollment(): void {
    if (!this.selectedCourse) return;

    const payload = {
      userId: sessionStorage.getItem('userId'), // Replace with actual user ID from session
      courseId: this.selectedCourse,
    };

    this.http.post('/api/v1/enrollments/enroll', payload).subscribe({
      next: () => {
        alert('Enrollment successful!');
        this.closeModal();
        this.fetchCourses(); // Reload dashboard courses
        this.loadAvailableCourses(); // Reload available courses
      },
      error: (err) => {
        console.error('Error enrolling in course:', err);
        alert('Error enrolling in course: ' + err.error);
      },
    });
  }

  // Logout functionality
  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

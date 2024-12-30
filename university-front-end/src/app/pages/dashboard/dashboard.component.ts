import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, SidebarComponent],
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
  currentSlide = 0; // Track the current slide index

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
    const apiUrl = 'http://localhost:8080/api/v1/courses/find-all-courses';
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

  confirmEnrollment(): void {
    if (!this.selectedCourse) return;
  
    const payload = {
      userId: sessionStorage.getItem('userId'), // Certifique-se de que este valor está correto
      courseId: this.selectedCourse,
    };
  
    this.http.post('/api/v1/enrollments/enroll', payload, {
      headers: {
        'Content-Type': 'application/json', // Garante que o payload seja interpretado como JSON
      },
    }).subscribe({
      next: () => {
        alert('Enrollment successful!');
        this.closeModal();
        this.fetchCourses(); // Atualiza os cursos no dashboard
        this.loadAvailableCourses(); // Atualiza os cursos disponíveis
      },
      error: (err) => {
        console.error('Error enrolling in course:', err);
        alert('Error enrolling in course: ' + err.message);
      },
    });
  }   

  // Logout functionality
  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

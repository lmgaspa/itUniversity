import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  courses: any[] = [];
  isFormationModalOpen = false;
  selectedFormationCourse: any | null = null;
  username: string = 'Student';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('name') || 'Student';
    this.fetchCourses();
  }

  // Fetch courses from the backend
  private fetchCourses(): void {
    this.http.get<any[]>('http://localhost:8080/api/v1/courses/find-all-courses').subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      },
    });
  }

  // Open the modal for the selected course
  openFormationModal(course: any): void {
    this.selectedFormationCourse = course;
    this.isFormationModalOpen = true;
  }

  // Close the modal
  closeFormationModal(): void {
    this.isFormationModalOpen = false;
    this.selectedFormationCourse = null;
  }

  // Confirm enrollment for the selected course
  confirmFormationEnrollment(): void {
    if (!this.selectedFormationCourse) return;

    const payload = {
      userId: sessionStorage.getItem('userId'),
      courseId: this.selectedFormationCourse.id,
    };

    this.http.post('/api/v1/enrollments/enroll', payload, {
      headers: { 'Content-Type': 'application/json' },
    }).subscribe({
      next: () => {
        alert(`Successfully enrolled in ${this.selectedFormationCourse.name}!`);
        this.closeFormationModal();
      },
      error: (err) => {
        console.error('Error enrolling in course:', err);
        alert(`Error enrolling in course: ${err.message}`);
      },
    });
  }

  // Logout functionality
  logout(): void {
    sessionStorage.clear();
    window.location.href = '/login'; // Redirect to login page
  }
}

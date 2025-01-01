import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ModalComponent } from '../../modal/modal.component';
import { environment } from '../../../environment/environment.prod';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, SidebarComponent, ModalComponent],
})
export class DashboardComponent implements OnInit {
  courses: any[] = [];
  enrolledCourses: any[] = [];
  isFormationModalOpen = false;
  selectedFormationCourse: any | null = null;
  username: string = 'Student';
  userId: string | null = null;
  isSaving = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('name') || 'Student';
    this.userId = sessionStorage.getItem('userId');

    console.log('Username loaded from sessionStorage:', this.username);
    console.log('User ID loaded from sessionStorage:', this.userId);

    if (!this.userId) {
      alert('User ID is missing. Please log in again.');
      this.logout();
      return;
    }

    this.fetchCourses();
    this.fetchEnrolledCourses();
  }

  private fetchCourses(): void {
    this.http
      .get<any[]>(`${environment.apiBaseUrl}/api/v1/courses/find-all-courses`)
      .subscribe({
        next: (data) => {
          this.courses = data;
          console.log('Courses loaded:', this.courses);
        },
        error: (error: any) => {
          console.error('Error fetching courses:', error);
          alert('Failed to load courses. Please try again later.');
        },
      });
  }

  private fetchEnrolledCourses(): void {
    this.http
      .get<any[]>(`${environment.apiBaseUrl}/api/v1/enrollments/enroll/user/${this.userId}`)
      .subscribe({
        next: (data) => {
          this.enrolledCourses = data;
          console.log('Enrolled courses loaded:', this.enrolledCourses);
        },
        error: (error: any) => {
          console.error('Error fetching enrolled courses:', error);
          alert('Failed to load enrolled courses. Please try again later.');
        },
      });
  }

  openFormationModal(course: any): void {
    this.selectedFormationCourse = course;
    this.isFormationModalOpen = true;
  }

  confirmFormationEnrollment(): void {
    if (!this.userId) {
      alert('User ID is missing. Please log in again.');
      this.logout();
      return;
    }

    if (!this.selectedFormationCourse) {
      alert('No course selected for enrollment.');
      return;
    }

    this.isSaving = true;

    const payload = {
      userId: this.userId,
      courseId: this.selectedFormationCourse.id,
    };

    console.log('Payload enviado:', payload);

    this.http
      .post(`${environment.apiBaseUrl}/api/v1/enrollments/enroll`, payload, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({
        next: () => {
          alert(`Successfully enrolled in ${this.selectedFormationCourse.name}!`);
          this.closeFormationModal();
          this.fetchEnrolledCourses();
        },
        error: (err: any) => {
          console.error('Error enrolling in course:', err);
          alert(`Error enrolling in course: ${err.message}`);
        },
        complete: () => {
          this.isSaving = false;
        },
      });
  }

  closeFormationModal(): void {
    this.isFormationModalOpen = false;
    this.selectedFormationCourse = null;
  }

  logout(): void {
    sessionStorage.clear();
    window.location.href = '/login';
  }
}

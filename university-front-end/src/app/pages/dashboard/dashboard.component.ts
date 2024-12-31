import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, SidebarComponent, ModalComponent],
})
export class DashboardComponent implements OnInit {
  courses: any[] = [];
  enrolledCourses: any[] = []; // Lista de cursos adquiridos
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
    this.fetchEnrolledCourses(); // Buscar os cursos adquiridos
  }

  private fetchCourses(): void {
    this.http
      .get<any[]>('http://localhost:8080/api/v1/courses/find-all-courses')
      .subscribe({
        next: (data) => {
          this.courses = data;
          console.log('Courses loaded:', this.courses); // Log para depuração
        },
        error: (error) => {
          console.error('Error fetching courses:', error);
          alert('Failed to load courses. Please try again later.');
        },
      });
  }

  private fetchEnrolledCourses(): void {
    this.http
      .get<any[]>(`http://localhost:8080/api/v1/enrollments/enroll/user/${this.userId}`)
      .subscribe({
        next: (data) => {
          this.enrolledCourses = data;
          console.log('Enrolled courses loaded:', this.enrolledCourses); // Log para depuração
        },
        error: (error) => {
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
      .post('http://localhost:8080/api/v1/enrollments/enroll', payload, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({
        next: () => {
          alert(`Successfully enrolled in ${this.selectedFormationCourse.name}!`);
          this.closeFormationModal();
          this.fetchEnrolledCourses(); // Atualiza os cursos adquiridos
        },
        error: (err) => {
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



/*

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Indica que é um standalone component
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, SidebarComponent, ModalComponent], // Importa os componentes necessários
})
export class DashboardComponent implements OnInit {
  courses: any[] = []; // Lista de cursos
  isFormationModalOpen = false; // Controle do modal
  selectedFormationCourse: any | null = null; // Curso selecionado
  username: string = 'Student';
  isSaving = false; // Para evitar múltiplos cliques durante o envio

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('name') || 'Student';
    this.fetchCourses();
  }  

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

  openFormationModal(course: any): void {
    this.selectedFormationCourse = course;
    this.isFormationModalOpen = true;
  }

  confirmFormationEnrollment(): void {
    const userId = sessionStorage.getItem('userId'); // Recupera o userId do sessionStorage
    if (!userId) {
      alert('User ID is missing. Please log in again.');
      this.logout(); // Redireciona para login se o userId estiver ausente
      return;
    }
  
    if (!this.selectedFormationCourse) return;
  
    this.isSaving = true;
  
    const payload = {
      userId: userId, // Certifique-se de que este valor é válido
      courseId: this.selectedFormationCourse.id, // Certifique-se de que este valor é válido
    };
  
    console.log('Payload enviado:', payload); // Log para depuração
  
    this.http.post('http://localhost:8080/api/v1/enrollments/enroll', payload, {
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

*/

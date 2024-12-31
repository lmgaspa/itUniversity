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
    if (!this.selectedFormationCourse) return;

    this.isSaving = true;

    const payload = {
      userId: sessionStorage.getItem('userId'), // Certifique-se de que este valor não é null
      courseId: this.selectedFormationCourse.id, // Certifique-se de que este valor não é null
    };

    console.log('Payload enviado:', payload); // Adicione este log para depuração

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

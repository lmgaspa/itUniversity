import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username: string = '';
  nextClass: { subject: string; time: string } = { subject: '', time: '' };
  averageGrade: number = 0;
  unreadMessages: number = 0;
  recentActivities: Array<{ description: string; date: string }> = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Recuperar informações do usuário logado
    this.username = sessionStorage.getItem('name') || 'Aluno';

    // Simulação de dados
    this.nextClass = { subject: 'Matemática', time: '10:00 AM' }; // Dados simulados, substituir por um serviço real
    this.averageGrade = 8.5; // Simulação da média, substituir por dados reais
    this.unreadMessages = 3; // Número de mensagens não lidas
    this.recentActivities = [
      { description: 'Entregou a atividade de Biologia', date: '2024-12-28' },
      { description: 'Participou do fórum de Física', date: '2024-12-27' },
      { description: 'Assistiu à aula de Química', date: '2024-12-26' }
    ];
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

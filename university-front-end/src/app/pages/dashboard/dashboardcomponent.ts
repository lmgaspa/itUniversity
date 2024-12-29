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
    this.username = sessionStorage.getItem('name') || 'Student';
 }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

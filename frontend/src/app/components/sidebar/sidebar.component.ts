import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  sidebarCategories = [
    {
      title: 'Graduation',
      items: [
        { link: '/dashboard/classes', icon: 'fas fa-chalkboard', label: 'My Classes' },
        { link: '/dashboard/grades', icon: 'fas fa-file-alt', label: 'Grades and Assessments' },
        { link: '/dashboard/integrator-project', icon: 'fas fa-project-diagram', label: 'Capstone Project' },
        { link: '/dashboard/extension-activity', icon: 'fas fa-briefcase', label: 'Extension Activity' },
        { link: '/dashboard/complementary-activities', icon: 'fas fa-tasks', label: 'Complementary Activities' },
        { link: '/dashboard/calendar', icon: 'fas fa-calendar-alt', label: 'Academic Calendar' },
        { link: '/dashboard/library', icon: 'fas fa-book', label: 'Library' },
      ],
    },
    {
      title: 'Academic Office',
      items: [
        { link: '/dashboard/announcements', icon: 'fas fa-bullhorn', label: 'Announcements' },
        { link: '/dashboard/documents', icon: 'fas fa-file-alt', label: 'Documentation' },
        { link: '/dashboard/social-graduation', icon: 'fas fa-users', label: 'Social Graduation' },
        { link: '/dashboard/requests', icon: 'fas fa-envelope', label: 'My Requests' },
        { link: '/dashboard/contracts', icon: 'fas fa-file-contract', label: 'My Contracts' },
        { link: '/dashboard/finance', icon: 'fas fa-wallet', label: 'Financial Center', badge: 'New' },
      ],
    },
    {
      title: 'Study Manager',
      items: [
        { link: '/dashboard/performance-monitor', icon: 'fas fa-chart-line', label: 'Performance Monitor' },
        { link: '/dashboard/study-schedule', icon: 'fas fa-calendar-check', label: 'Study Schedule' },
      ],
    },
  ];
}

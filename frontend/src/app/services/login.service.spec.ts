import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { LoginResponse } from '../types/login-response.type';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const toastrMock = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoginService,
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrMock },
      ],
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('deve realizar login com sucesso e navegar para o dashboard', () => {
    const mockResponse: LoginResponse = {
      userId: '123',
      token: 'fake-jwt-token',
      name: 'John Doe',
    };

    service.login('test@example.com', 'password123').subscribe();

    const req = httpMock.expectOne('https://universitysystem-7bcbdef4d122.herokuapp.com/api/v1/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@example.com', password: 'password123' });

    req.flush(mockResponse);

    expect(toastrSpy.success).toHaveBeenCalledWith('Login successful!');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(sessionStorage.getItem('userId')).toBe('123');
    expect(sessionStorage.getItem('auth-token')).toBe('fake-jwt-token');
  });

  it('deve exibir erro ao falhar no login', () => {
    const mockError = { status: 401, statusText: 'Unauthorized' };

    service.login('test@example.com', 'wrong-password').subscribe({
      error: () => {
        expect(toastrSpy.error).toHaveBeenCalledWith(
          'Login failed! Please check your credentials.'
        );
      },
    });

    const req = httpMock.expectOne('https://universitysystem-7bcbdef4d122.herokuapp.com/api/v1/auth/login');
    req.flush('Unauthorized', mockError);
  });

  it('deve realizar signup com sucesso e navegar para o dashboard', () => {
    const mockResponse: LoginResponse = {
      userId: '456',
      token: 'new-jwt-token',
      name: 'Jane Doe',
    };

    service.signup('Jane Doe', 'jane@example.com', 'password123').subscribe();

    const req = httpMock.expectOne('https://universitysystem-7bcbdef4d122.herokuapp.com/api/v1/auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
    });

    req.flush(mockResponse);

    expect(toastrSpy.success).toHaveBeenCalledWith('Registration successful!');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(sessionStorage.getItem('userId')).toBe('456');
    expect(sessionStorage.getItem('auth-token')).toBe('new-jwt-token');
  });

  it('deve lidar com erro no signup', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };

    service.signup('Jane Doe', 'jane@example.com', 'password123').subscribe({
      error: () => {
        expect(toastrSpy.error).toHaveBeenCalledWith('Registration failed! Please try again later.');
      },
    });

    const req = httpMock.expectOne('https://universitysystem-7bcbdef4d122.herokuapp.com/api/v1/auth/register');
    req.flush('Internal Server Error', mockError);
  });

  it('deve buscar todos os usuários com sucesso', () => {
    const mockUsers = [
      { id: '1', name: 'User One', email: 'user1@example.com' },
      { id: '2', name: 'User Two', email: 'user2@example.com' },
    ];

    service.getAllUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://universitysystem-7bcbdef4d122.herokuapp.com/api/v1/user/find-all-users');
    expect(req.request.method).toBe('GET');

    req.flush(mockUsers);
  });

  it('deve buscar o ID de um usuário pelo nome', () => {
    const mockUsers = [
      { id: '1', name: 'User One' },
      { id: '2', name: 'User Two' },
    ];

    service.getUserIdByName('User Two').subscribe((userId) => {
      expect(userId).toBe('2');
    });

    const req = httpMock.expectOne('https://universitysystem-7bcbdef4d122.herokuapp.com/api/v1/user/find-all-users');
    expect(req.request.method).toBe('GET');

    req.flush(mockUsers);
  });

  it('deve retornar null se o usuário não for encontrado pelo nome', () => {
    const mockUsers = [
      { id: '1', name: 'User One' },
      { id: '2', name: 'User Two' },
    ];

    service.getUserIdByName('Nonexistent User').subscribe((userId) => {
      expect(userId).toBeNull();
    });

    const req = httpMock.expectOne('https://universitysystem-7bcbdef4d122.herokuapp.com/api/v1/user/find-all-users');
    expect(req.request.method).toBe('GET');

    req.flush(mockUsers);
  });
});

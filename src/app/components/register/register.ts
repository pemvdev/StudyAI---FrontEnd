import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, RegisterPayload } from '../../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'register-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container h-100 d-flex justify-content-center align-items-center">
      <div class="card shadow-lg p-4" style="max-width: 400px; width: 100%;">
        <div class="text-center mb-4">
          <h4>Create an Account</h4>
        </div>

        <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" [(ngModel)]="registerData.name" name="name" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" [(ngModel)]="registerData.email" name="email" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" [(ngModel)]="registerData.password" name="password" required>
          </div>

          <div *ngIf="mensagemErro" class="text-danger mb-3">{{ mensagemErro }}</div>
          <div *ngIf="mensagemSucesso" class="text-success mb-3">{{ mensagemSucesso }}</div>

          <button type="submit" class="btn btn-primary w-100" [disabled]="loading || registerForm.invalid">
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
        </form>

        <div class="text-center mt-3">
          <button class="btn btn-link" type="button" (click)="goToLogin()">Already have an account?</button>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerData: RegisterPayload = { name: '', email: '', password: '' };
  mensagemErro: string | null = null;
  mensagemSucesso: string | null = null;
  loading = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.clearMessages();
    this.loading = true;

    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.loading = false;
        this.mensagemSucesso = 'Conta criada com sucesso!';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 409) {
          this.mensagemErro = 'Email já cadastrado.';
        } else {
          this.mensagemErro = 'Erro ao registrar. Tente novamente.';
        }
      }
    });
  }

  private clearMessages() {
    this.mensagemErro = null;
    this.mensagemSucesso = null;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

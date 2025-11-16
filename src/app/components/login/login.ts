import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, LoginPayload } from '../../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  // Dados que serão ligados aos campos do formulário
  loginData: LoginPayload = { email: '', password: '' };
  mensagemErro: string | null = null;
  loading = false;
  
  // Injeta o serviço de autenticação
  private authService = inject(AuthService);
  private router = inject(Router);

  goToRegister() {
  this.router.navigate(['/register']);
}

  // Função chamada ao enviar o formulário
  onSubmit() {
    this.mensagemErro = null; // Limpa qualquer erro anterior
    
    // Chama o método 'login' do serviço
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        // SUCESSO! A API retornou a resposta (ex: o token)
        console.log('Login bem-sucedido!', response);
        // **AQUI VOCÊ DEVE SALVAR O TOKEN** (ex: localStorage)
        localStorage.setItem('auth_token', response.token);
        this.router.navigate(['/home']);
        
        // **REDIRECIONAR O USUÁRIO** para a página principal
        // Exemplo: this.router.navigate(['/home']); 

      },
      error: (error) => {
        // FALHA! A API retornou um erro (ex: credenciais inválidas)
        console.error('Erro no Login:', error);
        this.mensagemErro = 'Email ou senha inválidos. Tente novamente.';
        // Você pode verificar 'error.status' para tratar erros específicos (401, 404, etc.)
      }
    });
  }
}

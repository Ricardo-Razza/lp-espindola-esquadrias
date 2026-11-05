import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SERVICOS, linkWhatsapp } from '../dados/empresa';
import { Revelar } from '../compartilhado/revelar.directive';

@Component({
  selector: 'app-servicos',
  imports: [NgOptimizedImage, Revelar],
  template: `
    <section class="servicos lateral" id="servicos">
      <div class="cab" appRevelar>
        <div>
          <span class="rotulo">Serviços</span>
          <h2 class="titulo-serif">O que a Espíndola faz</h2>
        </div>
        <p>Da janela da fachada ao armário da cozinha. Escolha o que você precisa e fale direto com a gente.</p>
      </div>

      <div class="cards">
        @for (s of servicos; track s.titulo) {
          <article class="card" [class.destaque]="s.destaque" [class.vidro]="!s.foto" appRevelar>
            @if (s.foto) {
              <div class="img">
                <img [ngSrc]="s.foto" fill [sizes]="s.destaque ? '(max-width: 700px) 100vw, 40vw' : '(max-width: 700px) 100vw, 30vw'" [alt]="s.titulo">
              </div>
            } @else {
              <div class="vid" aria-hidden="true"><i></i><i></i><i></i></div>
            }
            <div class="c">
              @if (!s.foto) { <span class="tag">Também fazemos</span> }
              <h3>{{ s.titulo }}</h3>
              <p>{{ s.texto }}</p>
              <a [href]="whats(s.mensagem)" target="_blank" rel="noopener">{{ s.chamada }} →</a>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .servicos { padding-top: 110px; padding-bottom: 100px; }
    .cab { display: flex; justify-content: space-between; align-items: end; margin-bottom: 44px; gap: 40px; }
    .cab p { max-width: 420px; color: var(--cinza); font-size: 16px; line-height: 1.55; }
    .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
    .card { background: #fff6; border: 1px solid #1c2a4e1f; display: flex; flex-direction: column; transition: transform .2s ease, box-shadow .2s ease; }
    .card:hover { transform: translateY(-4px); box-shadow: 0 14px 30px #1c2a4e1a; }
    .img { position: relative; height: 250px; overflow: hidden; }
    .img img { object-fit: cover; transition: transform .5s ease; }
    .card:hover .img img { transform: scale(1.04); }
    .c { padding: 22px 22px 24px; display: flex; flex-direction: column; flex: 1; }
    h3 { font-weight: 600; font-stretch: 112%; font-size: 24px; color: var(--azul); letter-spacing: -.01em; }
    p { font-size: 15px; line-height: 1.5; color: var(--cinza); margin: 10px 0 18px; flex: 1; }
    .c a { font-weight: 700; font-size: 14px; color: var(--verm); }
    .c a:hover { text-decoration: underline; }
    .destaque { grid-column: span 2; flex-direction: row; }
    .destaque .img { width: 58%; height: auto; min-height: 330px; }
    .destaque h3 { font-size: 34px; }
    .vidro { background: var(--azul); border-color: var(--azul); }
    .vidro h3 { color: #fff; }
    .vidro p { color: #c3c9d8; }
    .vidro .c a { color: var(--amar); }
    .tag { font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--amar); font-weight: 700; margin-bottom: 4px; }
    .vid { height: 250px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding: 22px 22px 0; }
    .vid i { border: 1.5px solid #ffffff55; background: linear-gradient(135deg, #ffffff18, #ffffff05 60%); }

    @media (max-width: 900px) {
      .cards { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 700px) {
      .servicos { padding-top: 64px; padding-bottom: 60px; }
      .cab { flex-direction: column; align-items: flex-start; gap: 16px; margin-bottom: 26px; }
      .cards { grid-template-columns: 1fr; }
      .destaque { grid-column: auto; flex-direction: column; }
      .destaque .img { width: 100%; min-height: 0; height: 230px; }
      .destaque h3 { font-size: 24px; }
      .img { height: 200px; }
      .vid { height: 140px; }
    }
  `,
})
export class Servicos {
  protected readonly servicos = SERVICOS;
  protected whats(msg: string) {
    return linkWhatsapp(msg);
  }
}

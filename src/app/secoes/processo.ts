import { Component } from '@angular/core';
import { PASSOS } from '../dados/empresa';
import { Revelar } from '../compartilhado/revelar.directive';

/** Faixa dos 40 anos + "Como funciona" */
@Component({
  selector: 'app-processo',
  imports: [Revelar],
  template: `
    <section class="anos lateral" aria-label="Tempo de empresa">
      <b appRevelar>40+</b>
      <p appRevelar>São mais de quatro décadas fazendo janelas, portas e móveis para as casas de <span>Imbé</span> e do litoral norte.</p>
    </section>

    <section class="processo lateral" id="como-funciona">
      <div appRevelar>
        <span class="rotulo">Como funciona</span>
        <h2 class="titulo-serif">Do primeiro contato à instalação</h2>
        <p class="intro">Sem complicação: você fala com quem faz.</p>
      </div>
      <ol class="passos">
        @for (p of passos; track p.titulo; let i = $index) {
          <li appRevelar>
            <h3><em>{{ i + 1 }}</em>{{ p.titulo }}</h3>
            <p>{{ p.texto }}</p>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    .anos { display: grid; grid-template-columns: auto 1fr; gap: 40px; align-items: center; padding-top: 70px; padding-bottom: 70px; background: var(--azul); color: var(--papel); }
    .anos b { font-weight: 800; font-stretch: 115%; font-size: 190px; line-height: .8; letter-spacing: -.04em; color: var(--amar); }
    .anos p { font-family: var(--serif); font-size: 44px; line-height: 1.08; max-width: 760px; }
    .anos span { color: var(--amar); }

    .processo { padding-top: 110px; padding-bottom: 110px; display: grid; grid-template-columns: 1fr 1.6fr; gap: 70px; }
    .intro { margin-top: 22px; color: var(--cinza); font-size: 16px; line-height: 1.55; max-width: 380px; }
    .passos { list-style: none; display: grid; grid-template-columns: 1fr 1fr; }
    .passos li { border-top: 1px solid var(--azul); padding: 24px 30px 34px 0; }
    h3 { font-weight: 600; font-stretch: 112%; font-size: 22px; color: var(--azul); display: flex; align-items: center; gap: 12px; }
    h3 em { font-style: normal; width: 30px; height: 30px; border-radius: 50%; background: var(--azul); color: var(--papel); display: grid; place-items: center; font-size: 14px; flex: none; }
    .passos p { margin-top: 10px; font-size: 15px; line-height: 1.55; color: var(--cinza); }

    @media (max-width: 700px) {
      .anos { grid-template-columns: 1fr; padding-top: 44px; padding-bottom: 44px; gap: 10px; }
      .anos b { font-size: 96px; }
      .anos p { font-size: 30px; }
      .processo { grid-template-columns: 1fr; gap: 30px; padding-top: 64px; padding-bottom: 64px; }
      .passos { grid-template-columns: 1fr; }
    }
  `,
})
export class Processo {
  protected readonly passos = PASSOS;
}

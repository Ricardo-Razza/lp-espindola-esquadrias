import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { EMPRESA, FATOS, linkWhatsapp } from '../dados/empresa';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  template: `
    <section class="hero lateral" id="inicio">
      <div class="texto">
        <span class="rotulo">Há mais de 40 anos em Imbé</span>
        <h1>Esquadrias e móveis <span>sob medida.</span></h1>
        <p class="lead">
          Janelas, portas e venezianas de madeira, esquadrias de alumínio, vidros temperados
          e móveis planejados para a sua casa.
        </p>
        <div class="ctas">
          <a class="btn btn--verm" [href]="whatsapp" target="_blank" rel="noopener">Pedir orçamento no WhatsApp</a>
          <a class="btn btn--borda" href="#trabalhos">Ver trabalhos</a>
        </div>
        <p class="end">
          <b>Loja:</b> {{ empresa.endereco }} — {{ empresa.cidade }}<br>
          <b>WhatsApp:</b> {{ empresa.whatsappExibicao }} · <b>Fixo:</b> {{ empresa.telefoneExibicao }}
        </p>
      </div>
      <div class="foto">
        <img ngSrc="img/cozinha-azul-ampla.webp" fill priority sizes="(max-width: 700px) 100vw, 55vw"
             alt="Cozinha planejada azul-marinho com ilha, feita pela Espíndola">
        <div class="faixa" aria-hidden="true"><i></i><i></i><i></i></div>
      </div>
    </section>

    <ul class="fatos">
      @for (f of fatos; track f.titulo) {
        <li><b>{{ f.titulo }}</b><span>{{ f.texto }}</span></li>
      }
    </ul>
  `,
  styles: `
    .hero { display: grid; grid-template-columns: 1fr 1.15fr; gap: 48px; padding-top: 64px; padding-bottom: 80px; align-items: end; }
    h1 { font-weight: 300; font-stretch: 122%; font-size: clamp(46px, 6.4vw, 92px); letter-spacing: -.035em; line-height: .92; color: var(--azul); margin-top: 22px; }
    h1 span { color: var(--verm); }
    .lead { font-size: 19px; line-height: 1.5; color: var(--cinza); margin: 28px 0 34px; max-width: 480px; }
    .ctas { display: flex; gap: 12px; flex-wrap: wrap; }
    .end { margin-top: 40px; font-size: 14px; color: var(--cinza); line-height: 1.6; }
    .end b { color: var(--azul); }
    .foto { position: relative; height: 620px; }
    .foto img { object-fit: cover; }
    .faixa { position: absolute; left: 0; right: 0; bottom: 0; display: grid; grid-template-columns: repeat(3, 1fr); }
    .faixa i { height: 10px; }
    .faixa i:nth-child(1) { background: var(--verm); }
    .faixa i:nth-child(2) { background: var(--azul); }
    .faixa i:nth-child(3) { background: var(--amar); }

    .fatos { list-style: none; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--azul); border-bottom: 1px solid var(--azul); margin: 0 var(--lateral); }
    .fatos li { padding: 26px 26px 26px 0; }
    .fatos li + li { padding-left: 26px; border-left: 1px solid var(--borda); }
    .fatos b { display: block; font-weight: 600; font-stretch: 110%; font-size: 19px; color: var(--azul); margin-bottom: 6px; }
    .fatos span { font-size: 14px; color: var(--cinza); line-height: 1.45; }

    @media (max-width: 700px) {
      .hero { grid-template-columns: 1fr; gap: 28px; padding-top: 0; padding-bottom: 40px; }
      .foto { height: 300px; order: -1; margin: 0 calc(-1 * var(--lateral)); }
      .lead { font-size: 16px; margin: 18px 0 22px; }
      .ctas .btn { flex: 1; }
      .end { margin-top: 22px; }
      .fatos { grid-template-columns: 1fr 1fr; }
      .fatos li, .fatos li + li { padding: 18px 12px 18px 0; border-left: 0; }
      .fatos li:nth-child(even) { padding-left: 14px; border-left: 1px solid var(--borda); }
      .fatos li:nth-child(n + 3) { border-top: 1px solid var(--borda); }
      .fatos b { font-size: 16px; }
      .fatos span { font-size: 13px; }
    }
  `,
})
export class Hero {
  protected readonly empresa = EMPRESA;
  protected readonly fatos = FATOS;
  protected readonly whatsapp = linkWhatsapp();
}

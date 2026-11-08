import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CARROSSEL, EMPRESA, FATOS, linkWhatsapp } from '../dados/empresa';

const INTERVALO_MS = 5000;

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
          <span><b>WhatsApp:</b> {{ empresa.whatsappExibicao }}</span> · <span><b>Fixo:</b> {{ empresa.telefoneExibicao }}</span>
        </p>
      </div>

      <div class="carrossel" role="region" aria-roledescription="carrossel" aria-label="Fotos da Espíndola"
           (mouseenter)="pausado.set(true)" (mouseleave)="pausado.set(false)"
           (touchstart)="toqueInicio($event)" (touchend)="toqueFim($event)">
        @for (s of slides; track s.foto; let i = $index) {
          <div class="slide" [class.ativo]="i === atual()" [attr.aria-hidden]="i !== atual()"
               role="group" aria-roledescription="foto" [attr.aria-label]="(i + 1) + ' de ' + slides.length">
            <img [ngSrc]="s.foto" fill [priority]="i === 0" sizes="(max-width: 700px) 100vw, 55vw"
                 [style.object-position]="s.posicao ?? 'center'" [alt]="s.legenda">
          </div>
        }
        <span class="legenda" aria-live="polite">{{ slides[atual()].legenda }}</span>
        <button type="button" class="seta ant" (click)="ir(-1)" aria-label="Foto anterior">‹</button>
        <button type="button" class="seta prox" (click)="ir(1)" aria-label="Próxima foto">›</button>
        <div class="pontos">
          @for (s of slides; track s.foto; let i = $index) {
            <button type="button" [class.on]="i === atual()" (click)="atual.set(i)"
                    [attr.aria-label]="'Ver foto ' + (i + 1)" [attr.aria-current]="i === atual()"></button>
          }
        </div>
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
    h1 { font-weight: 300; font-stretch: 122%; font-size: clamp(42px, 6.4vw, 92px); letter-spacing: -.035em; line-height: .92; color: var(--azul); margin-top: 22px; }
    h1 span { color: var(--verm); }
    .lead { font-size: 18px; line-height: 1.5; color: var(--cinza); margin: 28px 0 34px; max-width: 500px; }
    .ctas { display: flex; gap: 12px; flex-wrap: wrap; }
    .end { margin-top: 40px; font-size: 14px; color: var(--cinza); line-height: 1.6; }
    .end b { color: var(--azul); font-weight: 600; }

    .carrossel { position: relative; height: 620px; overflow: hidden; background: var(--azul); }
    .slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1s ease; }
    .slide.ativo { opacity: 1; }
    .slide img { object-fit: cover; transform: scale(1.06); transition: transform 6s ease-out; }
    .slide.ativo img { transform: scale(1); }
    .legenda { position: absolute; left: 16px; top: 16px; background: var(--papel); color: var(--azul); font-size: 13px; font-weight: 600; padding: 7px 12px; z-index: 2; }
    .seta {
      position: absolute; top: 50%; transform: translateY(-50%); z-index: 2; width: 46px; height: 46px; border-radius: 50%;
      background: #efe8dcdd; color: var(--azul); font-size: 28px; line-height: 1; display: grid; place-items: center; opacity: 0; transition: opacity .2s;
    }
    .carrossel:hover .seta, .seta:focus-visible { opacity: 1; }
    .ant { left: 14px; }
    .prox { right: 14px; }
    .pontos { position: absolute; right: 16px; bottom: 26px; display: flex; gap: 8px; z-index: 2; }
    .pontos button { width: 10px; height: 10px; border-radius: 50%; background: #ffffff88; transition: background-color .2s, width .2s; }
    .pontos button.on { background: #fff; width: 26px; border-radius: 6px; }
    .faixa { position: absolute; left: 0; right: 0; bottom: 0; display: grid; grid-template-columns: repeat(3, 1fr); z-index: 2; }
    .faixa i { height: 10px; }
    .faixa i:nth-child(1) { background: var(--verm); }
    .faixa i:nth-child(2) { background: var(--azul); }
    .faixa i:nth-child(3) { background: var(--amar); }

    .fatos { list-style: none; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--azul); border-bottom: 1px solid var(--azul); margin: 0 var(--lateral); }
    .fatos li { padding: 26px 26px 26px 0; }
    .fatos li + li { padding-left: 26px; border-left: 1px solid var(--borda); }
    .fatos b { display: block; font-weight: 500; font-size: 18px; color: var(--azul); margin-bottom: 6px; }
    .fatos span { font-size: 14px; color: var(--cinza); line-height: 1.45; }

    @media (prefers-reduced-motion: reduce) {
      .slide, .slide img, .pontos button { transition: none; }
      .slide img { transform: none; }
    }
    @media (max-width: 700px) {
      .hero { grid-template-columns: 1fr; gap: 28px; padding-top: 0; padding-bottom: 40px; }
      .carrossel { height: 320px; order: -1; margin: 0 calc(-1 * var(--lateral)); }
      .seta { display: none; }
      .legenda { left: 12px; top: 12px; font-size: 12px; padding: 5px 9px; }
      .pontos { right: 12px; bottom: 22px; }
      .lead { font-size: 16px; margin: 18px 0 22px; }
      .ctas { flex-direction: column; }
      .end { margin-top: 22px; }
      .end span { white-space: nowrap; }
      .fatos { grid-template-columns: 1fr 1fr; }
      .fatos li, .fatos li + li { padding: 18px 12px 18px 0; border-left: 0; }
      .fatos li:nth-child(even) { padding-left: 14px; border-left: 1px solid var(--borda); }
      .fatos li:nth-child(n + 3) { border-top: 1px solid var(--borda); }
      .fatos b { font-size: 15px; }
      .fatos span { font-size: 13px; }
    }
  `,
})
export class Hero {
  protected readonly empresa = EMPRESA;
  protected readonly fatos = FATOS;
  protected readonly whatsapp = linkWhatsapp();
  protected readonly slides = CARROSSEL;
  protected readonly atual = signal(0);
  protected readonly pausado = signal(false);
  private toqueX = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);
    // só roda no navegador: no HTML pré-renderizado fica a primeira foto
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const timer = setInterval(() => {
        if (!this.pausado() && !document.hidden) this.ir(1);
      }, INTERVALO_MS);
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }

  protected ir(passo: number) {
    const n = this.slides.length;
    this.atual.update((i) => (i + passo + n) % n);
  }

  protected toqueInicio(e: TouchEvent) {
    this.toqueX = e.touches[0].clientX;
    this.pausado.set(true);
  }

  protected toqueFim(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - this.toqueX;
    if (Math.abs(dx) > 40) this.ir(dx < 0 ? 1 : -1);
    this.pausado.set(false);
  }
}

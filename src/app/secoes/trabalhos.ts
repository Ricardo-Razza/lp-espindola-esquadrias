import { Component, computed, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CATEGORIAS, Categoria, TRABALHOS, Trabalho } from '../dados/empresa';
import { Revelar } from '../compartilhado/revelar.directive';

@Component({
  selector: 'app-trabalhos',
  imports: [NgOptimizedImage, Revelar],
  template: `
    <section class="galeria lateral" id="trabalhos">
      <div class="cab" appRevelar>
        <div>
          <span class="rotulo">Trabalhos</span>
          <h2 class="titulo-serif">Feito pela Espíndola</h2>
        </div>
        <div class="filtros" role="group" aria-label="Filtrar trabalhos">
          @for (c of categorias; track c.id) {
            <button type="button" [class.on]="filtro() === c.id" [attr.aria-pressed]="filtro() === c.id"
                    (click)="filtro.set(c.id)">{{ c.nome }}</button>
          }
        </div>
      </div>

      <div class="grid">
        @for (t of visiveis(); track t.foto; let i = $index) {
          <button type="button" class="item" [class.grande]="i === 0 && !t.pequena" (click)="aberto.set(t)"
                  [attr.aria-label]="'Ampliar foto: ' + t.legenda">
            <img [ngSrc]="t.foto" fill sizes="(max-width: 700px) 50vw, 33vw" [alt]="t.legenda">
            <span class="legenda">{{ t.legenda }}</span>
          </button>
        }
      </div>
    </section>

    @if (aberto(); as t) {
      <div class="lightbox" role="dialog" aria-modal="true" [attr.aria-label]="t.legenda" (click)="aberto.set(null)">
        <figure (click)="$event.stopPropagation()">
          <img [src]="t.foto" [alt]="t.legenda">
          <figcaption>{{ t.legenda }}</figcaption>
        </figure>
        <button type="button" class="fechar" (click)="aberto.set(null)" aria-label="Fechar">✕</button>
      </div>
    }
  `,
  host: { '(document:keydown.escape)': 'aberto.set(null)' },
  styles: `
    .galeria { background: var(--papel2); padding-top: 100px; padding-bottom: 100px; }
    .cab { display: flex; justify-content: space-between; align-items: end; margin-bottom: 36px; gap: 24px; }
    .filtros { display: flex; gap: 8px; flex-wrap: wrap; }
    .filtros button { border: 1.5px solid var(--azul); padding: 9px 16px; border-radius: 30px; color: var(--azul); font-size: 13px; font-weight: 600; transition: background-color .15s; }
    .filtros button:hover { background: #1c2a4e14; }
    .filtros button.on { background: var(--azul); color: var(--papel); }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 260px; gap: 14px; grid-auto-flow: dense; }
    .item { position: relative; overflow: hidden; text-align: left; background: var(--papel); }
    .item.grande { grid-column: span 2; grid-row: span 2; }
    .item img { object-fit: cover; transition: transform .5s ease; }
    .item:hover img { transform: scale(1.05); }
    .legenda { position: absolute; left: 12px; bottom: 12px; background: var(--papel); color: var(--azul); font-size: 13px; font-weight: 600; padding: 7px 12px; }

    .lightbox { position: fixed; inset: 0; z-index: 50; background: #12182cee; display: grid; place-items: center; padding: 24px; }
    .lightbox figure { max-width: min(1000px, 100%); }
    .lightbox img { max-height: 80vh; width: auto; margin: 0 auto; }
    .lightbox figcaption { color: var(--papel); text-align: center; margin-top: 14px; font-weight: 600; }
    .fechar { position: absolute; top: 18px; right: 22px; color: #fff; font-size: 26px; width: 44px; height: 44px; }

    @media (max-width: 900px) {
      .grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 700px) {
      .galeria { padding-top: 60px; padding-bottom: 60px; }
      .cab { flex-direction: column; align-items: flex-start; gap: 16px; margin-bottom: 26px; }
      .grid { grid-template-columns: 1fr 1fr; grid-auto-rows: 160px; gap: 10px; }
      .item.grande { grid-row: span 2; }
      .legenda { font-size: 12px; left: 8px; bottom: 8px; padding: 5px 9px; }
    }
  `,
})
export class Trabalhos {
  protected readonly categorias = CATEGORIAS;
  protected readonly filtro = signal<Categoria | 'todos'>('todos');
  protected readonly aberto = signal<Trabalho | null>(null);
  protected readonly visiveis = computed(() => {
    const f = this.filtro();
    return f === 'todos' ? TRABALHOS : TRABALHOS.filter((t) => t.categoria === f);
  });
}

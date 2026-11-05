import { Component, signal } from '@angular/core';
import { EMPRESA, linkWhatsapp } from '../dados/empresa';

@Component({
  selector: 'app-topo',
  template: `
    <header class="topo lateral">
      <a class="marca" href="#inicio" aria-label="Espíndola Móveis e Esquadrias — início">
        <span class="listras" aria-hidden="true"><i></i><i></i><i></i></span>
        <span><b>ESPÍNDOLA</b><small>Móveis e Esquadrias</small></span>
      </a>

      <nav [class.aberto]="menuAberto()" aria-label="Seções do site">
        @for (item of menu; track item.href) {
          <a [href]="item.href" (click)="menuAberto.set(false)">{{ item.nome }}</a>
        }
      </nav>

      <div class="acoes">
        <a class="fone" [href]="'tel:+' + empresa.telefone">{{ empresa.telefoneExibicao }}</a>
        <a class="btn btn--verm" [href]="whatsapp" target="_blank" rel="noopener">WhatsApp</a>
        <button class="hamburguer" type="button" (click)="menuAberto.update((v) => !v)"
                [attr.aria-expanded]="menuAberto()" aria-label="Abrir menu">
          <span></span><span></span>
        </button>
      </div>
    </header>
  `,
  styles: `
    .topo {
      position: sticky; top: 0; z-index: 20; display: flex; justify-content: space-between; align-items: center;
      padding-top: 16px; padding-bottom: 16px; background: color-mix(in srgb, var(--papel) 92%, transparent);
      backdrop-filter: blur(8px); border-bottom: 1px solid var(--borda);
    }
    .marca { display: flex; align-items: center; gap: 12px; }
    .marca b { display: block; font-weight: 800; font-stretch: 115%; letter-spacing: .05em; font-size: 21px; color: var(--verm); line-height: 1; }
    .marca small { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--azul); font-weight: 600; }
    nav { display: flex; gap: 30px; font-size: 14px; font-weight: 500; color: var(--azul); }
    nav a:hover { color: var(--verm); }
    .acoes { display: flex; gap: 18px; align-items: center; font-weight: 600; color: var(--azul); font-size: 14px; }
    .acoes .btn { padding: 12px 20px; font-size: 14px; }
    .hamburguer { display: none; width: 40px; height: 40px; position: relative; }
    .hamburguer span { position: absolute; left: 9px; right: 9px; height: 2px; background: var(--azul); transition: transform .2s; }
    .hamburguer span:first-child { top: 15px; }
    .hamburguer span:last-child { top: 23px; }
    .hamburguer[aria-expanded='true'] span:first-child { transform: translateY(4px) rotate(45deg); }
    .hamburguer[aria-expanded='true'] span:last-child { transform: translateY(-4px) rotate(-45deg); }

    @media (max-width: 900px) {
      .fone { display: none; }
      .hamburguer { display: block; }
      .acoes .btn { padding: 10px 16px; font-size: 13px; }
      nav {
        display: none; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; gap: 0;
        background: var(--papel); border-bottom: 1px solid var(--borda); padding: 8px var(--lateral) 16px;
      }
      nav.aberto { display: flex; }
      nav a { padding: 14px 0; font-size: 17px; border-bottom: 1px solid var(--borda); }
      .marca b { font-size: 18px; }
    }
  `,
})
export class Topo {
  protected readonly empresa = EMPRESA;
  protected readonly whatsapp = linkWhatsapp();
  protected readonly menuAberto = signal(false);
  protected readonly menu = [
    { nome: 'Serviços', href: '#servicos' },
    { nome: 'Trabalhos', href: '#trabalhos' },
    { nome: 'Como funciona', href: '#como-funciona' },
    { nome: 'Onde estamos', href: '#onde-estamos' },
  ];
}

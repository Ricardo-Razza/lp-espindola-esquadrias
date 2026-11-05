import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { EMPRESA, HORARIOS, linkWhatsapp } from '../dados/empresa';
import { Revelar } from '../compartilhado/revelar.directive';

/** Loja, mapa, horários e rodapé */
@Component({
  selector: 'app-contato',
  imports: [NgOptimizedImage, Revelar],
  template: `
    <section class="visita" id="onde-estamos">
      <div class="foto">
        <img ngSrc="img/fachada-loja.webp" fill sizes="(max-width: 700px) 100vw, 55vw"
             alt="Fachada da loja Espíndola Móveis e Esquadrias em Imbé">
      </div>
      <div class="txt" appRevelar>
        <span class="rotulo">Onde estamos</span>
        <h2>Venha conhecer a loja.</h2>
        <dl>
          <dt>Endereço</dt><dd>{{ empresa.endereco }}<br>{{ empresa.cidade }} — {{ empresa.cep }}</dd>
          <dt>WhatsApp</dt><dd><a [href]="whatsapp" target="_blank" rel="noopener">{{ empresa.whatsappExibicao }}</a></dd>
          <dt>Telefone</dt><dd><a [href]="'tel:+' + empresa.telefone">{{ empresa.telefoneExibicao }}</a></dd>
          <dt>E-mail</dt><dd><a [href]="'mailto:' + empresa.email">{{ empresa.email }}</a></dd>
          <dt>Instagram</dt><dd><a [href]="empresa.instagram" target="_blank" rel="noopener">{{ empresa.instagramUsuario }}</a></dd>
        </dl>
        <div class="ctas">
          <a class="btn btn--amar" [href]="whatsapp" target="_blank" rel="noopener">Chamar no WhatsApp</a>
          <a class="btn btn--claro" [href]="'tel:+' + empresa.telefone">Ligar agora</a>
        </div>
      </div>
    </section>

    <section class="mapa lateral" aria-label="Mapa e horário de atendimento">
      <div class="quadro">
        <iframe [src]="mapa" title="Mapa da loja Espíndola em Imbé" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div appRevelar>
        <span class="rotulo">Horário de atendimento</span>
        <h3>Quando você pode passar na loja</h3>
        <ul class="horas">
          @for (h of horarios; track h.dias) {
            <li [class.fechado]="'fechado' in h"><span>{{ h.dias }}</span><span>{{ h.horas }}</span></li>
          }
        </ul>
        <div class="redes">
          <a class="btn btn--verm" [href]="empresa.rotas" target="_blank" rel="noopener">Como chegar</a>
          <a class="btn btn--borda" [href]="empresa.instagram" target="_blank" rel="noopener">Instagram</a>
          <a class="btn btn--borda" [href]="empresa.facebook" target="_blank" rel="noopener">Facebook</a>
        </div>
      </div>
    </section>

    <footer class="rodape lateral">
      <div class="wm" aria-hidden="true"><span class="listras"><i></i><i></i><i></i></span>ESPÍNDOLA</div>
      <div class="base">
        <span>{{ empresa.nome }} — {{ empresa.cidade }}</span>
        <span>
          <a [href]="empresa.instagram" target="_blank" rel="noopener">Instagram</a> ·
          <a [href]="empresa.facebook" target="_blank" rel="noopener">Facebook</a> ·
          <a [href]="whatsapp" target="_blank" rel="noopener">WhatsApp</a>
        </span>
        <span>Seg–Sex 8h–18h · Sáb 8h–12h</span>
      </div>
    </footer>

    <a class="zapfixo" [href]="whatsapp" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5 0a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"/></svg>
      WhatsApp
    </a>
  `,
  styles: `
    .visita { display: grid; grid-template-columns: 1.1fr 1fr; }
    .foto { position: relative; min-height: 600px; }
    .foto img { object-fit: cover; object-position: 55% center; }
    .txt { background: var(--verm); color: #fff; padding: 70px 56px; display: flex; flex-direction: column; gap: 30px; }
    .txt .rotulo { color: #fff; }
    .txt .rotulo::before { background: var(--amar); }
    h2 { font-family: var(--serif); font-weight: 400; font-size: 74px; line-height: .98; }
    dl { display: grid; grid-template-columns: 120px 1fr; gap: 14px 20px; font-size: 16px; line-height: 1.45; border-top: 1px solid #ffffff55; padding-top: 24px; }
    dt { font-size: 12px; letter-spacing: .14em; text-transform: uppercase; opacity: .75; padding-top: 3px; }
    dd a:hover { text-decoration: underline; }
    .ctas { display: flex; gap: 12px; flex-wrap: wrap; }

    .mapa { display: grid; grid-template-columns: 560px 1fr; gap: 70px; padding-top: 100px; padding-bottom: 100px; align-items: start; }
    .quadro { aspect-ratio: 1; border: 2px solid var(--azul); background: var(--papel2); }
    iframe { width: 100%; height: 100%; border: 0; display: block; }
    h3 { font-family: var(--serif); font-weight: 400; font-size: 56px; color: var(--azul); line-height: 1; margin: 16px 0 30px; }
    .horas { list-style: none; border-top: 1px solid var(--azul); }
    .horas li { display: flex; justify-content: space-between; gap: 12px; padding: 16px 0; border-bottom: 1px solid var(--borda); font-size: 17px; color: var(--azul); }
    .horas li span:first-child { font-weight: 600; }
    .horas li.fechado { color: var(--cinza); }
    .redes { display: flex; gap: 12px; margin-top: 34px; flex-wrap: wrap; }

    .rodape { background: var(--azul); color: var(--papel); padding-top: 46px; padding-bottom: 26px; overflow: hidden; }
    .wm { display: flex; align-items: center; gap: 30px; font-weight: 800; font-stretch: 115%; font-size: clamp(44px, 10.4vw, 150px); letter-spacing: -.02em; line-height: .8; }
    .wm .listras { width: .79em; gap: .08em; }
    .wm .listras i { height: .15em; }
    .base { display: flex; justify-content: space-between; gap: 12px; margin-top: 36px; color: #b9c0d3; font-size: 13px; }
    .base a:hover { color: #fff; }

    .zapfixo { display: none; }

    @media (max-width: 1000px) {
      .mapa { grid-template-columns: 1fr 1fr; gap: 40px; }
    }
    @media (max-width: 700px) {
      .visita { grid-template-columns: 1fr; }
      .foto { min-height: 260px; }
      .txt { padding: 44px 20px 50px; }
      h2 { font-size: 46px; }
      dl { grid-template-columns: 90px 1fr; font-size: 15px; }
      .ctas .btn { flex: 1; }
      .mapa { grid-template-columns: 1fr; padding-top: 56px; padding-bottom: 56px; gap: 30px; }
      h3 { font-size: 34px; }
      .horas li { font-size: 14px; }
      .wm { gap: 12px; }
      .base { flex-direction: column; gap: 6px; padding-bottom: 70px; }
      .zapfixo {
        display: flex; align-items: center; gap: 8px; position: fixed; right: 16px; bottom: 16px; z-index: 30;
        background: #1f9e55; color: #fff; font-weight: 700; padding: 14px 20px; border-radius: 40px; box-shadow: 0 6px 20px #0004;
      }
    }
  `,
})
export class Contato {
  protected readonly empresa = EMPRESA;
  protected readonly horarios = HORARIOS;
  protected readonly whatsapp = linkWhatsapp();
  protected readonly mapa = inject(DomSanitizer).bypassSecurityTrustResourceUrl(EMPRESA.mapaEmbed);
}

import { Component } from '@angular/core';
import { Topo } from './secoes/topo';
import { Hero } from './secoes/hero';
import { Servicos } from './secoes/servicos';
import { Trabalhos } from './secoes/trabalhos';
import { Processo } from './secoes/processo';
import { Contato } from './secoes/contato';

@Component({
  selector: 'app-root',
  imports: [Topo, Hero, Servicos, Trabalhos, Processo, Contato],
  template: `
    <app-topo />
    <main>
      <app-hero />
      <app-servicos />
      <app-trabalhos />
      <app-processo />
      <app-contato />
    </main>
  `,
})
export class App {}

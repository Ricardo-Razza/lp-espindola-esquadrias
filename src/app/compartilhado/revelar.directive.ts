import { Directive, ElementRef, afterNextRender, inject, DestroyRef } from '@angular/core';

/**
 * Faz o elemento surgir suavemente quando entra na tela.
 * A classe só é aplicada no navegador, então o HTML pré-renderizado continua visível sem JavaScript.
 */
@Directive({ selector: '[appRevelar]' })
export class Revelar {
  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) return;
      el.classList.add('revelar');
      const observer = new IntersectionObserver(
        (entradas) => {
          if (entradas.some((e) => e.isIntersecting)) {
            el.classList.add('visivel');
            observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}

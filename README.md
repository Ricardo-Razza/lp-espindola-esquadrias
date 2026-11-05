# Espíndola Móveis e Esquadrias — site

Landing page da Espíndola (Imbé/RS), feita em **Angular 22** com pré-renderização estática.

## Rodar localmente

```bash
npm install
npm start          # http://localhost:4200
```

## Gerar o site

```bash
npm run build      # saída em dist/espindola-site/browser
npm run preview    # serve o build em http://localhost:4300
```

## Onde editar

- **Telefones, endereço, horário, redes, serviços e fotos:** `src/app/dados/empresa.ts`
- **Fotos:** `public/img/`
- **Cores e estilos globais:** `src/styles.css`
- **Seções da página:** `src/app/secoes/`
- **SEO (título, descrição, dados da empresa para o Google):** `src/index.html`

## Deploy

A Vercel faz o deploy automaticamente a cada push na branch `main` (configuração em `vercel.json`).

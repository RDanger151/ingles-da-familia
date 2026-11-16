# Inglês da Família

Site de estudo de inglês para falantes de português, em uma única página (`index.html`), sem servidor e sem IA.

- `index.html`: o site pronto. É o que o GitHub Pages serve.
- `src/`: as partes separadas. O motor fica em `app.js`; o conteúdo fica nos arquivos `content-*.js`.
- `build.py`: junta tudo em `index.html` (`python3 build.py`).

Para acrescentar semanas, crie um novo arquivo `src/content-wNN-NN-*.js` no mesmo formato e inclua-o na lista do `build.py`.

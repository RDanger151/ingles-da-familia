import pathlib
s=pathlib.Path('src')
css=(s/'style.css').read_text()
js=[ (s/f).read_text() for f in ['content-core.js','content-w01-04-natural.js','content-w01-04-grammar.js','app.js']]
html=f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Inglês da Família</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Fraunces:opsz,wght@9..144,600&display=swap" rel="stylesheet">
<style>
{css}
</style>
</head>
<body>
<header id="top"></header>
<main id="main"></main>
<nav id="nav" aria-label="Abas"></nav>
<noscript><p style="padding:16px">Este site precisa de JavaScript ligado no navegador.</p></noscript>
''' + ''.join(f'<script>\n{j}\n</script>\n' for j in js) + '</body>\n</html>\n'
assert '</script>' not in ''.join(js)
pathlib.Path('index.html').write_text(html)
print(len(html))

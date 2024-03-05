## Passos para gerar release

O planejamento de release deste repositório é git-flow. Portanto, a branch `develop` é a que tem todo código da versão a ser gerada. Então faça os seguintes passos:
* crie uma branch com o nome da próxima versao (`v0.0.1-snap`) com snapshot, a partir da branch `develop`
* altere os arquivos: `changelog.md` e `package.json` para conter a nova versão snapshot
* faça merge desta branch snap na `develop`
* crie uma nova branch com o nome da versão (`v0.0.1`) sem snapshot, a partir da branch `develop`
* altere os arquivos: `changelog.md` e `package.json` para conter somente a ultima versão sem snapshot
* faça merge da `main/master` nesta branch nova e resolva os conflitos de versões
* crie PR desta nova branch para master
* faça merge da PR
* crie uma release no github para esta nova versão a partir da main
* gere um build a partir da main e renomeie a pasta build para o nome do sistema com a versão
* faça upload do zip do build na release
* publique a versão

Este sistema é um executável html/JS. O build ocorre com o comando `yarn build`. Após executar, crie um zip da pasta build e renomeie para o nome do sistema mais a versão, por exemplo: `horas-talento_v0.0.1`
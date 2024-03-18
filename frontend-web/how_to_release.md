## Passos para gerar release

O planejamento de release deste repositório é git-flow. Portanto, a branch `develop` é a que tem todo código da versão a ser gerada. Então faça os seguintes passos:
* crie uma branch com o nome da próxima versao (`release`) com snapshot, a partir da branch `develop`
* altere os arquivos: `changelog.md` e `package.json` para conter somente a ultima versão sem snapshot
* crie um commit com o prefix: `release`, `feat` or `fix` para configurar qual será o tipo de release.
* crie PR da `release` para `develop`
* crie PR da `release` para `master`
* faça merge das PRs, sendo para develop primeiro e depois master
* altere os arquivos: `changelog.md` e `package.json` para conter a nova versão snapshot na `develop`
* publique a versão

Este sistema é um executável html/JS. O build ocorre com o comando `yarn build`. Este projeto estamos utilizando github actions para criar a pipeline e gerar as releases para nos. 
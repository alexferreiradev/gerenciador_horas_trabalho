# Projeto frontend para Gerenciador de horas
Projeto criado para ajudar no lancamento de horas de trabalho

# Desenvolvimento
Criado com react-app e adicionado as seguintes libs:
eslint + prettier:
`yarn eslint --init` e `yarn add eslint-plugin-import eslint-config-prettier prettier eslint-plugin-react-hooks eslint-plugin-jsx-a11y babel-eslint eslint-plugin-prettier -D`
Diversas:
`yarn add styled-components history axios react-icons prop-types react-router-dom`

## Execução em Dev
`yarn start`

## Geração de versão
O projeto é exportado como html static e disponibilizado no github do projeto como um zip binário para cada release. A geração de novas versões pode ser feita seguindos os passos abaixo: 
* faça merge do develop para o master
* crie uma tag do master com o numero da versão
* faça checkout para esta tag
* execute `yarn build`
* renomeie a pasta `build` para `lancador-horas-``nome-versao`
* crie um zip da pasta
* crie uma release no github
* faça upload do zip como binário da release
* finalize a release
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 20xx-xx-xx
### Added
### Changed
### Removed
### Fixed

## [0.2.0] - 2021-02-09
### Added
- Adição de minutos em formato redmine
### Changed
### Removed
### Fixed
- Documentação de geração de versão
- Changelog compare entre versões
- Title de html com o nome da aplicação
- Execução via HTML estático não estava sendo carregado o Dashboard
- Cancelar não estava limpando campos
- Totalização de horas para tarefas evolutivas

## [0.1.0] - 2021-01-09
### Added
- Versão e nome de aplicação no cabeçalho
- Função para tipificar um lançamento como evolutiva ou corretiva
- Arquivo de Changelog no projeto frontend para facilitar a documentação para novos devs
- Estilo para lançamentos copiados ou bloqueados
- Erros de campos preenchidos mais claros e para cada campo validado 
### Changed
### Removed
- Delay na busca por OS
### Fixed
- Estilização de lista de resumo do dashboard 

## [0.0.1] - 2020-08-15
### Added
- This CHANGELOG file to hopefully serve as an evolving example of a
  standardized open source project CHANGELOG.
- Geracao de versão inicial para manter histórico de alterações
- Gerenciamento de lancamento de horas com uso de minutos como tempo
- Dashboard para visualização de horas totais
- Salvamento de informações em json no storage do navegador do usuario
- Função de copiar ação para área de transferência
- Campo para Hora inicial
- Informação de última hora de lançamentos feitos de acordo hora inicial mais a soma dos minutos lançados
- Cache de numeração de OS
- AsyncSelect para seleção de OS em cache
- Bloqueio de edição de lançamento quando realiza a cópia de ação
- Botão para reverter bloqueio de edição


[Unreleased]: https://github.com/alexferreiradev/gerenciador_horas_trabalho/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/alexferreiradev/gerenciador_horas_trabalho/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/alexferreiradev/gerenciador_horas_trabalho/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/alexferreiradev/gerenciador_horas_trabalho/releases/tag/v0.0.1
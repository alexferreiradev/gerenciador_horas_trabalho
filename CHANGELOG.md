# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.0] - 2023-01-23
### Added
- Editar mais rápido: adição de alteração de foco e atalho para editar ultimo lançamento
- Lançamento com total lançado: adição de informação de total lançado ao alterar minutos
- Informações sobre cada campo para novo lançamento: facilitar novos usuários a utilizar o sistema
- Placeholder para tarefa: facilita novos usuários a utilizarem o sistema
- Imagem de logotipo
- Atalho para lançamento de minutos no banco de horas.
### Changed
- Tempo de notificações: alterado para 8 segundos. Estava rápido demais.
### Removed
- Campo sistema de lançamento: remoção de campo que não estava sendo utilizado. Ele é um campo raramente utilizado. Versões futuras vamos colocar em campos opcionais. 
### Fixed
- Tempo de inicio: estava gerando erro ao editar.
- Tarefa em novo lançamento: não tinha como limpar a tarefa selecionada. Agora será possível clicar no x e remover a tarefa selecionada.  

<details>
  <sammary>Versões anteriores</sammary>
## [0.5.1] - 2022-02-08
### Added
- Função daily: gerar um texto para mapa mental com todos os lançamentos feitos e descrições copiado para área de transferencia
- Atalho para lançamento: atalho de teclado para agilizar os lançamentos
### Changed
### Removed
### Fixed
- botão lançar sem margins: gerava cliques acidentais no botão de cancelar, cancelando uma edição, fazendo perder textos longos digitados. (#60)

## [0.5.0] - 2022-01-24

### Added
- Confirmação de remoção de lançamento: adição de modal antes de remover
- Exportação de dados: cria um json com todos dados cadastrados para download.
- Iniciar dia: remove todos lançamentos e adiciona o do inicio de dia.
- Link para wiki no rodapé
### Changed
### Removed
### Fixed
- banco de horas nao mostrando valor ao abrir tela

## [0.4.0] - 2021-11-22
### Added
- Banco de horas: função para carregar e salvar minutos do banco de horas criado com horas extras ou devidas de lançamentos anteriores.
### Changed
### Removed
### Fixed

## [0.3.0] - 2021-04-25
### Added
- funcao de cadastro de intervalos. São lancamentos de minutos que não serão contabilizados como lançados, mas sim na ultima hora lançada.
### Changed
- Melhoria de código para facilitar adição de novas funcionalidades. Uso de hooks para declaração de funções, useMemo e useEffects, tornando o código do componente bem limpo.
- Melhoria de design de items de lancamentos. Uso de botoes agrupados abaixo e quebra de linha para descricao do lançamento.
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

</details>

[0.6.0]: https://github.com/alexferreiradev/gerenciador_horas_trabalho/compare/v0.5.1...v0.6.0
[0.5.1]: https://github.com/alexferreiradev/gerenciador_horas_trabalho/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/alexferreiradev/gerenciador_horas_trabalho/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/alexferreiradev/gerenciador_horas_trabalho/compare/v0.3.0...v0.4.0
[0.2.0]: https://github.com/alexferreiradev/gerenciador_horas_trabalho/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/alexferreiradev/gerenciador_horas_trabalho/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/alexferreiradev/gerenciador_horas_trabalho/releases/tag/v0.0.1

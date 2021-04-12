<h1 align="center">Projeto: DesafioQA utilizando Cypress </h1>
<p align="center">Repositório específico para realizar os testes do desafio de Analista de Testes da empresa [Paschoalotto](https://www.paschoalotto.com.br/).</p>

<p align="center"><img src="DesafioQA.png" width="100%"/></p>

--------

## Configurando o Ambiente :gear:

- [Cypress.io](http://www.cypress.io)

- [Documentação Cypress](https://docs.cypress.io/guides/overview/why-cypress.html)

### Requisitos para instalação

- [Node.js](https://nodejs.org/en/)
- [Java 8 ou superrior caso use o Allure Report](https://javadl.oracle.com/webapps/download/AutoDL?BundleId=244036_89d678f2be164786b292527658ca1605)

### Instalação do NPM e instalação do Cypress

Na pasta do projeto abra o terminal ou no VSCode use o Ctrl + ' (aspas simples), e digite os comandos abaixo:

```shell
npm init -y
npm install --yes
npm install cypress@6.8.0 --save-dev
```

OBS: Instalação da versão 6.8.0 pois está bem estável. Outro motivo é que não verifiquei as mudanças das novas versões, com isso prefiro usar neste projeto esta versão do Cypress.

### Comandos para iniciar o Cypress :gear:

#### Iniciar o Cypress no navegador:

```shell
   npx cypress open
```

#### Para executar em modo headless:

```shell
   npx cypress run
```
-----
## Desafio

### Tópicos da resolução

- Site de compras utilizado: [automationpractice.com](http://automationpractice.com/)
- Casos de teste criados: [Casos de teste](https://github.com/QuintilianoNery/DesafioQA/blob/origin/arquivos/casosDeTeste.txt)

- Configuração do relatório Allure-Report: [Configuração e uso do Allure Report](https://github.com/QuintilianoNery/DesafioQA/blob/origin/arquivos/configuracaoAllure-Report.md)

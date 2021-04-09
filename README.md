# DesafioQA

Desafio QA

# Passos para iniciar o desafio

- Configurar o leia-me
- Informar qual site será usado para o projeto
- Informar comandos para iniciar a instalação
- Documentar cenários de testes em um arquivo e disponibilizar um link no git separadamente do projeto
- Criar cenários de testes com automação no cypress
- Validação de todos os campos possíveis
- Validação do total
- Inclusão
- Exclusão do carrinho

- Se der tempo configurar no formato de page opbjects
- Se der tempo configurar relatório allure report
- Se der tempo configurar CI para relatório de cobertura e informar na documentação
- Se der tempo incluir técnicas de cucumber BDD em outro branch

  npm init -y
  npm install --yes

  //Instalação da versão 6.8.0 pois está bem estável, e não verifiquei as mudanças das novas versões


  npm install cypress@6.8.0 --save-dev

6. Iniciar o Cypress no navegador
   npx cypress open

7. Para executar em modo headless:
   npx cypress run
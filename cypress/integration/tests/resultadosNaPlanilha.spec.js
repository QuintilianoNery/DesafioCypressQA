/// <reference types="cypress" />

describe('', () => {
    it('Inclusão de produtos no cartrinho, inserindo resultados em uma planilha', () => {
        //comando personalizado em supports/commands
        cy.backgroundLogin();

        //Visitar a URL padrão http://automationpractice.com/
        cy.visit('/');

        //Validação da URL
        cy.url()
            .should('contain', '/index.php');

        //Setando variável com nome do produto
        let nomeProduto1 = 'Faded Short Sleeve T-shirts';
        let nomeProduto2 = 'Printed Chiffon Dress';
        let nomeProduto3 = 'Blouse';

        //Selecionar produto 1
        cy.get('input[id=search_query_top]')
            .type(nomeProduto1);

        //Clicar no botão pesquisar
        cy.get('button[name=submit_search]')
            .click();

        //Clicar no botão mais informações
        cy.get('a[title=View]')
            .click();

        //Verificar se o protudo da tela é o desejado
        cy.get('h1[itemprop=name]')
            .should('contain.text', nomeProduto1);

        //verificar quantidade de produtos
        cy.get('a.product_quantity_up')
            .click()
            .click();

        cy.get('a.product_quantity_down')
            .click()
            .click();

        //Verificar cor do produto
        cy.get('a[id=color_14]')
            .click();

        cy.get('a[id=color_13]')
            .click();

        //Incluir produto no carrinho
        cy.get('button[name=Submit]')
            .click();

        //validar se o produto foi adicionado ao carrinho com sucesso
        cy.get('.icon-ok')
            //h2
            .parent('')
            .should('contain.text', 'Product successfully added to your shopping cart');

        //Validar se o nome do produto é o mesmo informado na home page
        cy.get('span[id=layer_cart_product_title]')
            .should('contain.text', nomeProduto1);

        //Verificar quantidade de produtos no carrinho 
        cy.get('span[id="layer_cart_product_quantity"]')
            .should('contain', '1')

        //Clicar no botão de checkout
        cy.get(".button-container a[href$='controller=order']")
            .click();

        //Página de informações dos produtos no cartrinho
        cy.url()
            .should('contain', '/index.php?controller=order')
            .should('eq', 'http://automationpractice.com/index.php?controller=order');


        //Clicar na home para continuar comprando
        cy.get('div[id=header_logo]')
            .click()

        //Validação da URL da página inicial
        cy.url()
            .should('contain', '/index.php')
            .should('eq', 'http://automationpractice.com/index.php')

        //Clicar no produto 2, selecionando o primeiro item da seleção
        cy.get('img[title="Printed Chiffon Dress"]')
            .first()
            .click()

        //Conferindo se o produto clicado é o correto
        cy.get('h1[itemprop=name]')
            .contains(nomeProduto2)
            .should('have.text', nomeProduto2)
            .should('contain.text', nomeProduto2)

        //Verificar imagem do produto
        cy.get('img[title="Printed Chiffon Dress"]')
            .first()
            .click()

        //Passar para outras imagens do produto
        cy.get('a[class="fancybox-nav fancybox-next"]')
            .click()

        //Fechar visualização de foto
        cy.get('a[title="Close"]')
            .click()

        //Clicar no botão adicionar produto ao carrinho
        cy.get('p[id=add_to_cart] button[type=submit]')
            .click();

        //Verificar se o segundo produto foi adiconado corretamente
        cy.get('.icon-ok')
            //h2
            .parent('')
            .should('contain.text', 'Product successfully added to your shopping cart');

        //Validar se o nome do produto é o mesmo informado na home page
        cy.get('span[id=layer_cart_product_title]')
            .should('contain.text', nomeProduto2);

        //Verificar quantidade de produtos no carrinho 
        cy.get('span[id="layer_cart_product_quantity"]')
            .should('contain', '1');

        //clicar no botão de continuar comprando
        cy.get('span[title="Continue shopping"]')
            .click()

        //Incluir produto 3
        // Pesquisar produto 3 para compra
        cy.get('input[id=search_query_top]')
            .type(nomeProduto3)

        //clicar no botão pesquisar
        cy.get('button[name=submit_search]')
            .click()

        cy.get('a[title="Add to cart"][data-id-product="2"]')
            .click()

        //Verificar se o segundo produto foi adiconado corretamente
        cy.get('.icon-ok')
            //h2
            .parent('')
            .should('contain.text', 'Product successfully added to your shopping cart');

        //Validar se o nome do produto é o mesmo informado na home page
        cy.get('span[id=layer_cart_product_title]')
            .should('contain.text', nomeProduto3);

        //Verificar quantidade de produtos no carrinho 
        cy.get('span[id="layer_cart_product_quantity"]')
            .should('contain', '1');

        //Continuar para o checkout
        cy.get('a[title="Proceed to checkout"]')
            .click()

        /**----------------------------------------------------------------------------------- */

        //Nesta parte do projeto de teste, o cypress irá capturar os textos das telas com o invoke e inserir em uma planilha
        //Produto1
        //Identificando
        cy.get('p[class="product-name"] a[href*="id_product=1&controller=product#/size-s/color-orange"]')
            //pegando as informações tipo texto
            .invoke('text').then(produto1 => {
                cy.log(produto1)
                //informando em um arquivo as informações recebitas do campo
                cy.writeFile('cypress/fixtures/resultados.csv', { produto1: `${produto1}` });
            })

        // - Valor unitário produto1
        cy.get('span[id="product_price_1_1_0"] [class="price"]')
            .invoke('text').then(valorUnitarioProduto1 => {
                cy.log(valorUnitarioProduto1)
                cy.writeFile('cypress/fixtures/resultados.csv', { valorUnitarioProduto1: `${valorUnitarioProduto1}` });
            })

        // - Quantidade produto1
        cy.get('input[name="quantity_1_1_0_0"]')
            .invoke('val').then(quantidadeProduto1 => {
                cy.log(quantidadeProduto1)
                cy.writeFile('cypress/fixtures/resultados.csv', { quantidadeProduto1: `${quantidadeProduto1}` });
            })

        // - Valor total do produto1
        cy.get('span[id="total_product_price_1_1_0"]')
            .invoke('text').then(valorTotalProduto1 => {
                cy.log(valorTotalProduto1)
                cy.writeFile('cypress/fixtures/resultados.csv', { valorTotalProduto1: `${valorTotalProduto1}` });
            })

        /**----------------------------------------------------------------------------------- */

        //Produto2
        cy.get('p[class="product-name"] a[href*="id_product=7&controller=product#/size-s/color-yellow"]')
            .invoke('text').then(produto2 => {
                cy.log(produto2)
                cy.writeFile('cypress/fixtures/resultados.csv', { produto2: `${produto2}` });
            })

        // - Valor unitário produto2
        cy.get('span[id="product_price_7_34_0"] [class="price special-price"]')
            .invoke('text').then(valorUnitarioProduto2 => {
                cy.log(valorUnitarioProduto2)
                cy.writeFile('cypress/fixtures/resultados.csv', { valorUnitarioProduto2: `${valorUnitarioProduto2}` });
            })

        // - Quantidade produto2
        cy.get('input[name="quantity_7_34_0_0"]')
            .invoke('val').then(quantidadeProduto2 => {
                cy.log(quantidadeProduto2)
                cy.writeFile('cypress/fixtures/resultados.csv', { quantidadeProduto2: `${quantidadeProduto2}` });
            })

        // - Valor total do produto2
        cy.get('span[id="total_product_price_7_34_0"]')
            .invoke('text').then(valorTotalProduto2 => {
                cy.log(valorTotalProduto2)
                cy.writeFile('cypress/fixtures/resultados.csv', { valorTotalProduto2: `${valorTotalProduto2}` });
            })

        /**----------------------------------------------------------------------------------- */

        //Produto3
        cy.get('p[class="product-name"] a[href*="id_product=2&controller=product#/size-s/color-black"]')
            .invoke('text').then(produto3 => {
                cy.log(produto3)
                cy.writeFile('cypress/fixtures/resultados.csv', { produto3: `${produto3}` });
            })

        // - Valor unitário produto3
        cy.get('span[id="product_price_2_7_0"] [class="price"]')
            .invoke('text').then(valorUnitarioProduto3 => {
                cy.log(valorUnitarioProduto3)
                cy.writeFile('cypress/fixtures/resultados.csv', { valorUnitarioProduto3: `${valorUnitarioProduto3}` });
            })

        // - Quantidade produto3
        cy.get('input[name="quantity_2_7_0_0"]')
            .invoke('val').then(quantidadeProduto3 => {
                cy.log(quantidadeProduto3)
                cy.writeFile('cypress/fixtures/resultados.csv', { quantidadeProduto3: `${quantidadeProduto3}` });
            })

        // - Valor total do produto3
        cy.get('span[id="total_product_price_2_7_0"]')
            .invoke('text').then(valorTotalProduto3 => {
                cy.log(valorTotalProduto3)
                cy.writeFile('cypress/fixtures/resultados.csv', { valorTotalProduto3: `${valorTotalProduto3}` });
            })

        /**----------------------------------------------------------------------------------- */

        // - Total dos produtos
        cy.get('td[id="total_product"]')
            .invoke('text').then(valorTotalDosProdutos => {
                cy.log(valorTotalDosProdutos)
                cy.writeFile('cypress/fixtures/resultados.csv', { valorTotalDosProdutos: `${valorTotalDosProdutos}` });
            })

        // - Total do envio
        cy.get('td[id="total_shipping"]')
            .invoke('text').then(valorTotalDoEnvio => {
                cy.log(valorTotalDoEnvio)
                cy.writeFile('cypress/fixtures/resultados.csv', { valorTotalDoEnvio: `${valorTotalDoEnvio}` });
            })

        // - Total dos impostos
        cy.get('td[id="total_tax"]')
            .invoke('text').then(valorTotalDosImpostos => {
                cy.log(valorTotalDosImpostos)
                cy.writeFile('cypress/fixtures/resultados.csv', { valorTotalDosImpostos: `${valorTotalDosImpostos}` });
            })

        // - Valor total da compra
        cy.get('span[id="total_price"]')
            .invoke('text').then(valorTotalDaCompra => {
                cy.log(valorTotalDaCompra)
                cy.writeFile('cypress/fixtures/resultados.csv', { valorTotalDaCompra: `${valorTotalDaCompra}` });
            })

        //Colocar as informações em um só arquivo
    });
});
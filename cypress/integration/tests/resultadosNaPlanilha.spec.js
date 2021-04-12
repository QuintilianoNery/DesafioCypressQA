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

        //Setando variável com nome do produto1
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
    });
});
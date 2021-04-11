describe('', () => {
    it('Inclusão de produto no carrinho e verificar seu código na lista de pedidos', () => {
        //comando personalizado em supports/commands
        cy.backgroundLogin();

        //Visitar a URL padrão http://automationpractice.com/
        //Já que o endereço foi informado no cypress.js, como URL padrão, é só colocar cy.visit('/');
        cy.visit('/');

        let nomeProduto = 'Faded Short Sleeve T-shirts';

        cy.contains(nomeProduto)
            .trigger('mouseover');

        //Mecanismo de busca para encontrar o botão para adicionar ao carrinho
        //nome do produto
        // h5
        //acessar a div
        //acessar os a da div
        //  acessar o span Add to cart do a
        cy.contains(nomeProduto)
            //pai
            .parent()
            //irmãos
            .siblings('div.button-container')
            //Filhos do irmão
            .children('a')
            //selecionar o primeiro elemento filho (add to cart)
            .first()
            .click();


        //validação na tela de pop up


        //validar se o produto foi adicionado ao carrinho com sucesso
        cy.get('.icon-ok')
            //h2
            .parent('')
            .should('contain.text', 'Product successfully added to your shopping cart');

        //validar se o nome do produto é o mesmo informado na home page
        cy.get('span#layer_cart_product_title')
            .should('contain.text', nomeProduto);

        //pai que tenha um filho do tipo a e que tenha um atributo href e que contenha no final o texto controller=order
        cy.get(".button-container a[href$='controller=order']").click();
        cy.get(".cart_navigation a[href$='order&step=1']").click();

        //Página de login, informar as credenciais
        cy.get('#email').type('qa@qa.com');
        cy.get('#passwd').type('12345');
        cy.get('button#SubmitLogin').click();


        //validação na tela de confirmação de endereços
        //[type=checkbox]#addressesAreEquals
        //tipo de asserção | Atributo | valor
        //Validar o valor de um determinado atributo
        cy.get('[type=checkbox]#addressesAreEquals').should('have.attr', 'checked', 'checked');
        cy.get('[type=checkbox]#addressesAreEquals').should('have.attr', 'name', 'same');

        cy.get('button[name=processAddress]').click();

        //Etapa de entrega
        //marcar o tesmo de serviço
        //opção check() para marcar a opção de um checkbox
        cy.get('[type=checkbox]#cgv').check();

        //clicar no botão de prosseguir com o carrinho
        cy.get('button[name=processCarrier]').click();

        //forma de pagamento
        cy.get('.bankwire').click();

        cy.get('.cart_navigation button[type=submit]')
            .find('span')
            .contains("I confirm my order")
            .click();

        //filtrar o ID do conteúdo do texto e usar para filtrar nos pedidos
        //1. capturar o texto do box
        cy.get('div.box')
            .invoke('text')
            .then((text) => {
                console.log(text)

                //2. filtrar o texto do box, para extrair somente o ID do pedido com expressões regulares
                //filtrando tudo que começa é termina com letras de A a Z maiúscula, e informando que deseja somente a posição 2 que é o 1
                console.log(text.match(/[A-Z][A-Z]+/g)[1])

                //3. armazenar o ID do pedido de alguma forma
                //escrita de um  arquivo json com o conteúdo do pedido
                //Três parâmetros, caminho do arquivo (sempre a partir do root )| conteúdo do arquivo
                cy.writeFile('cypress/fixtures/pedidos.json', { id: `${(text.match(/[A-Z][A-Z]+/g)[1] )}` })
            });

        //verificar a ultima tela
        cy.get('.cheque-indent strong')
            //pode-se usar o Expect ou o should - forma explícita e implícita
            .should('contain.text', 'Your order on My Store is complete.');

        //4. obter o id do pedido armazenado de alguma forma
        cy.get('.cart_navigation a[class="button-exclusive btn btn-default"]').click()
        cy.pause()

        //leitura de um arquivo
        cy.readFile('cypress/fixtures/pedidos.json').then((pedidos) => {

            //pegando o valor que foi informado no arquivo .json e validando com a tela de lista de pedidos na primeira linha
            //Em html o ponto . = a uma classe
            //Em json patho ponto . = um nível dentro do caminho
            cy.get('tr.first_item .history_link a').should('contain.text', pedidos.id)
        });
    });
});


describe('Produtos no carrinho da Automationpractice', () => {
    //Caso de teste individual
    it('Inclusão de pedido com verificação do ID do pedido ', () => {
        //comando personalizado em supports/commands
        cy.backgroundLogin();

        //Visitar a URL padrão http://automationpractice.com/
        cy.visit('/');

        //Validação da URL
        cy.url()
            .should('contain', '/index.php');

        //Setando variável com nome do produto1
        let nomeProduto1 = 'Faded Short Sleeve T-shirts';

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

        //Clicar no botão para continuar com o checkout
        cy.get(".cart_navigation a[href$='order&step=1']")
            .click();

        //Efetuar login
        cy.get('#email')
            .type('q@qa.com');
        cy.get('#passwd')
            .type('12345');
        cy.get('button#SubmitLogin')
            .click();

        //validação na tela de confirmação de endereços
        cy.get('input[id=addressesAreEquals]')
            .should('have.attr', 'checked', 'checked');
        cy.get('input[id=addressesAreEquals]')
            .should('have.attr', 'name', 'same');

        //clicar no botão continuar com o checkout da tela de endereços
        cy.get('button[name=processAddress]')
            .click();

        //Etapa de entrega
        //Marcar que aceita os termos de serviços
        cy.get('input[id=cgv]')
            .check();

        //clicar no botão continuar com o checkout da tela de endereços
        cy.get('button[name=processCarrier]')
            .click();

        //Clicar na forma de pagamento Cartão de crédito
        cy.get('.bankwire')
            .click();

        //Clicar no botão "Eu confirmo meu pedido" com base no nome do botão
        cy.get('.cart_navigation button[type=submit]')
            .find('span')
            .contains("I confirm my order")
            .click();

        cy.pause()


        //Localizando o ID do pedido
        //1. capturar o texto do box com as informações de finalização do pedido
        cy.get('div.box')
            .invoke('text')
            .then((text) => {
                console.log(text)

                //2. filtrar o texto do box, para extrair somente o ID do pedido com expressões regulares
                //filtrando tudo que começa é termina com letras de A a Z maiúscula, e informando que deseja somente a posição 2 que é o 1
                console.log(text.match(/[A-Z][A-Z]+/g)[1]);

                //3. armazenar o ID do pedido de alguma forma
                //escrita de um  arquivo json com o conteúdo do pedido
                //Três parâmetros, caminho do arquivo (sempre a partir do root )| conteúdo do arquivo
                cy.writeFile('cypress/fixtures/pedidos.json', { id: `${text.match(/[A-Z][A-Z]+/g)[1]}` });
            });

        //verificar a ultima tela
        cy.get('.cheque-indent strong')
            //pode-se usar o Expect ou o should - forma explícita e implícita
            .should('contain.text', 'Your order on My Store is complete.');

        //4. obter o id do pedido armazenado de alguma forma
        cy.get('.button-exclusive')
            .click()

        //leitura de um arquivo
        cy.readFile('cypress/fixtures/pedidos.json').then((pedidos) => {

            //pegando o valor que foi informado no arquivo .json e validando com a tela de lista de pedidos na primeira linha
            //Em html o ponto . = a uma classe
            //Em json patho ponto . = um nível dentro do caminho
            cy.get('tr.first_item .history_link a').should('contain.text', pedidos.id)
        });
    });

});
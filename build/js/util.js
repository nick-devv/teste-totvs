const Main = {
    init: () => {

        //funções iniciadas ao carregar a página

        //slick slider para banners, thumbs etc (as prateleiras são carregadas utilizando a mesma função, mas em outro momento)
        const carousels = document.querySelectorAll('.carousel-slick');
        carousels.forEach((item) => {
            Main.slick(item)
        }),
        
        //função ajax que consume o products.json para montar a prateleira
        Main.shelf()

        //função que checa se o carrinho contém itens para, caso não, exibir aviso de carrinho vazio
        Main.checkIfEmpty();

        //funcao que conta o numero de produtos no carrinho e atualiza o numero flutuante no canto superior direito do header
        Main.totalInKart();

    },

    slick: (elemento) => {
        
        // fallbacks para caso os attributos do slider não estejam setados nos attributos da tag html

        const slidesToShow = parseInt(elemento.getAttribute('data-slidesToShow') ?? 1)
        const slidesToScroll = parseInt(elemento.getAttribute('data-slidesToScroll') ?? 1)

        const slidesToShowTablet = parseInt(elemento.getAttribute('data-slidesToShow-tablet') ?? 1)
        const slidesToScrollTablet = parseInt(elemento.getAttribute('data-slidesToScroll-tablet') ?? 1)
        
        const slidesToShowMobile = parseInt(elemento.getAttribute('data-slidesToShow-mobile') ?? 1)
        const slidesToScrollMobile = parseInt(elemento.getAttribute('data-slidesToScroll-mobile') ?? 1)

        const dots = elemento.getAttribute('data-dots') === 'true'

        // inicia o slick slider utilizando as variaveis vindas das informações nos attributos da tag html

        $(elemento).slick({
            infinite: true,
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToScroll,
            prevArrow: '<div class="slick-arrow slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="30.031" height="30.031" viewBox="0 0 30.031 30.031"><g id="Componente_47_1" data-name="Componente 47 – 1" transform="translate(0.5 0.5)"><circle id="Elipse_73" data-name="Elipse 73" cx="14.516" cy="14.516" r="14.516" transform="translate(0 29.031) rotate(-90)" fill="#fff" stroke="#e0e0e0" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line id="Linha_47" data-name="Linha 47" y1="10.371" transform="translate(9.16 14.68) rotate(-90)" fill="none" stroke="#545073" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><line id="Linha_48" data-name="Linha 48" x1="4.058" y2="3.889" transform="translate(9.16 18.737) rotate(-90)" fill="none" stroke="#545073" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><line id="Linha_49" data-name="Linha 49" x2="4.058" y2="3.889" transform="translate(9.16 14.68) rotate(-90)" fill="none" stroke="#545073" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></g></svg></div>',
            nextArrow: '<div class="slick-arrow slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="30.031" height="30.031" viewBox="0 0 30.031 30.031"><g id="Componente_46_1" data-name="Componente 46 – 1" transform="translate(0.5 0.5)"><circle id="Elipse_73" data-name="Elipse 73" cx="14.516" cy="14.516" r="14.516" transform="translate(0 29.031) rotate(-90)" fill="#fff" stroke="#e0e0e0" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><line id="Linha_47" data-name="Linha 47" y2="10.371" transform="translate(9.5 14.68) rotate(-90)" fill="none" stroke="#545073" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><line id="Linha_48" data-name="Linha 48" x1="4.058" y1="3.889" transform="translate(15.981 18.737) rotate(-90)" fill="none" stroke="#545073" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><line id="Linha_49" data-name="Linha 49" y1="3.889" x2="4.058" transform="translate(15.981 14.68) rotate(-90)" fill="none" stroke="#545073" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></g></svg></div>',
            dots: dots,
            responsive: [
              {
                breakpoint: 998,
                settings: {
                  slidesToShow: slidesToShowTablet,
                  slidesToScroll: slidesToScrollTablet
                }
              },
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: slidesToShowMobile,
                  slidesToScroll: slidesToScrollMobile
                }
              }
            ]
          
        });

    },

    openKart: () => {
      //função de abrir o carrinho
      $('.wrap-mini-kart').addClass('active');
    },

    closeKart: () => {
      //função de fechar o carrinho
      $('.wrap-mini-kart').removeClass('active');
    },

    openToggle: () => {
      //função de abrir e fechar o toggle do menu mobile
      $('header nav').toggleClass('active');
    },

    checkIfEmpty: () => {
      //função que checa se o carrinho contém itens para, caso não, exibir aviso de carrinho vazio
      if ($('.wrap-mini-kart ul').children().length === 0) {
        $('.wrap-mini-kart').addClass('empty-kart');
      } else {
        $('.wrap-mini-kart').removeClass('empty-kart');
      }
    },

    totalInKart: () => {

      //funcao que conta o numero de produtos no carrinho

      var total = 0;

      $.each($('.wrap-mini-kart ul li'), function(index, element) {

        var quantity = $(element).find('.quantity .number').text();

        total += parseInt(quantity);

      })

      // e atualiza o numero flutuante no canto superior direito do header
      $('header .wrap-menu .kart .qty p').text(total);

    },

    calcCep: () => {

      //função para verificar se o input do cep foi preenchido, se sim, exibe o resultado, se não, exibe aviso de erro

      if( !$('.product-info > .container .wrap-info-product .frete .cep input').val() ) {
        $('.cep .error').addClass('active');
        $('.product-info > .container .wrap-info-product .frete .results').removeClass('active');
      } else {
        $('.cep .error').removeClass('active');
        $('.product-info > .container .wrap-info-product .frete .results').addClass('active');
      }
    },

    sizeSelection: () => {

      //função que adicionar a classe identificadora ('active') quando um tamanho é selecionado tanto na prateleira quanto na pagina de produtos

      var element = event.target;

      $(element).parents('.options').find('a').removeClass('active');
      $(element).addClass('active');
    },

    minusKart : () => {

      //função que diminui a quantidade de um produto no carrinho no botão -

      var element = event.target;
      
      var numberText = $(element).parents('.callback').find('.quantity .number');

      if ($(numberText).text() > 1) {

        number = parseInt(numberText.text()) - 1

        $(numberText).text(number)
  
        //checa se o carrinho está vazio e atualiza o total de produtos no botão flutuante superior direito do header
        Main.checkIfEmpty();
        
        Main.totalInKart();
      }

    },

    removeFromKart : () => {

      //função que remove um produto no carrinho no botão da lixeira

      var element = event.target;
      
      $(element).parents('.callback').remove();

      //checa se o carrinho está vazio e atualiza o total de produtos no botão flutuante superior direito do header
      Main.checkIfEmpty();
      
      Main.totalInKart();

    },

    shelf: () => {

      //função ajax que consume o products.json para montar a prateleira

      $.ajax({ 
        type: 'GET', 
        url: 'products.json', 
        dataType: 'json',
        success: function (data) { 
            $.each(data, function(index, element) {

              //monta o html da flag de desconto destacada em rosa
              if (element.discount) {
                var discount = '<p class="pink">'+element.discount+'</p>';
              } else {
                var discount = '';
              }

              //faz um looping pelos tamanhos contidos na API em 'sizes' e monta uma lista com todos

              let ulSizes = '';

              $.each(element.sizes, function(index, item) {    

                var loopingSizes = '<li>' +
                    '<a href="javascript:void(0);" onClick="return Main.sizeSelection(this);">' +
                      item +
                    '</a>' +
                '</li>'   

                ulSizes += loopingSizes

              });

              //faz um looping pelas flags contidas na API em 'flags' e monta uma lista com todas

              let ulFlags = '';

              $.each(element.flags, function(index, item) {    

                var loopingFlags = '<p>' +
                      item +
                  '</p>';

                ulFlags += loopingFlags

              });

              //monta o html de cada produto na prateleira

              var productListShelf = '<li class="callback" data-id="'+ element.sku +'">' +
                '<div class="hover-sizes">' +
                    '<a href="produto.html">' +
                        '<div class="flags">' +
                          discount +
                          ulFlags +
                        '</div>' +
                        '<img src="src/images/'+ element.image +'" alt="">' +
                    '</a>' +
                    '<ul class="options">' +
                      ulSizes +
                    '</ul>' +
                '</div>' +
                '<h2>' +
                  element.name + 
                '</h2>' +
                '<div class="prices">' +
                    '<p class="old-price">' +
                      element.oldPrice + 
                    '</p>' +
                    '<p class="new-price">' +
                      element.newPrice + 
                    '</p>' +
                    '<p class="installments">' +
                        'em até '+ element.maxInstallments +' de <strong>'+ element.maxPriceInstallments +'</strong>' +
                    '</p>' +
                '</div>' +
                '<button class="btn" onclick="return Main.kart(this)">' +
                    'comprar' +
                '</button>' +
              '</li>'

              //faz um looping pelas prateleiras existentes e insere o html de produtos montados com o json

              $.each($('.prateleira .carousel-prateleira'), function() {
              
                $(this).append(productListShelf);
              
              });
            });
            
            //inicia o slick slider das prateleiras após finalizar de inserir as tags <li></li>

            const carousels = document.querySelectorAll('.carousel-prateleira');
            carousels.forEach((item) => {
                Main.slick(item)
            })

        }
      });
    },

    kart: () => {

      //função que adiciona o produto ao mini kart. essa função serve para as prateleiras, o botão de + do carrinho e o botão adicionar ao carrinho da pagina de produtos.
      var element = event.target;

      // identifica qual o tamanho escolhido
      var sizeChoice = $(element).parents('.callback').find('.options .active').text();

      // identifica qual o id do produto que será adicionado
      var id = $(element).parents('.callback').attr('data-id');

      // vai checar se o produto ja existe no carrinho
      let checkProductKart = false;

      // verifica se o tamanho foi escolhido. se não foi, emite um alerta para escolha do tamanho, se foi, roda a função para adicionar o produto
      if(sizeChoice.length == 0) {
        alert('escolha um tamanho!')
      } else {

        // checa se o produto, no tamanho escolhido, ja existe no carrinho
        $.each($('.content-mini-kart ul li'), function(index, item) {
        
          if ((($(item).attr('data-id')) === id) && (($(item).find('.size').text()) === ('Tamanho: ' + sizeChoice))) {
            
            checkProductKart += true
  
          }
  
        })
  
        // se o produto não existe no carrinho, acrescenta, se existe, acrescenta +1 no valor do input do produto correspondente
        if(checkProductKart === false) {
  
          $.ajax({ 
            type: 'GET', 
            url: 'products.json', 
            dataType: 'json',
            success: function (data) { 
    
                $.each(data, function(index, element) {

                  if(element.sku === id) {
    
                    var productListKart = '<li class="callback" data-id="'+ element.sku +'">' +
                        '<a href="produto.html"><img src="src/images/'+ element.image +'" alt=""></a>' +
                        '<div class="infos">' +
                            '<div class="info">' +
                                '<p>' +
                                    element.name +
                                '</p>' +
                                '<p class="size options">' +
                                    'Tamanho: <span class="active">'+sizeChoice+'</span>' +
                                '</p>' +
                            '</div>' +
                            '<a href="javascript:void(0);" onClick="return Main.removeFromKart();" class="trash">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="15.4" height="17" viewBox="0 0 15.4 17">' +
                                    '<g id="excluir" transform="translate(0.5 0.5)">' +
                                    '<circle id="Elipse_" data-name="Elipse " cx="0.25" cy="0.25" r="0.25" transform="translate(7 8)" fill="#f5f5f5" opacity="0"/>' +
                                    '<g id="trash-2" transform="translate(-3 -2)">' +
                                        '<path id="Caminho_529" data-name="Caminho 529" d="M3,6H17.4" transform="translate(0 -0.8)" fill="none" stroke="#110d2f" stroke-linecap="square" stroke-linejoin="round" stroke-width="1"/>' +
                                        '<path id="Caminho_530" data-name="Caminho 530" d="M15.4,5.2V16.4A1.546,1.546,0,0,1,13.914,18H6.486A1.546,1.546,0,0,1,5,16.4V5.2m2.229,0V3.6A1.546,1.546,0,0,1,8.714,2h2.971a1.546,1.546,0,0,1,1.486,1.6V5.2" transform="translate(0)" fill="none" stroke="#110d2f" stroke-linecap="square" stroke-linejoin="round" stroke-width="1"/>' +
                                        '<line id="Linha_272" data-name="Linha 272" y2="6" transform="translate(8.6 8.429)" fill="none" stroke="#110d2f" stroke-linejoin="round" stroke-width="1"/>' +
                                        '<line id="Linha_273" data-name="Linha 273" y2="6" transform="translate(11.8 8.429)" fill="none" stroke="#110d2f" stroke-linejoin="round" stroke-width="1"/>' +
                                    '</g>' +
                                    '</g>' +
                                '</svg>' +
                            '</a>' +
                            '<div class="quantity">' +
                                '<a href="javascript:void(0);" onClick="return Main.minusKart();" class="plus">' +
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="1.833" viewBox="0 0 11 1.833">' +
                                        '<path id="minus" d="M10.542-5.25H.458A.458.458,0,0,0,0-4.792v.917a.458.458,0,0,0,.458.458H10.542A.458.458,0,0,0,11-3.875v-.917A.458.458,0,0,0,10.542-5.25Z" transform="translate(0 5.25)" fill="#e8335d"/>' +
                                    '</svg>' +
                                '</a>' +
                                '<p class="number">' +
                                    '01' +
                                '</p>' +
                                '<a href="javascript:void(0);" onClick="return Main.kart();" class="kart">' +
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11">' +
                                        '<path id="plus" d="M10.542-4.417H6.417V-8.542A.458.458,0,0,0,5.958-9H5.042a.458.458,0,0,0-.458.458v4.125H.458A.458.458,0,0,0,0-3.958v.917a.458.458,0,0,0,.458.458H4.583V1.542A.458.458,0,0,0,5.042,2h.917a.458.458,0,0,0,.458-.458V-2.583h4.125A.458.458,0,0,0,11-3.042v-.917A.458.458,0,0,0,10.542-4.417Z" transform="translate(0 9)" fill="#e8335d"/>' +
                                    '</svg>' +
                                '</a>' +
                            '</div>' +
                            '<div class="prices">' +
                                '<p class="old-price">' +
                                    element.oldPrice +
                                '</p>' +
                                '<p class="new-price">' +
                                    element.newPrice +
                                '</p>' +
                            '</div>' +
                        '</div>' +
                    '</li>'
    
                    $('.content-mini-kart > ul').append(productListKart);
    
                  }
    
                  //checa se o carrinho está vazio e atualiza o total de produtos no botão flutuante superior direito do header

                  Main.checkIfEmpty();
      
                  Main.totalInKart();
                });
    
            }
          });
  
        } else {
          
          $.each($('.content-mini-kart ul li'), function(index, item) {
            
            if (($(item).attr('data-id')) === id) {
              
              var numberText = $(item).find('.quantity .number').text();
  
              number = parseInt(numberText) + 1
  
              $(item).find('.quantity .number').text(number)

              //checa se o carrinho está vazio e atualiza o total de produtos no botão flutuante superior direito do header
              Main.checkIfEmpty();
              
              Main.totalInKart();
            }
  
          })
  
        }
  
      }

    }

}

Main.init()
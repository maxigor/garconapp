$('.collection-item').on('click', function(){
   var $badge = $('.badge', this);
   if($badge.length == 0) {
      $badge = $('<span class="badge">0</span>').appendTo(this);
      var novoProduto = this.firstChild.textContent;
   }
   $badge.text(parseInt($badge.text()) +1);
   Materialize.toast(novoProduto + ' adicionado', 1000);

});


$('#confirmar').on('click', function(){
   var texto = '';
   $('.badge').parent().each(function(){
         var produto = this.firstChild.textContent;
         var quantidade = this.lastChild.textContent;
         texto += produto + ': ' + quantidade + ', ';
   });
   $('#resumo').text(texto);
});


$('#qrCode').click(function(){
   cordova.plugins.barcodeScanner.scan(function(resultado){
           if (resultado.text) {
               Materialize.toast('Mesa ' + resultado.text, 2000);
               $('#numeroDaMesa').val(resultado.text);
           }
       },
       function (error) {
           Materialize.toast('Erro: ' + error, 3000, 'red-text');
       }
    );
});

$('.modal-trigger').leanModal();

$('.collection-item').on('click', '.badge' , function(){
   $(this).remove();
   return false;
});

$('.acao-limpar').on('click', function(){
   $('#numeroDaMesa').val('');
   $('.badge').remove();
});


$('#acao-finalizar').on('click', function(){
   $.ajax({
      url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
      data: {
         mesa: $('#numeroDaMesa').val(),
         pedido: $('#resumo').text()
      },
      success: function(resposta){
         Materialize.toast(resposta, 2000);
         navigator.vibrate(3000);
         $('#numeroDaMesa').val('');
         $('.badge').remove();
      },
      error: function(erro){
         Materialize.toast(erro.responseText, 3000, 'red-text');
      }
   });
});

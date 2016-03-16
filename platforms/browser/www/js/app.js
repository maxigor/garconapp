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


$('.modal-trigger').leanModal();



$('.collection-item').on('click', '.badge' , function(){
   $(this).remove();
   return false;
});

$('.acao-limpar').on('click', function(){
   $('#numeroDaMesa').val('');
   $('.badge').remove();
});

Materialize.toast();

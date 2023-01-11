$(function() {
    $(".form").submit(function (event) {
      event.preventDefault();

      // Ссылка, которую получили на этапе публикации приложения
      let appLink = "https://script.google.com/macros/s/AKfycby8LDGjGbzooax8v5Ge9una3rLHAEczUo7MpGSZNX7fP5QV-V8ur1XIwJQON35gCLigLw/exec";
   
      // Сообщение при успешной отправке данных
      let successRespond = 'Заявка отправлена.';
   
      // Сообщение при ошибке в отправке данных
      let errorRespond = 'Не удалось отправить заявку.';
   
      // Id текущей формы
      let form = $('#' + $(this).attr('id'))[0];
      let formRespond = $(this).parent().find('.modal_t') || $('#modal2').find('.modal_t');

      // h2 с ответом формы
    //   let formRespond = $(this).find('.g-form__title_respond');
   
      // h2 с заголовком формы
    //   let formTitle = $(this).find('.g-form__title_main');
   
      // Блок прелоадера
      // let preloader = $(this).find('.g-form__preloader');
   
      // Кнопка отправки формы
      let submitButton = $(this).parent().find('.modal_t') ? $(this).find('.form-submit') : $('.btn_check');
   
   
      // FormData
      let fd = new FormData(form);
   
      $.ajax({
   
        url: appLink,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        beforeSend: function(){
   
        // Показываем прелоадер
        // preloader.css('opacity', '1');
   
        // Делаем неактивной кнопку отправки
        submitButton.prop('disabled', true);
   
        // валидация других полей.
   
      },
   
    }).done(function(res, textStatus, jqXHR) {
   
      if(jqXHR.readyState === 4 && jqXHR.status === 200) {
   
      formRespond.html(successRespond);
      
      if (form.id === 'form2') {
        modal2 = document.querySelector("#modal2");
        modal2.style.display = 'flex';
      }

      // Прячем прелоадер
    //   preloader.css('opacity', '0');
   
      // Выводим ответ формы.
    //   formRespond.html(successRespond).css('color', '#37b599');
       
      // Возвращаем активность кнопке отправки
      submitButton.prop('disabled', false);
   
        // Очищаем поля формы
        form.reset();
   
      } else {
        formRespond.html(errorRespond);

        if (form.id === 'form2') {
          modal2 = document.querySelector("#modal2");
          modal2.style.display = 'flex';
        }

        // preloader.css('opacity', '0');
        // setTimeout( () => {
        //   formRespond.css({
        //     'display': 'none'
        //   });
   
        //   submitButton.prop('disabled', false);
        // }, 5000);
   
        console.log('Гугл не ответил статусом 200');
      }
    }).fail(function(res, textStatus, jqXHR) {
    //   preloader.css('opacity', '0');
      formRespond.html(errorRespond);
      if (form.id === 'form2') {
        modal2 = document.querySelector("#modal2");
        modal2.style.display = 'flex';
      }
      // setTimeout( () => {
      //   formRespond.css({
      //     'display': 'none'
      //   });

      //   submitButton.prop('disabled', false); 
      // }, 5000);
   
      console.log('Не удалось выполнить запрос по указанному в скрипте пути');
    }); 
  });
  }(jQuery));
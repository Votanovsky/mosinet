function gsheetInit() {
    $(".form").submit(function (event) {
      event.preventDefault();
      
      // Сообщение при успешной отправке данных
      let successRespond = 'Заявка принята! Наш менеджер свяжется с вами в ближайшее время';
   
      // Сообщение при ошибке в отправке данных
      let errorRespond = 'Не удалось отправить заявку';
   
      // Id текущей формы
      let form = $('#' + $(this).attr('id'))[0];
      let formRespond = $(this).parent().find('.modal_t') || $('#modal2').find('.modal_t');
      let formLoader = $(this).parent().find('.load-anim') || $('#modal2').find('.load-anim');

      // h2 с ответом формы
    //   let formRespond = $(this).find('.g-form__title_respond');
   
      // h2 с заголовком формы
    //   let formTitle = $(this).find('.g-form__title_main');
   
      // Блок прелоадера
      // let preloader = $(this).find('.g-form__preloader');
   
      // Кнопка отправки формы
      let submitButton = $(this).parent().find('.modal_t') ? $(this).find('.form-submit') : $('.btn_check');
      // Сообщение, отправляемое на закрытый канал в телеграмме в случае, если пользователь успешно отправляет контактные данные
      let telegramText =(form.id==="form1"?"Клиент ожидает обратной связи!":"Клиент хочет проверить возможность подключения!");
      telegramText += window.lastRateName.length ? `Тариф: ${window.lastRateName}\n` : '';
      telegramText += "\n---------------------------------------------";
      
      // FormData
      let fd = new FormData(form);
      for(const [key,value] of fd.entries())
        telegramText+=`\n${key}: ${value}`;
      fd.append('telegramText', telegramText);
      fd.append('rateName', window.lastRateName);

      $.ajax({
        url: '/submit.php',
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        beforeSend: function(){
   
        // Делаем неактивной кнопку отправки
        submitButton.prop('disabled', true);
        formRespond[0].style.display = 'none';
        formLoader[0].style.display = 'block';
        if (form.id === 'form2') {
          modal2 = document.querySelector("#modal2");
          modal2.style.display = 'flex';
        }
   
        // валидация других полей.
   
      },
   
    }).done(function(res, textStatus, jqXHR) {
      if (jqXHR.readyState === 4 && jqXHR.status === 200) {
        formRespond.html(successRespond);
        formRespond[0].style.color = '';
        
        formLoader[0].style.display = 'none';
        formRespond[0].style.display = 'block';

        // Прячем прелоадер
        //   preloader.css('opacity', '0');
    
        // Выводим ответ формы.
        //   formRespond.html(successRespond).css('color', '#37b599');
        
        // Возвращаем активность кнопке отправки
        submitButton.prop('disabled', false);
   
        // Очищаем поля формы
        form.reset();
      } 
      else {
        formRespond.html(errorRespond);
        
        formLoader[0].style.display = 'none';
        formRespond[0].style.display = 'block';
        // if (form.id === 'form2') {
        //   modal2 = document.querySelector("#modal2");
        //   modal2.style.display = 'flex';
        // }

        // preloader.css('opacity', '0');
        // setTimeout( () => {
        //   formRespond.css({
        //     'display': 'none'
        //   });
   
        submitButton.prop('disabled', false);
        // }, 5000);
   
        // console.log('Гугл не ответил статусом 200');
      }
    }).fail(function(jqXHR, textStatus, errorThrown) {
      //   preloader.css('opacity', '0');
      if (jqXHR.status === 429) {
        formRespond.html("Вы отправили слишком много запросов.<br>Пожалуйста, попробуйте завтра или свяжитесь с нами по телефону");
      }
      else {
        formRespond.html(errorRespond);
      }
      formRespond[0].style.color = '#E43931';
      
      formLoader[0].style.display = 'none';
      formRespond[0].style.display = 'block';
      // if (form.id === 'form2') {
      //   modal2 = document.querySelector("#modal2");
      //   modal2.style.display = 'flex';
      // }
      // setTimeout( () => {
      //   formRespond.css({
      //     'display': 'none'
      //   });

      submitButton.prop('disabled', false); 
      // }, 5000);
   
      // console.log('Не удалось выполнить запрос по указанному в скрипте пути');
    }); 
  });
};

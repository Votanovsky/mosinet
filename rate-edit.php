<?php 
    session_start();
    if (isset($_POST['user']) && isset($_POST['password'])) {
        $_SESSION['user'] = $_POST['user'];
        $_SESSION['password'] = $_POST['password'];
    }
    if (!isset($_SESSION['user']) || !isset($_SESSION['password'])) {
        header('Location: login.php');
        exit();
    }
    if ($_SESSION['user'] == 'mosinet' && $_SESSION['password'] == '_Mos1234provideR_'):
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MosProvider Rates</title>

    <meta name="description" content="Подключить домашний интернет от популярных интернет провайдеров по Москве и МО! Бесплатное подключение интернета и TV. Ежедневно с 9:00 до 23:00.">
    
    <link rel="apple-touch-icon" sizes="180x180" href="media/fav/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="media/fav/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="media/fav/favicon-16x16.png">
    <link rel="manifest" href="media/fav/site.webmanifest">
    <link rel="mask-icon" href="media/fav/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js" integrity="sha512-gmwBmiTVER57N3jYS3LinA9eb8aHrJua5iQD7yqYCKa5x6Jjc7VDVaEA0je0Lu0bP9j7tEjV3+1qUm6loO99Kw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js" integrity="sha512-tHvUcUQYi35zApvAa5TNR3fNhBQkVtkmWKfacnpxmix4/VTGz1lGjIVyLMp7gLgAvg+aKJjnVKokXJNS5GZ+/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="https://unpkg.com/split-type"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>

    <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>

    <script src="https://unpkg.com/@barba/core"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    
    <link rel="stylesheet" href="//unpkg.com/grapesjs/dist/css/grapes.min.css">
    <script src="//unpkg.com/grapesjs"></script>
    
    <link rel="stylesheet" href="grapes.css">
    <script defer src = "grapes.js"></script>
</head>

<body data-barba="wrapper">

    <div class="panel__top">
        <div class="panel__basic-actions"></div>
        <div class="panel__switcher"></div>
    </div>

    <div class="editor-row">
        <div class="editor-canvas">
            <div id="container">
                <?php 
                    $doc = new DOMDocument('1.0', 'UTF-8');
                    libxml_use_internal_errors(true);
                    $file = file_get_contents('rate.html');
                    // $file = mb_convert_encoding($file, 'HTML-ENTITIES', 'UTF-8');
                    $doc->loadHTML($file);
                    libxml_clear_errors();
                    $body = $doc->saveHTML($doc->getElementsByTagName('body')[0]);
                    echo $body;
                ?>
            </div>
        </div>

        <div class="panel__right">
            <div class="layers-container"></div>
            <div class="styles-container"></div>
        </div>
    </div>
    <!-- <div id="blocks"></div> -->

</body>
</html>

<?php else:
    header('Location: login.php');
    exit();
endif;?>
<?php
    error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE);
    $form_name = $_POST['Имя'];
    $form_phone = $_POST['Телефон'];
    $form_street = $_POST['Улица'];
    $form_building = $_POST['Дом'];
    $rate_name = $_POST['lastRateName'];
    $user_ip = $_SERVER['REMOTE_ADDR'];

    // DATABASE CHECK

    $link = mysqli_connect("localhost", "admin", "adc82b9faed0c5fd");

    if ($link == false){
        echo json_encode(['response' => 'connection failure']);
    }
    else {
        mysqli_select_db($link, 'mosinet');

        $select = 'SELECT IP FROM orders WHERE IP = "'.$user_ip.'"';
        if ($result = mysqli_query($link, $select)) {
            if (mysqli_num_rows($result) >= 3) {
                http_response_code(429);
                echo json_encode(['response' => 'Too many requests']);
                exit;
            }
        }
    }

    // GOOGLE SHEETS

    // $req_url = 'https://script.google.com/macros/s/AKfycby38S2GxEIonhU9wpM4NX-qg02l64PShI5eGinR8zwbU4U6c1hl8uUb5mav0yO53BsWhg/exec';
    $req_url = 'https://script.google.com/macros/s/AKfycbxKsrWkixOejjdAcBABpufn1Ls7zHPgVQvIAa6R9xgYyFdiCLm4XAnXnpJT_WAOO__uuw/exec';
    $body = ['name' => $form_name, 'phone' => $form_phone, 'ip' => $user_ip];
    if (isset($form_street)) {
        $body['street'] = $form_street;
    }
    if (isset($form_building)) {
        $body['building'] = $form_building;
    }
    if (isset($rate_name)) {
        $body['rate_name'] = $rate_name;
    }
    $ch = curl_init($req_url);
    $payload = json_encode($body);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    trigger_error($response);

    if ($response !== false) {
        echo json_encode(['body' => $payload, 'response' => $response]);
    }
    else {
        echo json_encode(['response' => 'failure']);
    }
    
    // DATABASE WRITE REQUEST
    
    $insert = 'INSERT INTO orders (name, phone, street, building, IP) VALUES ("'.$form_name.'", "'.$form_phone.'", "'.$form_street.'", "'.$form_building.'", "'.$user_ip.'")';
    $result = mysqli_query($link, $insert);
    // if ($result === false) {
    //     http_response_code(500);
    //     echo json_encode(['response' => 'SQL Error']);
    //     exit;
    // }

    // TELEGRAM BOT

    $telegramText = $_POST['telegramText'];
    $telegramBotAPIKey = '5921150643:AAFRXdcLnRz_eJRwdlnrdK5BlzU67i6lnLA';
    $telegramAPIURL = 'https://api.telegram.org/bot'.$telegramBotAPIKey.'/sendMessage';
    $telegramBotRequestBody = [
        'chat_id' => -1001874196244,
        'text' => $telegramText
    ];

    $ch = curl_init($telegramAPIURL);
    $payload = json_encode($telegramBotRequestBody);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    $response = curl_exec($ch);
    curl_close($ch);

    echo json_encode(['tg_response' => $response]);

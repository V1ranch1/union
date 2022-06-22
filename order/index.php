<?php
    define('DEV', $_SERVER['HTTP_HOST'] === 'localhost:8888');

    if (
        $_SERVER['HTTP_HOST'] !== (DEV ? 'localhost:8888' : 'unionvariators.ru') ||
        $_SERVER['REQUEST_METHOD'] !== 'POST'
    ) {
        die('Unauthorized access');
    }

    $formName = isset($_POST['name']) && $_POST['name'] ? $_POST['name'] : 'Не указано';
    $formPhone = isset($_POST['phone']) && $_POST['phone'] ? $_POST['phone'] : 'Не указано';
    $formEmail = isset($_POST['email']) && $_POST['email'] ? $_POST['email'] : 'Не указано';
    $formDate = isset($_POST['date']) && $_POST['date'] ? $_POST['date'] : 'Не указано';
    $formTime = isset($_POST['time']) && $_POST['time'] ? $_POST['time'] : 'Не указано';
    $formComment = isset($_POST['comment']) && $_POST['comment'] ? $_POST['comment'] : 'Не указано';

    $mailHeaders = "Content-type: text/plain; charset=UTF-8\r\n";
    $mailHeaders .= "From: <noreply@unionvariators.ru>\r\n";
    $mailHeaders .= "X-Mailer: PHP/" . phpversion();

    $mailContent = "";
    $mailContent .= "Имя: {$formName}\r\n";
    $mailContent .= "Телефон: {$formPhone}\r\n";
    $mailContent .= "Почта: {$formEmail}\r\n";
    $mailContent .= "Дата: {$formDate}\r\n";
    $mailContent .= "Время: {$formTime}\r\n";
    $mailContent .= "Комментарий: {$formComment}";

    mail("order@unionvariators.ru", "Заявка от {$formName} " . date("d-m-Y"), $mailContent, $mailHeaders);

    header('Content-type: application/json; charset=UTF-8');
    echo json_encode(['response' => true]);
?>

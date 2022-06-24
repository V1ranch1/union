<?php
    define('DEV', $_SERVER['HTTP_HOST'] === 'localhost:8888');

    if (DEV) {
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
    }

    $url = explode('?', substr($_SERVER['REQUEST_URI'], 1))[0];
    $pages = [
        '' => [
            'page' => 'main',
            'title' => 'Ремонт вариаторов JATCO',
        ],
        '404' => [
            'page' => '404',
            'title' => 'Ошибка 404',
        ],
        'terms' => [
            'page' => 'terms',
            'title' => 'Условия использования',
        ],
    ];

    if (!isset($pages[$url])) {
        $url = '404';
        http_response_code(404);
    }

    $page = $pages[$url]['page'];
    $title = $pages[$url]['title'];

    ob_start();
    require_once("pages/{$page}.php");
    $content = ob_get_clean();

    header('Content-type: text/html; charset=UTF-8');

    require_once('templates/main.php');
?>

<?php

$filepath = '../con/database.php';
$filepath1 = '../mod/get.php';
if (file_exists(stream_resolve_include_path($filepath))) {
    include_once $filepath;
    include_once $filepath1;
}
$database = new Database();
$db = $database->getConnection();
$game = new Game($db);
$results = $game->read()->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);

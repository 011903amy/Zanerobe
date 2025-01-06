<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../models/clothe/Clothe.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clothe = new Clothe($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $clothe->clothe_start = $_GET['start'];
        $clothe->clothe_total = 11;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($clothe->clothe_start, $clothe->clothe_total);

        $total_result = checkReadAll($clothe);
        $query = checkReadLimit($clothe);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $clothe->clothe_total,
            $clothe->clothe_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
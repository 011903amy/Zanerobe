<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/clothe/Clothe.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clothe = new Clothe($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);

    $clothe->clothe_search = $data['searchValue'];
    
    http_response_code(200);
    if($data['isFilter']){
        $clothe->clothe_is_active = checkIndex($data ,'statusFilter') ;
        if($clothe->clothe_search != ''){
            $query = checkFilterActiveSearch($clothe);
            getQueriedData($query);
        }
        $query = checkFilterActive($clothe);
        getQueriedData($query);
    }

    $query = checkSearch($clothe);
    getQueriedData($query);

    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

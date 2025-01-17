<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../models/clothe/Clothe.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clothe = new Clothe($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
$error = [];
$returnData = [];
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  checkApiKey();
  if (array_key_exists("clotheid", $_GET)) {
    // check data
    checkPayload($data);
    $clothe->clothe_aid = $_GET['clotheid'];
    $clothe->clothe_is_active = trim($data["isActive"]);
    
    checkId($clothe->clothe_aid);
    $query = checkActive($clothe);
    http_response_code(200);
    returnSuccess($clothe, "clothe", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();

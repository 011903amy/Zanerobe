<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clothe = new Clothe($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("clotheid", $_GET)) {
  $clothe->clothe_aid = $_GET['clotheid'];
  checkId($clothe->clothe_aid);
  $query = checkReadById($clothe);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($clothe);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
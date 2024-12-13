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
  // get data
  $clothe->clothe_aid = $_GET['clotheid'];
  checkId($clothe->clothe_aid);
  

  $query = checkDelete($clothe);

  returnSuccess($clothe, "clothe", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
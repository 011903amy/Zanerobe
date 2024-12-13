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
  // check data
  checkPayload($data);
  // get data
  $clothe->clothe_aid = $_GET['clotheid'];
  $clothe->clothe_image = checkIndex($data, "clothe_image");
  $clothe->clothe_image1 = checkIndex($data, "clothe_image1");
  $clothe->clothe_title = checkIndex($data, "clothe_title");
  $clothe->clothe_price = checkIndex($data, "clothe_price");
  $clothe->clothe_category_id = checkIndex($data, "clothe_category_id");
  $clothe->clothe_size = checkIndex($data, "clothe_size");
  $clothe->clothe_created = date("Y-m-d H:i:s");
  $clothe->clothe_datetime = date("Y-m-d H:i:s");
  checkId($clothe->clothe_aid);

//checks current data to avoid same entries from being updated
// $clothe_title_old = checkIndex($data, 'clothe_title_old');
// compareTitle($clothe, $clothe_title_old, $clothe->clothe_title);
// checkId($clothe->clothe_aid);

  // update
  $query = checkUpdate($clothe);
  returnSuccess($clothe, "clothe", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
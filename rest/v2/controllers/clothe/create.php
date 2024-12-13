<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$clothe = new Clothe($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$clothe->clothe_is_active = 1;
$clothe->clothe_image = checkIndex($data, "clothe_image");
$clothe->clothe_image1 = checkIndex($data, "clothe_image1");
$clothe->clothe_title = checkIndex($data, "clothe_title");
$clothe->clothe_price = checkIndex($data, "clothe_price");
$clothe->clothe_category_id = checkIndex($data, "clothe_category_id");
$clothe->clothe_size = checkIndex($data, "clothe_size");
$clothe->clothe_created = date("Y-m-d H:i:s");
$clothe->clothe_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
// isNameExist($clothe, $clothe->clothe_name);


$query = checkCreate($clothe);

returnSuccess($clothe, "clothe", $query);

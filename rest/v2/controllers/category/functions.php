<?php
// Read active
function checkFilterActive($object)
{
  $query = $object->filterActive();
  checkQuery($query, "Empty records. (active read active)");
  return $query;
}
// Read active search
function checkFilterActiveSearch($object)
{
  $query = $object->filterActiveSearch();
  checkQuery($query, "Empty records. (active read active search)");
  return $query;
}
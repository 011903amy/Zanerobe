<?php

class Clothe
{
  public $clothe_aid;
  public $clothe_is_active;
  public $clothe_image;
  public $clothe_image1;
  public $clothe_title;
  public $clothe_price;
  public $clothe_category_id;
  public $clothe_size;
  public $clothe_datetime;
  public $clothe_created;

  public $category_aid;
  public $category_is_active;
  public $category_image;
  public $category_title;
  public $category_datetime;
  public $category_created;

  public $connection;
  public $lastInsertedId;
  public $clothe_start;
  public $clothe_total;
  public $clothe_search;

  public $tblclothe;
  public $tblcategory;

  public function __construct($db)
  {
    $this->connection = $db;
    $this->tblclothe = "clothe";
    $this->tblcategory = "category";
  }

  public function readAll()
  {
    try {
      $sql = "select * ";
      $sql .= "from ";
      $sql .= "{$this->tblcategory} as category, ";
      $sql .= "{$this->tblclothe} as clothe ";
      $sql .= "where category.category_aid = clothe.clothe_category_id ";
      $sql .= "order by clothe.clothe_is_active desc, ";
      $sql .= "clothe.clothe_title asc ";
      $query = $this->connection->query($sql);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
  public function readAllByCategory()
  {
    try {
      $sql = "select * ";
      $sql .= "from ";
      $sql .= "{$this->tblcategory} as category, ";
      $sql .= "{$this->tblclothe} as clothe ";
      $sql .= "where category.category_aid = clothe.clothe_category_id ";
      $sql .= "order by clothe.clothe_is_active desc, ";
      $sql .= "clothe.clothe_title asc ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "clothe_category_id" => $this->clothe_category_id,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function readLimit()
  {
    try {
      $sql = "select * ";
      $sql .= "from ";
      $sql .= "{$this->tblcategory} as category, ";
      $sql .= "{$this->tblclothe} as clothe ";
      $sql .= "where category.category_aid = clothe.clothe_category_id ";
      $sql .= "order by clothe.clothe_is_active desc, ";
      $sql .= "clothe.clothe_title asc ";
      $sql .= "limit :start, ";
      $sql .= ":total ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "start" => $this->clothe_start - 1,
        "total" => $this->clothe_total,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
  public function search()
  {
    try {
      $sql = "select * ";
      $sql .= "from ";
      $sql .= "{$this->tblcategory} as category, ";
      $sql .= "{$this->tblclothe} as clothe ";
      $sql .= "where clothe.clothe_title like :clothe_title ";
      $sql .= "and category.category_aid = clothe.clothe_category_id ";
      $sql .= "order by clothe.clothe_is_active desc ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "clothe_title" => "%{$this->clothe_search}%",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
  public function filterActive()
  {
    try {
      $sql = "select * ";
      $sql .= "from ";
      $sql .= "{$this->tblcategory} as category, ";
      $sql .= "{$this->tblclothe} as clothe ";
      $sql .= "where clothe.clothe_title like :clothe_title ";
      $sql .= "and category.category_aid = clothe.clothe_category_id ";
      $sql .= "order by clothe.clothe_is_active desc, ";
      $sql .= "clothe_title ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "clothe_is_active" => $this->clothe_is_active,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
  public function filterActiveSearch()
  {
    try {
      $sql = "select * from {$this->tblclothe} ";
      $sql .= "where clothe_is_active = :clothe_is_active ";
      $sql .= "and clothe_title like :clothe_title ";
      $sql .= "order by clothe_is_active desc, ";
      $sql .= "clothe_title ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "clothe_is_active" => $this->clothe_is_active,
        "clothe_title" => "%{$this->clothe_search}%",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
  public function readById()
  {
    try {
      $sql = "select * from {$this->tblclothe} ";
      $sql .= "where clothe_aid = :clothe_aid ";
      $sql .= "order by clothe_is_active desc ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "clothe_aid" => $this->clothe_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function create()
  {
    try {
      $sql = "insert into {$this->tblclothe} ";
      $sql .= "(clothe_is_active, ";
      $sql .= "clothe_image, ";
      $sql .= "clothe_image1, ";
      $sql .= "clothe_title, ";
      $sql .= "clothe_price, ";
      $sql .= "clothe_category_id, ";
      $sql .= "clothe_size, ";
      $sql .= "clothe_created, ";
      $sql .= "clothe_datetime ) values ( ";
      $sql .= ":clothe_is_active, ";
      $sql .= ":clothe_image, ";
      $sql .= ":clothe_image1, ";
      $sql .= ":clothe_title, ";
      $sql .= ":clothe_price, ";
      $sql .= ":clothe_category_id, ";
      $sql .= ":clothe_size, ";
      $sql .= ":clothe_created, ";
      $sql .= ":clothe_datetime ) ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "clothe_is_active" => $this->clothe_is_active,
        "clothe_image" => $this->clothe_image,
        "clothe_image1" => $this->clothe_image1,
        "clothe_title" => $this->clothe_title,
        "clothe_price" => $this->clothe_price,
        "clothe_category_id" => $this->clothe_category_id,
        "clothe_size" => $this->clothe_size,
        "clothe_created" => $this->clothe_created,
        "clothe_datetime" => $this->clothe_datetime,

      ]);
      $this->lastInsertedId = $this->connection->lastInsertId();
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function checkName()
  {
    try {
      $sql = "select category_title from {$this->tblcategory} ";
      $sql .= "where category_title = :category_title ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "category_title" => "{$this->category_title}",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function update()
  {
    try {
      $sql = "update {$this->tblclothe} set ";
      $sql .= "clothe_image = :clothe_image, ";
      $sql .= "clothe_image1 = :clothe_image1, ";
      $sql .= "clothe_title = :clothe_title, ";
      $sql .= "clothe_price = :clothe_price, ";
      $sql .= "clothe_category_id = :clothe_category_id, ";
      $sql .= "clothe_size = :clothe_size, ";
      $sql .= "clothe_datetime = :clothe_datetime ";
      $sql .= "where clothe_aid  = :clothe_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "clothe_image" => $this->clothe_image,
        "clothe_image1" => $this->clothe_image1,
        "clothe_title" => $this->clothe_title,
        "clothe_price" => $this->clothe_price,
        "clothe_category_id" => $this->clothe_category_id,
        "clothe_size" => $this->clothe_size,
        "clothe_datetime" => $this->clothe_datetime,
        "clothe_aid" => $this->clothe_aid
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function delete()
  {
    try {
      $sql = "delete from {$this->tblclothe} ";
      $sql .= "where clothe_aid = :clothe_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "clothe_aid" => $this->clothe_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function active()
  {
    try {
      $sql = "update {$this->tblclothe} set ";
      $sql .= "clothe_is_active = :clothe_is_active, ";
      $sql .= "clothe_datetime = :clothe_datetime ";
      $sql .= "where clothe_aid  = :clothe_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "clothe_is_active" => $this->clothe_is_active,
        "clothe_datetime" => $this->clothe_datetime,
        "clothe_aid" => $this->clothe_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
}

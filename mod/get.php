<?php

class Game
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        $query = 'SELECT * FROM questions ORDER BY ID DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}

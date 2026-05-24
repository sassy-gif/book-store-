<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Include database
include_once '../config/database.php';

// Instantiate DB
$database = new Database();
$db = $database->getConnection();

// Query
$query = "SELECT * FROM books ORDER BY id";
$stmt = $db->prepare($query);
$stmt->execute();

$books = [];

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $books[] = [
        'id' => (int)$row['id'],
        'title' => $row['title'],
        'author' => $row['author'],
        'price' => (float)$row['price'],
        'category' => $row['category'],
        'image' => $row['image'],
        'description' => $row['description']
    ];
}

echo json_encode($books);
?>

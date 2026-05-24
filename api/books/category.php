<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Include database
include_once '../config/database.php';

// Get category parameter
$category = isset($_GET['name']) ? $_GET['name'] : 'all';

// Instantiate DB
$database = new Database();
$db = $database->getConnection();

// Query based on category
if ($category === 'all') {
    $query = "SELECT * FROM books ORDER BY id";
    $stmt = $db->prepare($query);
} else {
    $query = "SELECT * FROM books WHERE category = :category ORDER BY id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':category', $category);
}

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

<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Include database
include_once '../config/database.php';

// Get search query
$searchQuery = isset($_GET['q']) ? $_GET['q'] : '';

// Instantiate DB
$database = new Database();
$db = $database->getConnection();

// Query with LIKE for title, author, and description
$query = "SELECT * FROM books WHERE
          LOWER(title) LIKE LOWER(:search) OR
          LOWER(author) LIKE LOWER(:search) OR
          LOWER(description) LIKE LOWER(:search)
          ORDER BY id";

$stmt = $db->prepare($query);
$searchParam = '%' . $searchQuery . '%';
$stmt->bindParam(':search', $searchParam);
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

<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Include database
include_once '../config/database.php';

// Check for ID parameter
if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'Book ID is required']);
    exit;
}

$id = (int)$_GET['id'];

// Instantiate DB
$database = new Database();
$db = $database->getConnection();

// Query
$query = "SELECT * FROM books WHERE id = :id LIMIT 1";
$stmt = $db->prepare($query);
$stmt->bindParam(':id', $id);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $book = [
        'id' => (int)$row['id'],
        'title' => $row['title'],
        'author' => $row['author'],
        'price' => (float)$row['price'],
        'category' => $row['category'],
        'image' => $row['image'],
        'description' => $row['description']
    ];
    echo json_encode($book);
} else {
    echo json_encode(['error' => 'Book not found']);
}
?>

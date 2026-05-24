<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Start session for cart tracking
session_start();
$session_id = session_id();

// Include database
include_once '../config/database.php';

// Instantiate DB
$database = new Database();
$db = $database->getConnection();

// Query cart items with book details
$query = "SELECT c.id as cart_id, c.quantity, b.id, b.title, b.author, b.price, b.image
          FROM cart_items c
          JOIN books b ON c.book_id = b.id
          WHERE c.session_id = :session_id
          ORDER BY c.created_at";

$stmt = $db->prepare($query);
$stmt->bindParam(':session_id', $session_id);
$stmt->execute();

$cart = [];

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $cart[] = [
        'id' => (int)$row['id'],
        'title' => $row['title'],
        'author' => $row['author'],
        'price' => (float)$row['price'],
        'image' => $row['image'],
        'quantity' => (int)$row['quantity']
    ];
}

echo json_encode($cart);
?>

<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Start session
session_start();
$session_id = session_id();

// Include database
include_once '../config/database.php';

// Get posted data
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->bookId)) {
    echo json_encode(['error' => 'Book ID is required']);
    exit;
}

$book_id = (int)$data->bookId;

// Instantiate DB
$database = new Database();
$db = $database->getConnection();

// Delete item from cart
$query = "DELETE FROM cart_items WHERE session_id = :session_id AND book_id = :book_id";
$stmt = $db->prepare($query);
$stmt->bindParam(':session_id', $session_id);
$stmt->bindParam(':book_id', $book_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Item removed from cart']);
} else {
    echo json_encode(['error' => 'Failed to remove item']);
}
?>

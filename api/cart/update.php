<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT, POST');
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

if (!isset($data->bookId) || !isset($data->quantity)) {
    echo json_encode(['error' => 'Book ID and quantity are required']);
    exit;
}

$book_id = (int)$data->bookId;
$quantity = (int)$data->quantity;

// Validate quantity
if ($quantity < 1) {
    echo json_encode(['error' => 'Quantity must be at least 1']);
    exit;
}

// Instantiate DB
$database = new Database();
$db = $database->getConnection();

// Update quantity
$query = "UPDATE cart_items SET quantity = :quantity
          WHERE session_id = :session_id AND book_id = :book_id";
$stmt = $db->prepare($query);
$stmt->bindParam(':quantity', $quantity);
$stmt->bindParam(':session_id', $session_id);
$stmt->bindParam(':book_id', $book_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Quantity updated']);
} else {
    echo json_encode(['error' => 'Failed to update quantity']);
}
?>

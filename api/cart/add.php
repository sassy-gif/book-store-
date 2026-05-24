<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
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

// Check if book exists
$checkBook = "SELECT id FROM books WHERE id = :book_id";
$stmtCheck = $db->prepare($checkBook);
$stmtCheck->bindParam(':book_id', $book_id);
$stmtCheck->execute();

if ($stmtCheck->rowCount() === 0) {
    echo json_encode(['error' => 'Book not found']);
    exit;
}

// Check if item already in cart
$checkCart = "SELECT id, quantity FROM cart_items WHERE session_id = :session_id AND book_id = :book_id";
$stmtCart = $db->prepare($checkCart);
$stmtCart->bindParam(':session_id', $session_id);
$stmtCart->bindParam(':book_id', $book_id);
$stmtCart->execute();

if ($stmtCart->rowCount() > 0) {
    // Update quantity
    $row = $stmtCart->fetch(PDO::FETCH_ASSOC);
    $newQty = $row['quantity'] + 1;
    $updateQuery = "UPDATE cart_items SET quantity = :quantity WHERE id = :id";
    $stmtUpdate = $db->prepare($updateQuery);
    $stmtUpdate->bindParam(':quantity', $newQty);
    $stmtUpdate->bindParam(':id', $row['id']);
    $stmtUpdate->execute();
} else {
    // Insert new item
    $insertQuery = "INSERT INTO cart_items (session_id, book_id, quantity) VALUES (:session_id, :book_id, 1)";
    $stmtInsert = $db->prepare($insertQuery);
    $stmtInsert->bindParam(':session_id', $session_id);
    $stmtInsert->bindParam(':book_id', $book_id);
    $stmtInsert->execute();
}

echo json_encode(['success' => true, 'message' => 'Book added to cart']);
?>

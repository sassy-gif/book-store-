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

// Instantiate DB
$database = new Database();
$db = $database->getConnection();

// Delete all items for this session
$query = "DELETE FROM cart_items WHERE session_id = :session_id";
$stmt = $db->prepare($query);
$stmt->bindParam(':session_id', $session_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Cart cleared']);
} else {
    echo json_encode(['error' => 'Failed to clear cart']);
}
?>

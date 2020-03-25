<?php

include_once __DIR__ . '/connectionDAO.php';
include __DIR__ . '/../DataTransferObject/UserDTO.php';

$connectDB = new ConnectionDAO();
$dbh = $connectDB->mysql();

$user = new UserDTO();

$data = null;

$_POST = json_decode(file_get_contents("php://input"), true);

$option = (isset($_POST['option'])) ? $_POST['option'] : '';
$user->setId((isset($_POST['id'])) ? $_POST['id'] : '');
$user->setName((isset($_POST['name'])) ? $_POST['name'] : '');
$user->setEmail((isset($_POST['email'])) ? $_POST['email'] : '');

switch($option)
{
    case 1:
        //Create
        $query = "INSERT INTO users (name, email) VALUES (:name, :email)";
        $statement = $dbh->prepare($query);
        $statement->bindParam(':name', $user->getName());
        $statement->bindParam(':email', $user->getEmail());
        $statement->execute();
    break;
    case 2:
        //Read
        $query = "SELECT id, name, email FROM users";
        $statement = $dbh->prepare($query);
        $statement->execute();
        $data = $statement->fetchAll(PDO::FETCH_ASSOC);
    break;
    case 3:
        //Update
        $query = "UPDATE users SET name = :name, email = :email WHERE id = :id";
        $statement = $dbh->prepare($query);
        $statement->bindParam(':id', $user->getId());
        $statement->bindParam(':name', $user->getName());
        $statement->bindParam(':email', $user->getEmail());
        $statement->execute();
        $data = $statement->fetchAll(PDO::FETCH_ASSOC);
    break;
    case 4:
        //Delete
        $query = "DELETE FROM users WHERE id = :id";
        $statement = $dbh->prepare($query);
        $statement->bindParam(':id', $user->getId());
        $statement->execute();
    break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$dbh = null;
<?php

class UserDTO
{     
    private $id, $name, $email;

    public function getId() { return $this->id; }
    public function setId($id){ $this->id = $id; }
    public function getName() { return $this->name; }
    public function setName($name){ $this->name = $name; }
    public function getEmail() { return $this->email; }
    public function setEmail($email){ $this->email = $email; }
}
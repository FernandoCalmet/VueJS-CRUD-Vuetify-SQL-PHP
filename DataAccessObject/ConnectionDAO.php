<?php

class ConnectionDAO
{
    public static function mysql()
    {     
        $host = 'localhost';
        $dbname = 'vuetify_db';
        $user = 'root';
        $password = 'root';
   
        try 
        {
            $dsn = "mysql:host=$host;dbname=$dbname";
            $dbh = new PDO($dsn, $user, $password);
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $dbh;
        } 
        catch (PDOException $e)
        {
            echo $e->getMessage();
        }        
    }
}
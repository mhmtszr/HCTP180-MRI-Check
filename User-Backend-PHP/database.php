<?
/**
PDO ile güvenli bir şekilde veritabanına bağlanıldı ve bağlantı db değişkeni olarak anılacak.
**/
try {
     $db = new PDO("mysql:host=localhost;dbname=db_name", "db_username", "dbpass");
} catch ( PDOException $e ){
     print $e->getMessage();
}

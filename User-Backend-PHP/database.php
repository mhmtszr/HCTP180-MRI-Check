<?
/**
PDO ile güvenli bir şekilde veritabanına bağlanıldı ve bağlantı db değişkeni olarak anılacak.
**/
date_default_timezone_set('Europe/Istanbul'); //Default timezone Istanbul ayarlandı.
try {
     $db = new PDO("mysql:host=localhost;dbname=db_name", "db_username", "dbpass");
} catch ( PDOException $e ){
     print $e->getMessage();
}

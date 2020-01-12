<?
//12 Ocak 2020 HCTP180 Çalgan Aygün

require_once('database.php'); // Veritabanı bağlantısı.
include('logincheck.php'); // Token kontrolü için güvenlik fonksiyonlarını içeren dosya.

//Gelen POST verileri değişkenlere aktarıldı.
$token = $_POST["token"];
$userid = $_POST["userid"];

if(checkToken($token, $userid)){ // Token kontrol edildi doğruysa işleme başlandı.
	$query = $db->query("SELECT * FROM lastanalyzes WHERE userid = '{$userid}'", PDO::FETCH_ASSOC); //İstenen userid için kayıtlar getirildi.
	if ($query->rowCount()){
	     echo json_encode($query->fetchAll(), JSON_PRETTY_PRINT); //Gelen kayıt sayısı 0'dan büyükse JSON olarak veri döndü.
	}
}else{// Geçersiz istek gönderildi. Bu yüzden 400 kodu döndürüldü.
	http_response_code(400);
	die;
}
$db = null;

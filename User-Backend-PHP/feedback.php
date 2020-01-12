<?
//12 Ocak 2020 HCTP180 Çalgan Aygün

require_once('database.php'); // Veritabanı bağlantısı.
include('logincheck.php'); // Token kontrolü için güvenlik fonksiyonlarını içeren dosya.

//Gelen veriler değişkenlere atandı.
$token = $_POST["token"];
$userid = $_POST["userid"];
$analyzeid = $_POST["analyzeid"];


if(checkToken($token, $userid)){// Token kontrol edildi doğruysa işleme başlandı.
	$query = $db->prepare("UPDATE lastanalyzes SET
	checked = 1
	WHERE id = :id"); // SQL Injection saldırılarına karşı önce sorgu hazırlandı.
	$update = $query->execute(array(
    "id" => $analyzeid,
	)); // Verilen değişkenlerle sorgu çalıştırıldı.
	if ($update){ //Sorgu'nun başarılı olup olamdığı kontrol edildi. Sonuca göre JSON çıktı verildi.
		$outJson = json_encode(array("status" => "success"), JSON_PRETTY_PRINT);
		echo $outJson;
	}else{
		$outJson = json_encode(array("status" => "fail"), JSON_PRETTY_PRINT);
		echo $outJson;
	}
}else{
	http_response_code(400); // Geçersiz istek gönderildi. Bu yüzden 400 kodu döndürüldü.
	die;
}
$db = null;
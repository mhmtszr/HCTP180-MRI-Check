<?
//12 Ocak 2020 HCTP180 Çalgan Aygün

require_once('database.php'); // Veritabanı bilgileri içeri alındı.

$phone =  $_POST["phone"]; //Gelen telefon numarasını aldık.
$pass =  $_POST["pass"]; //SHA512 olrak gelen şifreyi aldık.
$time = time(); //UNIX Zaman Damgasını aldık.
$tokenKillingTimeStamp = time()+3500000; //Token'in son kullanım zmanını belirledik.

$query = $db->query("SELECT * FROM users WHERE phone = '{$phone}' AND pass = '{$pass}'")->fetch(PDO::FETCH_ASSOC); // Veritabanından istenen isteği kontrol ettik.
if ($query){
    $token = hash('sha256', $phone."ODTUIEE<3".$time."<3".$pass."ODTUDSC<3"); //User Token oluşturduk.
    $returnArray = $query; //query Array'ını kopyaladık.
    unset($returnArray["pass"]); // Kopyalanmış Array'dan şifre hash'ini çıkardık.
    $returnArray["token"] = $token; // Array'e toke'i ekledik.
	echo json_encode($returnArray, JSON_PRETTY_PRINT)."\n"; //Json olarak kodlayıp ekrana bastık.
	$query = $db->prepare("INSERT INTO `utokens` (`id`, `usertoken`, `userid`, `lasttime`) VALUES (NULL, ?, ?, ?)"); //Kaydedilecek token'in SQL sorgusu hazırlandı.
	$insert = $query->execute(array($token, $returnArray["id"], $tokenKillingTimeStamp)); //Sorgu değişkenlerle çalıştırıldı.
}else{// Geçersiz istek gönderildi. Bu yüzden 400 kodu döndürüldü.
	http_response_code(400);
}
$db = null;

/**
Parola Man-in-middle saldırılarına karşı hash olarak gönderildi. Hash sorgulandı. Doğru ise token atandı ve token veritabanına bitiş tarihiyle birlikte kaydedildi.
Hash'in kolay çözülemez olması için araya çeşitli yazı parçaları eklendi.
**/

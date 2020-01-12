<?
//12 Ocak 2020 HCTP180 Çalgan Aygün


require_once('database.php');// Veritabanı bağlantılarımızı ve SQL Injection korumalarıızı alıyoruz.

$utoken = $_POST["token"]; //Gelen token post'unu aldık.

$query = $db->query("SELECT * FROM utokens WHERE usertoken = '{$utoken}'")->fetch(PDO::FETCH_ASSOC); //Veritabanı sorgulamamızı yaptık.
if($query){
	$query = $db->prepare("DELETE FROM utokens WHERE usertoken = '{$utoken}'"); //Sorgulama True döndüyse token'i kaldırdık.
	$update = $query->execute();
	if ( $update ){// Eğer silindiyse 200 dönerek işlemin başarılı olduğunu bildirdik.
		http_response_code(200);
	}else{// Eğer işlem sırasında sorun oluşmuşsa 400 dönerek Kötü İstek haberi veriyoruz.
		http_response_code(400);
	}
}else{
	http_response_code(400);
}

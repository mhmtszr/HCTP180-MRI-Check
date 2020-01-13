<?

//12 Ocak 2020 HCTP180 Çalgan Aygün

require_once('database.php'); // Veritabanı bağlantısı.
include('logincheck.php'); // Token kontrolü için güvenlik fonksiyonlarını içeren dosya.

// Gelen veriler değişkenlere aktarıldı.
$age = $_POST["age"];
$sex = $_POST["sex"];
$chest = $_POST["chest"];
$rbp = $_POST["rbp"];
$sc = $_POST["sc"];
$fbs = $_POST["fbs"];
$ecg = $_POST["ecg"];
$mxhr = $_POST["mxhr"];
$angina = $_POST["angina"];
$depression = $_POST["depression"];
$peakexercise = $_POST["peakexercise"];
$floros = $_POST["floros"];
$tales = $_POST["tales"];
$time = time();
$token = $_POST["token"];
$userid = $_POST["userid"];


if(checkToken($token, $userid)){// Token kontrol edildi doğruysa işleme başlandı.
	$query = $db->prepare("INSERT INTO `lastanalyzes`(`id`, `userid`, `age`, `sex`, `chest`, `rbp`, `sc`, `fbs`, `ecg`, `mxhr`, `angina`, `depression`, `peakexercise`, `floros`, `tales`, `time`)VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"); // Veritabanı sorgusu hazırlandı bu sayede gelecek SQL Injection saldırıları baaşrısız olacak.
	$insert = $query->execute(array($userid, $age, $sex, $chest, $rbp, $sc, $fbs, $ecg, $mxhr, $angina, $depression, $peakexercise, $floros, $tales, $time)); // Sorgu gönderildi.

	//MRICheck ML serverına CURL ile bağlanıp sorgu gerçekleştirilecek.
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "http://17.0.0.1:5000/MRICheck"); //MRICheck Serverına bağlantı sağlandı.
	//Güvenlik nedeniyle MRICheck ML Sunucusu sadece yerel bağlantıya açık.
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, true);

	$data = array(
		'age' => $age, 
		'sex' => $sex, 
		'chest' => $chest, 
		'rbp' => $rbp, 
		'sc' => $sc, 
		'fbs' => $fbs, 
		'ecg' => $ecg, 
		'mxhr' => $mxhr, 
		'angina' => $angina, 
		'depression' => $depression, 
		'peakexercise' => $peakexercise, 
		'floros' => $floros, 
		'tales' => $tales, 
	);// Veriler POST edilmek için hazırlandı.
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	$output = curl_exec($ch);
	curl_close($ch); //POST gönderildi ve gelen veri alındı.
	$outJson = json_encode(array("prediction" => $output), JSON_PRETTY_PRINT); // Gelen veri JSON olarak ekrana yazdırıldı.
	echo $outJson;
}else{
	http_response_code(400); // Geçersiz istek gönderildi. Bu yüzden 400 kodu döndürüldü.
	die;
}
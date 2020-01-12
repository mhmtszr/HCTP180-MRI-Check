<?

//12 Ocak 2020 HCTP180 Çalgan Aygün
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once('database.php');
include('logincheck.php');

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


if(checkToken($token, $userid)){
	$query = $db->prepare("INSERT INTO `lastanalyzes`(`id`, `userid`, `age`, `sex`, `chest`, `rbp`, `sc`, `fbs`, `ecg`, `mxhr`, `angina`, `depression`, `peakexercise`, `floros`, `tales`, `time`)VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
	$insert = $query->execute(array($userid, $age, $sex, $chest, $rbp, $sc, $fbs, $ecg, $mxhr, $angina, $depression, $peakexercise, $floros, $tales, $time));
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "http://ml_server:5000/MRICheck");
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
	);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	$output = curl_exec($ch);
	curl_close($ch);
	$outJson = json_encode(array("prediction" => $output), JSON_PRETTY_PRINT);
	echo $outJson;
}else{
	http_response_code(400);
	die;
}
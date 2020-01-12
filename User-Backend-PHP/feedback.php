<?
//12 Ocak 2020 HCTP180 Çalgan Aygün
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once('database.php');
include('logincheck.php');

$token = $_POST["token"];
$userid = $_POST["userid"];
$analyzeid = $_POST["analyzeid"];


if(checkToken($token, $userid)){
	$query = $db->prepare("UPDATE lastanalyzes SET
	checked = 1
	WHERE id = :id");
	$update = $query->execute(array(
    "id" => $analyzeid,
	));
	if ($update){
		$outJson = json_encode(array("status" => "success"), JSON_PRETTY_PRINT);
		echo $outJson;
	}else{
		$outJson = json_encode(array("status" => "fail"), JSON_PRETTY_PRINT);
		echo $outJson;
	}
}else{
	http_response_code(400);
	die;
}
$db = null;
<?
//12 Ocak 2020 HCTP180 Çalgan Aygün
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once('database.php');
include('logincheck.php');

$token = $_POST["token"];
$userid = $_POST["userid"];

if(checkToken($token, $userid)){
	$query = $db->query("SELECT * FROM lastanalyzes WHERE userid = '{$userid}'", PDO::FETCH_ASSOC);
	if ($query->rowCount()){
	     echo json_encode($query->fetchAll(), JSON_PRETTY_PRINT);
	}
}else{
	http_response_code(400);
	die;
}
$db = null;

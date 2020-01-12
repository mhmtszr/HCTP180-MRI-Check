<?
//12 Ocak 2020 HCTP180 Çalgan Aygün
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once('database.php');

function checkToken($token, $userid){
	global $db;
	$time = time();
	$query = $db->query("SELECT * FROM utokens WHERE usertoken = '{$token}' AND userid = '{$userid}'")->fetch(PDO::FETCH_ASSOC);
	if($query){
		if($query['lasttime']>$time){
			return True;
		}else{
			return False;
		}
	}else{
		return False;
	}
}
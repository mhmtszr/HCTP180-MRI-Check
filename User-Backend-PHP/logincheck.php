<?
//12 Ocak 2020 HCTP180 Çalgan Aygün

require_once('database.php'); //Veritabanı bilgileri içeri alındı.

/**
checkToken fonksiyonu ile diğer sayfalarda token doğruluğu test edildi.
Token'in token listeisnde bulunup bulunmadığı zamanının dolup dolmadığı test edildi.
Token'in UserID ile eşleştirilip başka kullanıcı için işlem yapması engellendi.
**/


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
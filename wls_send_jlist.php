<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: X-Requested-With');

$hostname = 'localhost';
$username = 'woody';
$password = 'furnald65';
$dbname  = 'acquia_7';

try 
{
		$nodes = array();
		$json = array();
		$url = array();

    $dbh = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
		$sql = "SELECT nid, title,created FROM node WHERE type='narration' AND status='1' ORDER BY created DESC";
		foreach($dbh->query($sql) as $row)
		{
			$node = array(
				"nid" => $row['nid'],
				"title" => $row['title'],
				"date" => date("m-d-Y", $row['created']),
				"url" => "",
				"body" => "" 
			);
			$nodes[] = $node;
		}


		$sql = "SELECT source, alias FROM url_alias WHERE source LIKE '%node%'";
		foreach($dbh->query($sql) as $row) {
			$str = $row['alias'];
			if(($str[0] !== '2') && ($str[0] === 'c')) {
				$id = $row['source'];
				$n = strpos($id, '/');
				$id = substr($id,++$n); 
				$url[$id] = $row['alias'];
			}
		}

		foreach($nodes as $n) {
			$u_index = $n['nid']; 
			//echo '<br>' . $n['nid'] . ' ' . $n['title'] . ' | ' . $url[$u_index];
			$nref = array(
				"nid" => $n['nid'],
				"title" => $n['title'],
				"url" => $url[$u_index]	
			);
			$json[] = $nref;
		}
		
		echo json_encode($json);
		$dbh = null;
}
catch(PDOException $e)
{
    echo $e->getMessage();
}
?>

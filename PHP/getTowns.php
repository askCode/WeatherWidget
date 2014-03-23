<?php
	/* This script queries the weather table and returns a list of towns stored in the 
     * database to the _getTownList function in weather_widget.js */

   require_once("db.php");


   $mysql = mysql_connect($sql_server, $db_username, $db_password);
   if($mysql == FALSE) die("Error connecting to the mySQL Server: ". $sql_server);
   
   $db = mysql_select_db($db_name);
   if ($db == FALSE) die("Error selecting database: ". $db_name);
   
   
   $weather_query = "SELECT DISTINCT `town` FROM `weather`";
	
	$weather_result = mysql_query($weather_query);
	$towns = array ();
	
	while ($weather_row = mysql_fetch_assoc($weather_result)){
		$towns[] = $weather_row;
	}
    
   echo json_encode($towns);
   
   mysql_close();
?>
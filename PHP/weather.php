<?php

	/**************************
	 * Add your code to connect to your database here
	 */
	 
	require_once("db.php");
	
	$town = $_GET['town'];

   /***************************
    * 
    * Add code here to query the DB for weather information for the given town
    * 
    * Construct a PHP array object containing the weather data 
    * Return a JSON encoded version of the array to the browser
    * 
    */
    
    $weather_query = "SELECT * FROM `weather` WHERE `town` = '$town'";
	
	$weather_result = mysql_query($weather_query);
	$weather = array ();
	
    /* Add all the values to the weather[] array and echo it after encoding it in json */
	while ($weather_row = mysql_fetch_assoc($weather_result)){
		$weather[] = $weather_row;
	}
    
   echo json_encode($weather);
   
   mysql_close();
?>


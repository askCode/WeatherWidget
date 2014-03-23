<?php
	/* This script creates a connection to the mySQL database */

   $hostname = $_SERVER['HTTP_HOST'];

   if ($hostname == "webapp.cms.waikato.ac.nz") {
      $sql_server = "mysql.cms.waikato.ac.nz";
      $db_username = "apm19";
      $db_password = "my10543921sql";
      $db_name = "apm19";
   } else {
   	  // fill these in if you want to run this on your own server
      $sql_server = "localhost";
      $db_username = "root";
      $db_password = "";
      $db_name = "comp333ass2";
   }


   $mysql = mysql_connect($sql_server, $db_username, $db_password);
   if($mysql == FALSE) die("Error connecting to the mySQL Server: ". $sql_server);
   
   $db = mysql_select_db($db_name);
   if ($db == FALSE) die("Error selecting database: ". $db_name);
?>

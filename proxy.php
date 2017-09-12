<?php
header('Content-Type: application/json');

	//Pega o JSON da url apontada

    $url = 'https://s3.amazonaws.com/data-production-walltime-info/production/dynamic/meta.json';   
    $json = file_get_contents($url);
    echo $json;    
?>


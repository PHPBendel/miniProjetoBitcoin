<?php
header('Content-Type: application/json');

	//Pega o JSON da url apontada
   	$url = 'https://s3.amazonaws.com/data-production-walltime-info/production/dynamic/meta.json';   
    $json = file_get_contents($url);
    $data = json_decode($json);

    $pages = $data->order_book_pages;
    $url = "https://s3.amazonaws.com/data-production-walltime-info/production/dynamic/".$data->order_book_prefix."_r".$data->current_round."_p";
    $arrayObj = array();

    for ($i = 0; $i<$pages; $i++)
    {
        $json = file_get_contents($url.$i.".json");
        $data = json_decode($json);   
        array_push($arrayObj, $data->{"xbt-brl"});                       
    }

    echo json_encode($arrayObj);   
?>


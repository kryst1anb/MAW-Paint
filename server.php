<?php
    $f = fopen("semafor","w");
    flock($f,LOCK_EX);
    
    $suroweDane = file_get_contents("php://input");
    $daneJSON = json_decode($suroweDane,true);

    $polecenie = intval($daneJSON['polecenie']);

    if(isset($daneJSON['polecenie']))
    {
        $polecenie = intval($daneJSON['polecenie']);
        switch($polecenie)
        {
            case 1:
                $date = date("Y-m-d_H-i-s"); 
                $img = $daneJSON['dane'];  
                $img = str_replace('data:image/png;base64,', '', $img);  
                $img = str_replace(' ', '+', $img);  
                $data = base64_decode($img);  
                $file = $date.'.png';  
                $success = file_put_contents($file, $data);
                print $success ? $file : 'Unable to save the file.';
                echo $data;
            break;
            default: 
                $wynik = array('status' => false, 'kod' => 3, 'wartosc' => 'Podane zostało złe polecenie');
        }
    }

    flock($f, LOCK_UN); 
    fclose($f);
?>

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
            case 1: //zapis ciągu base64 do pliku png (to będzie pod download)
                $data = date("Y-m-d_H-i-s"); 
                $img = $daneJSON['dane'];  
                $img = str_replace('data:image/png;base64,', '', $img);  
                $img = str_replace(' ', '+', $img);  
                $dane = base64_decode($img);  
                $file = $data.'.png';
                $success = file_put_contents($file, $dane);
                print $success ? $file : 'Unable to save the file.';
            break;
            case 3: //wczytywanie do listy wszystkie pliki z rozszerzeniem .base64
                $wynik = '';
                $files = glob('{*.png}', GLOB_BRACE);
                foreach($files as $file){
                    $file = substr($file, 0, -4);
                    if ($wynik === '') {
                        $wynik = '<option value="'.$file.'">';
                    } else {
                        $wynik .= '<option value="'.$file.'">';
                    }
                }
                print_r($wynik);
            break;
            case 4: //wczytywanie danego pliku do canvas htmla
                    $img_file = $daneJSON["plik"];
                    $imgData = base64_encode(file_get_contents($img_file));
                    $src = 'data: '.mime_content_type($img_file).';base64,'.$imgData;
                    echo $src;
            break;
            default: 
                $wynik = array('status' => false, 'kod' => 3, 'wartosc' => 'Podane zostało złe polecenie');
        }
    }

    flock($f, LOCK_UN); 
    fclose($f);
?>

<?php
if(isset($_POST['text'])){
  $key = $_POST['text'];
  $data = explode(" ", $key);
  for ($i = 0; $i < count($data); $i++) {
    if (!empty($data[$i])){
  echo $data[$i].'</br>';
  }
 }
}

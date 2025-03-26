<?php
require('/banco/conn.php');
header('Cache-Control: no-cache, must-revalidate');
header('Content-Type: application/json');
header('HTTP/1.1 200 OK');

if ($_SERVER["REQUEST_METHOD"] === "POST"){
    $mail = $_POST["mail"];
    $pass = $_POST["pass"];
    $sql = "SELECT * FROM users WHERE user_mail = ? AND user_pass";
    $stm = $pdo->prepare($sql);
    $stm->bindValue(1, $mail);
    $stm->bindValue(2, $pass);
    if ($stm->execute()){
        $res = $stm->fetch(PDO::FETCH_ASSOC);
        $rlog = "logado";
        $rusid = $res["user_id"];
        $rusnm = $res["user_name"];
        $rmail = $res["user_mail"];
        $rmsgn = "Usuario logado com sucesso.";
    }
    else{
        $rlog = "nologed";
        $rusid = null;
        $rusnm = "notname";
        $rmail = "notmail";
        $rmsgn = "Não foi possivel completar a operação.";
    }
    $data = array{
        'logd' => $rlogd,
        'usid' => $rusid,
        'usnm' => $rusnm,
        'mail' => $rmail,
        'msgn' => $rmsgn
    };
    $json = json_encode($data);
    echo $json;
}
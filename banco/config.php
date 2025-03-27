<?php 
    if(isset($_POST['enviar'])){
        $nome = $_POST['name'];
        $cpf = $_POST['cpf']
    }

    $host = 'localhost';
    $banco = 'formulario';
    $user = 'root';
    $senha_user = '';

    $con = mysqli_connect($host, $banco, $user, $senha_user);
    if(!$con){
        die("Connection failed" . mysqli_connect_error());
    }
    $sql = 'INSERT INTO user_data(name, cpf, senha) VALUES('$nome', '$cpf',)';
    $rs  = mysqli_query($con,$sql);
    if($rs){
        echo 'Enviado'; 
    }
?>
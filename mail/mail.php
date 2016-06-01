<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>mail test</title>
</head>
<body>
    
    <h3>mail test</h3>
    <form action="https://ma1.itsfogo.com/dev/DanV/mail.php" target="_self" method="post">
        <label for="email">To: </label><br />
        <input id="email" name="email" type="text" /><br /><br />
        
        <label for="subject">Subject: </label><br />
        <input id="subject" name="subject" type="text" /><br /><br />
        
        <label for="message"></label><br />
        <textarea id="message" name="message"></textarea><br /><br />
        
        <label for="password">Password: </label><br />
        <input id="password" name="password" type="password" /><br /><br />
        
        <input type="submit" name="Send" value="Send" />
    </form>
    
</body>
</html>


<?php
        
    //echo '<pre>';
    //print_r( $_POST );
    //echo '</pre>';
    $pass_hash = 'ffb05d0455640d67843398327f0942ec';

    if( md5($_POST['password']) == $pass_hash )
    {
        $to = $_POST['email'];
        $subject = $_POST['subject'];
        $body = $_POST['message'];
        
        $header = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'To: ' . $to . "\r\n";
        $headers .= 'From: mail tester bwin <dan.vasiliu@bwinparty.com>' . "\r\n";
        $headers .= 'X-Mailer: PHP/' . phpversion();
        
        $success = mail($to, $subject, $body, $headers);
        echo $success;
    }

?>
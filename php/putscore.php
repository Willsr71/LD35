<?php
if (isset($_GET["username"]) && isset($_GET["score"])) {
  $database = mysqli_connect("localhost", "ld35", "sdWHpeKDVXb7qtVy", "ld35");
  mysqli_query($database, "INSERT INTO `galaxyshifter_scores` (`username`, `score`) VALUES ('" . $_GET["username"] . "', '" . $_GET["score"] . "');");

  echo('var element' . $_GET["score"] . ' = document.getElementById("score' . $_GET["score"] . '");');
  echo('element' . $_GET["score"] . '.parentNode.removeChild(element' . $_GET["score"] . ');');
  //echo('console.log("Request recieved: ' . $string . '. Time taken: ' . (time() - floor($_GET["time"] / 1000)) . 'ms");');
} else {
  header('HTTP/1.0 404 Not Found');
  include("error404.html");
}
?>

<?php
$database = mysqli_connect("localhost", "ld35", "sdWHpeKDVXb7qtVy", "ld35");
$result = mysqli_query($database, "SELECT `username`, `score` FROM `galaxyshifter_scores` ORDER BY `galaxyshifter_scores`.`score` DESC LIMIT 20;");

$scores = array();

while ($score = $result->fetch_array(MYSQL_ASSOC)) {
  $scores[] = $score;
}

echo("scores = " . json_encode($scores) . ";");
echo("putScores();")
?>

<!DOCTYPE html>.
<html lang="pl">
<?php
if (isset($_GET["menu"])) {$menu = $_GET["menu"];} else {
  $menu = 'main';
  $sub =' main';
}
if (isset($_GET["sub"])) {$sub = $_GET["sub"];}
    elseif (date("m") <= 4 || (date("m") == 12))   {
$menu ='supportme';
$sub = 'tax';
    }
    $dir = 'menu/';
    $file = $dir.$menu.'.php';
   $main_title = 'rpuszkin.pl Robert Puszkin';
   if ($menu == 'main') {$sub_title = 'strona główna';}
   elseif ($menu == 'supportme') {$sub_title = 'wspomóż mnie';}
   elseif ($menu == 'gallery') {$sub_title = 'galeria';}
   elseif ($menu == 'aboutme') {$sub_title = 'o mnie';}
   elseif($menu == 'myhistory') {$sub_title = 'historia';}
   elseif($menu == 'myprogress') {$sub_title = 'postępy';}
   elseif($menu == 'life') {$sub_title = 'z życia wzięte';}
   elseif($menu == 'myprojects') {$sub_title = 'projekty WWW';}
   if ($menu == 'supportme') {    if ($sub == 'tax') {$subsub_title = 'przekaż 1,5% podatku';}
   elseif ($sub == 'fundation') {$subsub_title = 'przez fundację';}
$title = $main_title.' | wspomóż mnie | '.$subsub_title;
  }
  else {
    $title = $main_title.' | '.$sub_title;
  }
?>
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo($title);?></title>
    <link rel="stylesheet" href="reset.css" />
    <script
      src="https://kit.fontawesome.com/939d05597b.js"
      crossorigin="anonymous"
    ></script>
    <link rel="stylesheet" href="style.css" />
  </head>
<body>    
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <nav id="nav"><div class="container">
    <a href="?menu=main&sub=main">strona&nbsp;główna&nbsp;-&nbsp;<span class="weight-thin">aktualności</span></a>
    <a href="?menu=supportme&sub=supportme">wspomóż&nbsp;mnie</a>
    <label for="supportme-input"><a><i class="fa-solid fa-angle-right"></i></a></label>
    <a href="?menu=supportme&sub=tax" class="supportme-more"><img src="media/menu-tax.png"/>&nbsp;podatku</a><a href="?menu=supportme&sub=fundation" class="supportme-more">przez&nbsp;<img src="media/menu-fundation.png"/>&nbsp;fundację</a>
    <a href="?menu=gallery&sub=gallery">galeria</a>
    <a href="?menu=aboutme&sub=aboutme">o&nbsp;mnie</a>
    <a href="?menu=myhistory&sub=myhistory">moja&nbsp;smutna&nbsp;hitoria</a>
    <a href="?menu=myprogress&sub=myprogress">moje&nbsp;postępy</a>
    <a href="?menu=life&sub=life">z&nbsp;życia&nbsp;wzięte</a>
    <a href="?menu=myprojects&sub=myprojects">strefa&nbsp;projektóww WWW</a>
    <input type="checkbox" id="supportme-input" />
    </div></nav>
    <header id="top">
</div>
    <div class="container">
      <div class="btn-container"><a href="?menu=supportme&sub=tax"><img class="tax-btn" src="media/tax-btn.png" alt="Przekaż 1,5% podatku" /></a><a href="?menu=myhistory&sub=myhistory" class="header-btn">historia</a><a class="header-btn" href="?menu=myprogress&sub=myprogress">postępy</a></div>
      <p><h1><strong>Robert Puszkin</strong> - <span class="weight-thin">Jedna sekunda</span>  i praca konsultanta zamieniła się w ciężką pracę nad sprawnością...</h1></p>
    <div id="loader"><img src="media/loader.gif" alt="" />Ładowanie...</div>
    </div>
      <div class="container">
</div>
    <div></p>
  </header>
    <?php

if  (($sub != $menu) && ($sub != 'tax' && $sub != 'fundation'))
{
$err ='Nie ma takiej pozycji w menu! Coś poszło nie tak, albo za dużo kombinujesz... Takie coś nie istnieje!';
$err_code = '404S';
}
if(file_exists($file)) {
echo('<main>');
include($file);
echo('</main>');
}
 else {
$err='Nie ma takiej pozycji w menu. Coś poszło nie tak, albo za dużo kombinujesz... Takie coś nie istnieje! ';
$err_code = '404M';
}
?>
 <script type="text/javascript">
function ScrollIt(targetId, duration) {
    var target = document.getElementById(targetId);
    if (!target) return;

    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset || document.documentElement.scrollTop;
    var startTime = null;

    function scrollToTarget(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = easeInOutQuad(Math.min(1, timeElapsed / duration));
        var scrollPosition = startPosition + targetPosition * run;
        window.scrollTo({
            top: scrollPosition,
            behavior: 'auto'
        });
        if (timeElapsed < duration) {
            requestAnimationFrame(scrollToTarget);
        }
    }
function easeInOutQuad(t) {
 return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
 }
    requestAnimationFrame(scrollToTarget);
}

window.addEventListener('load', function() {
  setTimeout(function() {ScrollIt(<?php echo("'".$sub."'");?>, 6400)}, 6000);
});
setTimeout(function() {document.getElementById('loader').style.display = 'none';}, 12400);
document.addEventListener('DOMContentLoaded', function() {
      var checkbox = document.getElementById('supportme-input');
      var links = document.querySelectorAll('.supportme-more');

      // Ukryj linki na początku
      links.forEach(function(link) {
        link.style.display = 'none';
      });

      checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
          links.forEach(function(link) {
            link.style.display = 'flex';
          });
        } else {
          links.forEach(function(link) {
            link.style.display = 'none';
          });
        }
      });
    });
</script>
</body>
</html>
function choseDirection(n){
    var choices = 0;
    if (ennemis[n].ia == "herbi"){
        if (ennemis[n].n < 20) return;
        var X = Math.round(ennemis[n].x);
        var Y = Math.round(ennemis[n].y);
        if (objNiveau[Y][X][0] == "herbe0" || objNiveau[Y][X][0] == "herbe2"){
            if (ennemis[n].act == 1){
                if (rnd(100) < 10) ennemis[n].act = 0;
            }
            else {
                if (rnd(100) < 30) ennemis[n].act = 1;
            }
        }
    }
    ennemis[n].n = 0;
}

function vueIA(guy){
    var XX = Math.round(guy.x);
    var YY = Math.round(guy.y);
    var LL = [];
    for (var i = 0;i < guy.vue;i++){
        XX += vecteurs[guy.sens][1];
        YY += vecteurs[guy.sens][0];
        var ZZ = getAlti(XX,YY);
        if (ZZ - guy.z > 1){
            i = guy.vue;
        }
        if (ZZ - guy.z > -1) LL.push([XX,YY]);
    }
    var NN = -8;
    LL.forEach(
        function(e,i){
            if (heros[0].x == e[0] && heros[0].y == e[1]){
                NN = i;
            }
            else if (heros[1].x == e[0] && heros[1].y == e[1]){
                NN = i;
            }
        }
    );
    return NN;
}

function getAlti(x,y){
    if (x < 0 || y < 0 || y >= niveau.length || x >= niveau[0].length){
        return 6666666;
    }
    else {
        return (niveau[y][x] + taille(objNiveau[y][x]));
    }
}

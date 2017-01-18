function action(t){
    if (edition == 1) return;
    var controlKeys = [[38,39,40,37],[101,99,98,97]];
    heros.forEach(
        function(h,n){
            if (h.imgN > 0){
                h.imgN -= 1;
                if (h.imgN == 0) h.imgUp = 0;
            }
            if (h.invent[h.objet] == "batonF"){
                h.timerF -= 1;
                if (h.timerF == 0){
                    if (h.invent.length == 1){
                        h.invent[0] = "blank";
                    }
                    else {
                        h.invent.splice(h.objet,1);
                        h.objet = 0;
                    }
                }
            }
            if (figer == 0){
                var supress = 1;
                if (Math.round(h.y) > 0 && Math.round(h.x) > 0 && Math.round(h.y) < niveau.length && Math.round(h.x) < niveau[0].length){
                    if (objNiveau[Math.round(h.y)][Math.round(h.x)][0] != "" && isSolid(Math.round(h.y),Math.round(h.x)) == false){
                        var truc = objNiveau[Math.round(h.y)][Math.round(h.x)];
                        if (truc[0] == "rubisVert"){
                            h.rubis += 1;
                            supress = 0;
                        }
                        else if (truc[0] == "rubisBleu"){
                            h.rubis += 5;
                            supress = 0;
                        }
                        else if (truc[0] == "rubisRouge"){
                            h.rubis += 20;
                            supress = 0;
                        }
                        else if (truc[0] == "plate"){
                            if (truc[3] == "") objNiveau[truc[2]][truc[1]] = [""];
                            else if (truc[3] == 1 || truc[3] == -1){
                                niveau[truc[2]][truc[1]] += truc[3];
                                Painter.niveau(niveau);
                            }
                            else if (truc[3] == "monstre"){
                                ennemis.push(monstreType(truc[4],truc[1],truc[2]));
                            }
                            else {
                                for (var i = truc.length-1;i>2;i--){
                                    objNiveau[truc[2]][truc[1]].splice(0,0,truc[i]);
                                }
                            }
                            truc[0] = "plate1";
                        }
                        else if (truc[0] == "coeur"){
                            if (h.vie + 1 <= h.vieTotale){
                                h.vie += 1;
                            }
                            else if (h.vie + 0.5 <= h.vieTotale) h.vie += 0.5;
                            supress = 0;
                        }
                        else if (truc[0] == "cle0"){
                            h.cles += 1;
                            supress = 0;
                        }
                        else if (truc[0] == "teleport"){
                            teleport = [h.y,h.x];
                            goToLevel(truc[1],truc[2],truc[3],truc[4],truc[5],truc[6]);
                        }
                        else if (truc[0] == "boomerang" || truc[0] == "mastersword" || truc[0] == "pencil" || truc[0] == "boat" || truc[0] == "hookShot" || truc[0] == "parachale" || truc[0] == "baton"){
                            if (truc[0] == "boomerang") {addObj(truc[0],n);}
                            else donnerHeros(truc[0],n);
                            supress = 0;
                        }
                        else if (truc[0] == "avaleur1"){
                            if (h.z == niveau[Math.round(h.y)][Math.round(h.x)]){
                                h.stun = 10020;
                                objNiveau[Math.round(h.y)][Math.round(h.x)][0] = "avaleur2";
                            }
                        }
                        if (supress == 0){
                            if (truc.length > 1) objNiveau[Math.round(h.y)][Math.round(h.x)].splice(0,1);
                            else objNiveau[Math.round(h.y)][Math.round(h.x)][0] = "";
                        }
                    }
                }

                if (h.invent[h.objet] == "baton"){
                    if (h.y + vecteurs[(h.sens+1)%4][0] < niveau.length){
                        if (h.x + vecteurs[(h.sens+1)%4][1] < niveau[0].length){
                            if (objNiveau[h.y + vecteurs[(h.sens+1)%4][0]][h.x + vecteurs[(h.sens+1)%4][1]][0] == "torche"){
                                h.invent[h.objet] = "batonF";
                                h.timerF = 200;
                            }
                        }
                    }
                }
                if (h.imgUp != 1){
                    if (1 == keys[controlKeys[n][1]]) moveV(1,n,0);
                    if (1 == keys[controlKeys[n][3]]) moveV(3,n,0);
                    if (1 == keys[controlKeys[n][0]]) moveV(0,n,0);
                    if (1 == keys[controlKeys[n][2]]) moveV(2,n,0);
                    if (heros[n].Vx > 0) move(1,n,0);
                    else if (heros[n].Vx < 0) move(3,n,0);
                    if (heros[n].Vy > 0) move(2,n,0);
                    else if (heros[n].Vy < 0) move(0,n,0);
                }
            }
            ennemis.forEach(
                function(e,I){
                    if (e.pv == 0) return;
                    if (Math.round(h.x) == Math.round(e.x) && Math.round(h.y) == Math.round(e.y) && Math.round(h.z) == Math.round(e.z)){
                        metempsy(I);
                    }
                }
            );
            if (h.plane == 1){
                if (h.z > getAlti(Math.round(h.x),Math.round(h.y))) h.g = 0.01;
                else {
                    h.g = 0;
                    h.z = getAlti(Math.round(h.x),Math.round(h.y));
                    h.plane = 0;
                    h.imgUp = 0;
                    h.imgN = 0;
                    if (h.z <= -1){
                        fall(h,n);
                    }
                }
                h.z -= h.g;

            }
            else if (h.grap == 0){
                if ( (h.z > getAlti(Math.round(h.x),Math.round(h.y)) && h.g < 5)) h.g += 0.02;
                else {
                    h.g = 0;
                    h.z = getAlti(Math.round(h.x),Math.round(h.y));
                    if (h.z <= -1){
                        fall(h,n);
                    }
                }
                h.z -= h.g;
            }
            if (figer == 1) {h.tAura += h.vAura; if (h.tAura == 40 | h.tAura == -40) h.vAura = h.vAura * -1;}
        });
}

function fall(h,n){
    if (out == 1 || out == 3){
        particles.push({n:0,x:h.x,y:h.y,s:0.3,type:"rond",lim:30,alti:-1,g:0});
        particles.push({n:0,x:h.x,y:h.y,s:0,type:"eclabousse",lim:30,alti:-1,g:15});
    }
    else if (out == 2){
        particles.push({n:0,x:h.x,y:h.y,s:0.3,type:"rondB",lim:30,alti:-1,g:0});
        particles.push({n:0,x:h.x,y:h.y,s:0,type:"eclabousseB",lim:30,alti:-1,g:15});
    }
    if (niveau[respawnPoint[1]][respawnPoint[0]] < 0){
        var xxx = 0;
        while (niveau[respawnPoint[1]][respawnPoint[0]] < 0){
            xxx += 1;
            respawnPoint[0] += 1;
            if (respawnPoint[0] == niveau[0].length) {
                respawnPoint[0] = 0;
                respawnPoint[1] += 1;
                if (respawnPoint[1] == niveau.length) {
                    respawnPoint[1] = 0;
                }
            }
            if (xxx == 500){
                niveau[respawnPoint[1]][respawnPoint[0]] = 0;
            }
        }
    }
    heros[n].x = respawnPoint[0];
    heros[n].y = respawnPoint[1];
    heros[n].stun = 20;
    heros[n].mortal = 60;
}

function move(d,n,gg){
    // if (gg == 0 && heros[n].plane == 0 && heros[n].g == 0){
    var inert = [heros[n].Vx,heros[n].Vy];
    var dx = Math.abs(heros[n].Vx) * vecteurs[d][1];
    var dy = Math.abs(heros[n].Vy) * vecteurs[d][0];
    var deX = Math.round(heros[n].x + dx);
    var deY = Math.round(heros[n].y + dy);
    heros[n].Vx = 0;
    heros[n].Vy = 0;
    if (deX < niveau[0].length && deX > -1 && deY < niveau.length && deY > -1){
        var truc = objNiveau[deY][deX];
        if (heros[n].sens == 0){
            if (truc[0] == "house0" || truc[0] == "house1" || truc[0] == "house3" || truc[0] == "houseHelp" || truc[0] == "templeFeu1" || truc[0] == "templeEau1" || truc[0] == "miniTempleEau" || truc[0] == "canon1"){
                teleport = [deY,deX];
                if (objNiveau[deY][deX][1] == "void"){
                    goToLevel(out,"void",0,0,0,0);
                }
                else {
                    goto = objNiveau[deY][deX][1];
                    if (objNiveau[deY][deX][2] == 666){
                        out = 1;
                        cinematicos = 2;
                        goToLevel(out,goto,iles[goto].heros[0][1],iles[goto].heros[0][0],iles[goto].heros[1][1],iles[goto].heros[1][0]);
                    }
                    else if (interieurs[goto] == undefined){
                        out = 1;
                        goToLevel(out,goto,iles[goto].heros[0][1],iles[goto].heros[0][0],iles[goto].heros[1][1],iles[goto].heros[1][0]);
                    }
                    else {
                        out = interieurs[goto].out;
                        goToLevel(out,goto,interieurs[goto].heros[0][1],interieurs[goto].heros[0][0],interieurs[goto].heros[1][1],interieurs[goto].heros[1][0]);
                    }
                    if (goto == "help1") alert("Place toi face à un personnage et appuie sur la touche maj pour lui parler.");
                }
                if (truc[0] == "canon1"){
                    cinematicos = 3;
                }
            }
        }
    }
    if (heros[n].z < getAlti(deX,deY)){
        return;
    }
    //}
    heros[n].x +=  dx;
    heros[n].y +=  dy;
    if (heros[n].etat == 1 && heros[n].g == 0) {heros[n].g = -0.20; heros[n].z += 0.01;}

    if (inert[0] > 0) heros[n].Vx = inert[0] - heros[n].inertie;
    else if (inert[0] < 0) heros[n].Vx = inert[0] + heros[n].inertie;
    if (Math.abs(inert[0]) < heros[n].inertie) heros[n].Vx = 0;
    if (inert[1] > 0) heros[n].Vy = inert[1] - heros[n].inertie;
    else if (inert[1] < 0) heros[n].Vy = inert[1] + heros[n].inertie;
    if (Math.abs(inert[1]) < heros[n].inertie) heros[n].Vy = 0;

    Painter.scrolling();
}

function moveV(d,n,gg){
    if (heros[n].stun > 0) return;
    if (heros[n].sens != d){
        heros[n].sens = d;
        heros[n].delay = 3;
        return;
    }
    if (heros[n].delay != 0){
        heros[n].delay -= 1;
        return;
    }
    var dx = vecteurs[d][1] * heros[n].vitesse;
    var dy = vecteurs[d][0] * heros[n].vitesse;
    heros[n].Vx = dx;
    heros[n].Vy = dy;
}

function changeArme(n){
    if (heros[n].etat != 0){
        cinematicos = 4;
        heros[n].etat = 0;
        imgCinema[0] = n;
        imgCinema[1] = "coffre3";
        imgCinema[2] = "heros";
    }
    else{
        if (heros[n].timerF > 0) heros[n].timerF = 0;
        if (heros[n].invent[heros[n].objet] == "batonF") heros[n].invent[heros[n].objet] = "baton";
        heros[n].objet = (heros[n].objet+1)%heros[n].invent.length;
    }
}

function taille(caseT){
    var tailles = {"arbre0":5};
    if (tailles[caseT] == undefined) return 0;
    else return tailles[caseT];
}


function metempsy(i){
    particles.push({n:0,type:"metem",x:heros[0].x,y:heros[0].y,g:0,alti:heros[0].z,lim:50});
    ennemis[i].pv = 0;
    imgHeros[2].src = "images/ennemis/"+ennemis[i].img+"0.png";
    imgHeros[0].src = "images/ennemis/"+ennemis[i].img+"4.png";
    imgHeros[1].src = "images/ennemis/"+ennemis[i].img+"5.png";
    imgHeros[3].src = "images/ennemis/"+ennemis[i].img+"6.png";
    heros[0].invent[0] = ennemis[i].capa;
    heros[0].inertie = ennemis[i].inertie;
    heros[0].vitesse = ennemis[i].vitesse;
    heros[0].saut = ennemis[i].saut;
}

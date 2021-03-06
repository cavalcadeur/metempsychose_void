var W,H;
var ctx,canvas;
var X = 0;
var Y = 0;
var keys = [];
var heros = [{"x":5,"y":4,z:0,g:0,"vx":0,"vy":0,"sens":2,"delay":0,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0,"d":1,"vie":3,"vieTotale":3,"stun":0,"mortal":0,"grap":0,"grapD":-1,"prim":"blank","imgUp":0,"imgN":0,"plane":0,"timerF":0,"etat":0,"caseSpe":0,"inertie":0.02,"Vx":0,Vy:0,"vitesse":0.1,"saut":0}];
var questObj = {"carteMaritime":0,"boussole":0};
var objInvent = [];
var seaLimit = [1200,900];
var ennemis = [];
var boomerang = [];
var editPlate = 0;
var pressurePlate = [];
var useless = ["blank",""];
var pots = [];
var out = 4;
var colorSet = [["rgb(97,97,97)","rgb(65,65,65)",[140,140,140,-30,-30,-30],"rgb(0,0,0)"],["rgb(93,58,96)","rgb(72,37,77)",[80,20,20,20,-5,-5],"rgb(42,53,108)","rgb(0,0,40)"],["rgb(137,97,97)","rgb(115,65,65)",[200,140,140,-20,-30,-30],"rgb(209,82,28)"],["rgb(80,80,130)","rgb(40,40,85)",[140,140,200,-30,-30,-20],"rgb(0,0,50)"],["rgb(140,130,170)","rgb(120,110,150)",[180,180,210,-50,-50,-50],"rgb(40,40,70)","rgb(200,200,250)"],["rgb(97,97,97)","rgb(65,65,65)",[140,140,140,-30,-30,-30],"rgb(28,134,182)"]];
var niveau = [];
var quests = {"chef":0,"jehan":0,"garcon":0,"boussole":0,"boussoleF":0,"dev":0,"sky":0,"pencil":0};
var alerting = 0;
var objNiveau = [[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]]];
var imgHeros = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
var imgDebris = {};
var imgElement = {};
var imgMenu = {};
var imgArme = {};
var imgMonstre = {};
var imgPersoN = {};
var particles = [];
var imgBoat = new Image();
imgBoat.src = "images/heros/boat.png";
var figer = 0;
var edition = 0;
var scrollX = 0;
var scrollY = 0;
var teleport = [0,0];
var vecteurs = [[-1,0],[0,1],[1,0],[0,-1]];
var imgArbre = ["arbre0","herbe0","soleil","outDoor","monsters","return","herbe1","herbe2"];
var nDalle = 0;
var imgEnnemi = ["palmiste"];
var mouse = [0,0];
var editObject = [["outDoor","outDoor","outDoor","outDoor","monsters"],["outDoor","outDoor","outDoor","outDoor","monsters"],["outDoor","outDoor","outDoor","outDoor","monsters"],["outDoor","outDoor","outDoor","outDoor","monsters"],["outDoor","outDoor","outDoor","outDoor","monsters"],["outDoor","outDoor","outDoor","outDoor","monsters"]];
var editHand = ["outDoor","outDoor","outDoor","outDoor","monsters"];
var editnumber = 0;
var editArray = {"outDoor":["rien","arbre0","herbe0","herbe1","herbe2","return"],"monsters":["palmiste","return"]};
var onSea = 0;
var waves = [];
var goto = "";
var boatPosition = [200,100];
var onSeaIsland = [];
var casePencil = [0,0];
var editM = 0;
var hookShots = [];
var objetMort = 0;
var savedMap,savedHouseMap;
var respawnPoint = [0,8];
var markedLevels = [];
var islandData = {};
var fondfond = new Image();
var fondInvent = new Image();
fondInvent.src = "images/menu4.png";
var imgCinema = [new Image,new Image];
var cinematicos = 0;
var sideEdit = ["outDoor","outDoor","outDoor","outDoor","monsters"];
var sideSelect = -1;

// programme

function rnd(max){
    return Math.floor(Math.floor(Math.random()*max));
}

function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.setAttribute("width",W);
    canvas.setAttribute("height",H);
}

function save(){
    figer = 1;
    alert("Sauvegarde en cours, cela peut prendre du temps mais pas toujours. Si vous lisez ce message c'est que vous êtes poilu des pieds.");
    var ilesDif = [];
    var i = 0;
    for(var key in iles){
        ilesDif[i] = [key,[],[]];
        savedMap[key].obj.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        if (f != iles[key].obj[y][x]) ilesDif[i][1].push([y,x,iles[key].obj[y][x]]);
                    }
                );
            }
        );
        savedMap[key].alti.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        if (f != iles[key].alti[y][x]) ilesDif[i][2].push([y,x,iles[key].alti[y][x]]);
                    }
                );
            }
        );
        i ++;
    }
    var ilesDifHouse = [];
    var i = 0;
    for(var key in interieurs){
        ilesDifHouse[i] = [key,[],[]];
        savedHouseMap[key].obj.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        if (f != interieurs[key].obj[y][x]) ilesDifHouse[i][1].push([y,x,interieurs[key].obj[y][x]]);
                    }
                );
            }
        );
        savedHouseMap[key].alti.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        if (f != interieurs[key].alti[y][x]) ilesDifHouse[i][2].push([y,x,interieurs[key].alti[y][x]]);
                    }
                );
            }
        );
        i ++;
    }
    var whereAmI = [out,goto];
    window.localStorage.setItem("whereAmI",JSON.stringify(whereAmI));
    window.localStorage.setItem("ilesDif",JSON.stringify(ilesDif));
    window.localStorage.setItem("ilesDifHouse",JSON.stringify(ilesDifHouse));
    window.localStorage.setItem("heros",JSON.stringify(heros));
    window.localStorage.setItem("quests",JSON.stringify(quests));
    window.localStorage.setItem("questObj",JSON.stringify(questObj));
    window.localStorage.setItem("objInvent",JSON.stringify(objInvent));
    window.localStorage.setItem("boatPosition",JSON.stringify(boatPosition));
    alert("Sauvegarde terminée. J'espère que ce n'était pas trop long.");
    figer = 0;
}

function unSave(){
    window.localStorage.setItem("ilesDif",JSON.stringify(-1));
    window.location.reload();
}

function precharge(){
    ctx.fillrect = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    fondfond.src = "images/Title.png";
    fondfond.onload = function(){
        ctx.drawImage(fondfond,0,0,W,H);
        savedMap = JSON.parse(JSON.stringify(iles));
        savedHouseMap = JSON.parse(JSON.stringify(interieurs));
        var ilesDif = JSON.parse(window.localStorage.getItem("ilesDif"));
        if (ilesDif != null && ilesDif != -1){
            ilesDif.forEach(
                function(e){
                    e[1].forEach(
                        function(f){
                            if (iles[e[0]].obj[f[0]] != undefined) iles[e[0]].obj[f[0]][f[1]] = f[2];
                        }
                    );
                    e[2].forEach(
                        function(f){
                            if (iles[e[0]].alti[f[0]] != undefined) iles[e[0]].alti[f[0]][f[1]] = f[2];
                        }
                    );
                }
            );
            var ilesDifHouse = JSON.parse(window.localStorage.getItem("ilesDifHouse"));
            ilesDifHouse.forEach(
                function(e){
                    e[1].forEach(
                        function(f){
                            if (interieurs[e[0]].obj[f[0]] != undefined) interieurs[e[0]].obj[f[0]][f[1]] = f[2];
                        }
                    );
                    e[2].forEach(
                        function(f){
                            if (interieurs[e[0]].alti[f[0]] != undefined) interieurs[e[0]].alti[f[0]][f[1]] = f[2];
                        }
                    );
                }
            );
            heros = JSON.parse(window.localStorage.getItem("heros"));
            heros[0].objet = 0;
            heros[1].objet = 0;
            if (heros[0].prim == undefined) heros[0].prim = "blank";
            if (heros[0].etat == undefined) heros[0].etat = 0;
            if (heros[1].etat == undefined) heros[1].etat = 0;
            var where = JSON.parse(window.localStorage.getItem("whereAmI"));
            quests = JSON.parse(window.localStorage.getItem("quests"));
            questObj = JSON.parse(window.localStorage.getItem("questObj"));
            objInvent = JSON.parse(window.localStorage.getItem("objInvent"));
            boatPosition = JSON.parse(window.localStorage.getItem("boatPosition"));
            out = where[0];
            goto = where[1];
            respawnPoint[0] = heros[0].x;
            respawnPoint[1] = heros[0].y;
            if (quests.pencil == undefined) quests.pencil = 0;
            if (goto != ""){
                if (out == 1){
                    niveau = iles[goto].alti;
                    objNiveau = iles[goto].obj;
                    if (iles[goto].particles == undefined){
                        particles = [];
                    }
                    else {
                        particles = iles[goto].particles;
                    }
                }
                else{
                    niveau = interieurs[goto].alti;
                    objNiveau = interieurs[goto].obj;
                    if (interieurs[goto].particles == undefined){
                        particles = [];
                    }
                    else {
                        particles = interieurs[goto].particles;
                    }
                }
                Painter.niveau( niveau );
            }
        }
        else cinematicos = 1;
        charge();
    };
}

function charge(){
    var coeur = ["coeurVide","coeur1","coeur05"];
    var debris = ["pot0","pot1","pot2","pot3","pot4","palmier0","palmier1","palmier2","palmier3","palmier4","herbe0","herbe1","herbe2","herbe3","herbe4","fumeeM","fumeeF","feu0","feu1","feu2","feu3","flamme0","flamme1","hook","chaineA","excla","hitB","rond","eclabousse","rondB","eclabousseB","sword0","sword1","sword2","sword3","pale0","bla"];
    var imgInterface = ["blank","shout"];
    var imgRubis = ["rubisVert"];
    var imgPNJ = ["lambda0"];
    var armes = ["mastersword0","mastersword1","mastersword2","mastersword3","boomerang0","boomerang1","boomerang2","boomerang3","pencil0","pencil1","pencil2","pencil3","pot0","pot1","pot2","pot3","baton0","baton1","baton2","baton3","batonF0","batonF1","batonF2","batonF3"];
    var chargement = imgRubis.length + imgHeros.length + imgArbre.length + imgInterface.length + armes.length + debris.length + coeur.length + (imgEnnemi.length*2) + imgPNJ.length + nDalle;
    imgRubis.forEach(
        function(e,i){
            imgElement[e] = new Image();
            imgElement[e].src = "images/elements/rubis/" + e + ".png";
            imgElement[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    for(var i = 0;i<nDalle;i++){
        imgElement["dalle"+i] = new Image();
        imgElement["dalle"+i].src = "images/elements/dalles/dalle" + i + ".png";
        imgElement["dalle"+i].onload = function(){
            chargement -= 1;
            if (chargement == 0) animation();
        };

    }
    coeur.forEach(
        function(e,i){
            imgMenu[e] = new Image();
            imgMenu[e].src = "images/interface/" + e + ".png";
            imgMenu[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        });
    debris.forEach(
        function(e,i){
            imgDebris[e] = new Image();
            imgDebris[e].src = "images/elements/debris/" + e + ".png";
            imgDebris[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    imgArbre.forEach(
        function(e,i){
            imgElement[e] = new Image();
            imgElement[e].src = "images/elements/" + e + ".png";
            imgElement[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    imgInterface.forEach(
        function(e,i){
            imgMenu[e] = new Image();
            imgMenu[e].src = "images/interface/" + e + ".png";
            imgMenu[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    armes.forEach(
        function(e,i){
            imgArme[e] = new Image();
            imgArme[e].src = "images/heros/" + e + ".png";
            imgArme[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    imgHeros.forEach(
        function(e,i){
            e.src = "images/heros/heros"+i+".png";
            e.onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    imgEnnemi.forEach(
        function(e,i){
            for (var j = 0;j < 2;j ++){
                var name = e+j;
                imgMonstre[name] = new Image();
                imgMonstre[name].src = "images/ennemis/"+name+".png";
                imgMonstre[name].onload = function(){
                    chargement -= 1;
                    if (chargement == 0) animation();
                };
            }
        }
    );
    imgPNJ.forEach(
        function(e,i){
            imgPersoN[e] = new Image();
            imgPersoN[e].src = "images/PNJ/"+e+".png";
            imgPersoN[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    var bje = [38,39,40,37,101,99,98,97];
    bje.forEach(
        function(e){
            keys[e] = 0;
        }
    );
}

function start(){
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    goto = "tuto";
    out = 4;
    niveau = interieurs["tuto"].alti;
    objNiveau = interieurs["tuto"].obj;
    particles = interieurs["tuto"].particles;
    Painter.niveau( niveau );
    resize();
    Crossed.init(W,H);
    //    canvas.addEventListener("click",function(evt) {
    //                           evt.stopPropagation();
    //                        evt.preventDefault();
    //                          //evt = evt.changedTouches[0];
    //                        var rect = canvas.getBoundingClientRect();
    //                       var x = evt.pageX - rect.left;
    //                       var y = evt.pageY - rect.top;
    //                       click(x, y);
    //                  });
    document.addEventListener(
        "mouseup",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX;
            var y = event.clientY;
            if (onSea == 4) inventclick(x,y);
            else if (onSea == 5) TPclick(x,y);
            else if (edition == 0) {
                if (heros[0].invent[heros[0].objet] == "mastersword") clicSword(x,y);
                return;
            }
            if (onSea == 0){
                if (editHand[editnumber] == "rien"){
                    if (event.button == 0) pencil(x,y,1);
                    else pencil(x,y,-1);
                }
                else{
                    if (event.button == 0) pencil(x,y,editHand[editnumber]);
                    else pencil(x,y,"delete");
                }
            }
        }
    );
    document.addEventListener(
        "resize",
        function (event){
            resize();
        }
    );
    document.addEventListener(
        "wheel",
        function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            if (edition == 0) return;
            if (evt.deltaY > 0 && editnumber > 0) editnumber = (editnumber - 1) % editHand.length;
            else if (evt.deltaY > 0 && editnumber == 0) editnumber = editHand.length - 1;
            else editnumber = (editnumber + 1) % editHand.length;
        });
    document.addEventListener(
        "mousemove",
        function (event){
            mouse[1] = event.clientX;
            mouse[0] = event.clientY;
            if (cinematicos == 6) {
                imgCinema[0][imgCinema[5]] = [mouse[1],mouse[0],1];
                imgCinema[5] = (imgCinema[5] + 1)%imgCinema[0].length;
            }
            else if (edition == 1) casePencil = Painter.case(niveau,mouse[1],mouse[0]);
        }
    );
    document.addEventListener(
        "keydown",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 1;
            Crossed.keysPress(event.keyCode);
            if (event.keyCode == 16 && onSea == 0) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = "";} else{attack(0);}}
            else if (event.keyCode == 32 && onSea == 0) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = "";} else{attack(0);}}
        }
    );
    document.addEventListener(
        "keyup",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 0;
            if (event.keyCode == 17 && onSea == 0) changeArme(0);
            else if (event.keyCode == 77) {
                if (onSea == 1) onSea = 2;
                else if (onSea == 2) onSea = 1;
            }
            else if (event.keyCode == 65){
                if (edition == 1){
                    edition = 0;
                    console.log(JSON.stringify(niveau));
                    console.log(JSON.stringify(objNiveau));
                    console.log(JSON.stringify(ennemis));
                }
                else if (edition == 0) edition = 1;
                else if (onSea == 0){
                    onSea = 6;
                }
                else if (onSea == 6){
                    onSea = 0;
                }
            }
            if (cinematicos == 6){
                imgCinema[8] += 1;
            }
        }
    );
    for(var i = 0;i < 17;i ++){
        waves.push([rnd(W),rnd(H),Math.abs(80 - i * 20)]);
    }
    precharge();
}

function animation(){
    if (cinematicos == 1) cIntro();
    else if (cinematicos == 2) cReveil();
    else if (cinematicos == 3) cShootOut();
    else if (cinematicos == 4) cMask();
    else if (cinematicos == 5) cEnlevement();
    else if (cinematicos == 6) cPencil();
    else {
        fondfond.src = "images/menu5.png";
        fondfond.onload = function(){};
        //if (out == 4) alert("Utilisez les flèches pour vous déplacer et la barre espace pour interagir avec la case en face de vous ou faire disparaître ce message. Allez parler au visage du developpeur pour plus d'infos.");
        ctx.globalAlpha = 1;
        var f = function(t) {
            if (Crossed.testCrossed() == 1){
                if (onSea == 0) draw(t);
                else if (onSea == 5) TPisland();
                else sail(t);
                Crossed.drawMenu(ctx,W,H);
            }
            else{
                try{
                    if (onSea == 0) {action(t); draw();}
                    else if (onSea == 1)sail(t);
                    else if (onSea == 2) drawSea();
                    else if (onSea == 4) drawInvent();
                    else if (onSea == 5) TPisland();
                    else if (onSea == 6) Help();
                } catch(e){console.error(e);}
                if (cinematicos == 0) window.requestAnimationFrame(f);
                else {
                    animation();
                }
            }
        };
        window.requestAnimationFrame(f);
    }
}

function draw() {
    drawCiel();
    ctx.fillStyle = colorSet[out][3];
    ctx.fillRect(0,H/3,W,H);
    if (out == 1){
        waves.forEach(
            function(e){
                waveNiveau(e);
            }
        );
    }
    else if (out == 4){
        waves.forEach(
            function(e,n){
                if (n < 5) preVortexNiveau(e);
            }
        );
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "rgb(100,100,100)";
        waves.forEach(
            function(e,n){
                if (n < 5) vortexNiveau(e);
            }
        );
    }
    if (Math.round(heros[0].y) < 0) drawHeros(0);
    niveau.forEach(
        function(e,y){
            e.forEach(
                function(f,x){
                    Painter.cell( ctx, x, y, f ,0);
                    if (objNiveau[y][x][0] == "main0"){
                        if (edition == 0 && figer == 0){
                            objNiveau[y][x][1] -=1;
                            if (objNiveau[y][x][1] == 0){
                                objNiveau[y][x][0] = "main1";
                                boomerang.push({"x":x,"y":y,"vx":0,"vy":0,"sx":x,"sy":x,"r":0,"alti":niveau[y][x],"sens":objNiveau[y][x][2],"endu":10,"content":[]});
                            }
                        }
                    }
                    Painter.img( ctx, x, y, f, imgElement[objNiveau[y][x][0]] );
                }
            );
            heros.forEach(
                function(h,n){
                    if (y == Math.round(h.y)) drawHeros(n);
                }
            );
            ennemis.forEach(
                function(a,m){
                    if (y-Math.round(a.y) == 0) drawEnnemi(m);
                }
            );
            boomerang.forEach(
                function(f,i){
                    if ((y == f.y) | (f.vy > 0 && y == f.y + 1)){
                        Painter.imgBoomerang( ctx, f.x + f.vx/50, f.y + f.vy/50, f.alti, f.r, imgElement["boomerang"] );
                        f.r += 0.5;
                        if (f.vx == 0 && f.vy == 0){
                            if (f.endu > 5){
                                ennemis.forEach(
                                    function(e,gg){
                                        if (Math.round(e.x) == f.x && Math.round(e.y) == f.y){
                                            hitEnnemis(gg,0,f.sens);
                                            f.endu = 10 - f.endu;
                                            f.sens = (f.sens+2)%4;
                                        }
                                    }
                                );
                            }
                            if (f.endu == 0){
                                objNiveau[f.y][f.x].splice(0,0,"boomerang");
                                f.content.forEach(function(g){objNiveau[f.y][f.x].splice(1,0,g);});
                                boomerang.splice(i,1);
                                return;
                            }
                            else if (f.endu == 5) f.sens = (f.sens+2)%4;
                            if ((f.y + vecteurs[f.sens][0]) <= -1 | (f.x + vecteurs[f.sens][1]) <= -1 | (f.y + vecteurs[f.sens][0]) >= niveau.length | (f.x + vecteurs[f.sens][1]) >= niveau[f.y].length){
                                if (f.endu <= 5) f.endu = 1;
                                else {f.endu = 11 - f.endu; f.sens = (f.sens+2)%4;}
                            }
                            else {
                                var machin = objNiveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]];
                                var truc = machin[0];
                                if (niveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]] > f.alti | (isSolid(f.x +  + vecteurs[f.sens][1],f.y + vecteurs[f.sens][0]) == true && niveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]] == f.alti)){
                                    if (f.endu <= 5) f.endu = 1;
                                    else {f.endu = 11 - f.endu; f.sens = (f.sens+2)%4;}
                                    if (truc == "switch0" | truc == "switch1") changeColor();
                                    else if (truc == "wSwitch0") {waterLevel(1);machin[0] = "wSwitch1";}
                                    else if (truc == "wSwitch1") {waterLevel(-1);machin[0] = "wSwitch0";}
                                    else if (truc == "switch2"){
                                        if (machin[3] == "") objNiveau[machin[2]][machin[1]] = [""];
                                        else if (machin[3] == 1 || machin[3] == -1){
                                            niveau[machin[2]][machin[1]] += machin[3];
                                            Painter.niveau(niveau);
                                        }
                                        else if (machin[3] == "monstre"){
                                            ennemis.push(monstreType(machin[4],machin[1],machin[2]));
                                        }
                                        else {
                                            for (var i = machin.length-1;i>2;i--){
                                                objNiveau[machin[2]][machin[1]].splice(0,0,machin[i]);
                                            }
                                        }
                                        machin[0] = "switch3";
                                    }
                                    else if (truc == "main1"){
                                        machin[0] = "main0";
                                        machin[1] = 120;
                                        boomerang.splice(i,1);
                                        return;
                                    }
                                }
                                else {
                                    f.y += vecteurs[f.sens][0];
                                    f.x += vecteurs[f.sens][1];
                                    f.vy += vecteurs[f.sens][0] * -50;
                                    f.vx += vecteurs[f.sens][1] * -50;
                                }
                            }
                            if ((objNiveau[f.y][f.x][0] == "herbe0" | objNiveau[f.y][f.x][0] == "herbe1" | objNiveau[f.y][f.x][0] == "pot")&&f.alti == niveau[f.y][f.x]) {
                                if (objNiveau[f.y][f.x].length == 1)objNiveau[f.y][f.x][0] = "";
                                else objNiveau[f.y][f.x].splice(0,1);
                                particles.push({n:0,type:"herbe",x:f.x,y:f.y,g:5,alti:niveau[f.y][f.x],lim:10});
                            }
                            else if ((objNiveau[f.y][f.x][0] == "rubisVert" | objNiveau[f.y][f.x][0] == "rubisBleu" | objNiveau[f.y][f.x][0] == "rubisRouge" | objNiveau[f.y][f.x][0] == "cle0" | objNiveau[f.y][f.x][0] == "coeur")&&f.alti == niveau[f.y][f.x]) {
                                f.content.push(objNiveau[f.y][f.x][0]);
                                if (objNiveau[f.y][f.x].length == 1)objNiveau[f.y][f.x][0] = "";
                                else objNiveau[f.y][f.x].splice(0,1);
                            }
                            f.endu -= 1;
                        }
                        else if (f.vy > 0) f.vy -= 5;
                        else if (f.vy < 0) f.vy += 5;
                        else if (f.vx > 0) f.vx -= 5;
                        else if (f.vx < 0) f.vx += 5;
                    }
                }
            );
            particles.forEach(
                function(kgb,iii){
                    if (y == Math.ceil(kgb.y)){
                        if (kgb.type == "fumeeM" || kgb.type == "fumeeF") {drawFumee(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                        else if (kgb.type == "metem") {drawMetem(kgb);kgb.g = 0;}
                        else if (kgb.type == "feu") {drawFire(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                        else if (kgb.type == "flamme") drawFlamme(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti,kgb);
                        else if (kgb.type == "excla") {drawExcla(kgb);kgb.g = 0;}
                        else if (kgb.type == "quake" && kgb.n >= 0) Painter.drawQuake(kgb.n);
                        else if (kgb.type == "hitA" || kgb.type == "hitB") {drawHit(kgb.type,kgb.x,kgb.y,kgb.alti,kgb.n);kgb.g = 0;}
                        else if (kgb.type == "rond" || kgb.type == "rondB") {drawRond(kgb.n,kgb.x,kgb.y,kgb.s,kgb.alti,kgb.type);kgb.g = 0;}
                        else if (kgb.type == "eclabousse" || kgb.type == "eclabousseB") drawEclabousse(kgb.n,kgb.x,kgb.y,kgb.alti,kgb.type);
                        else if (kgb.type == "fadeOut") drawFade(kgb.n);
                        else if (kgb.type == "eole") {drawEole(kgb);kgb.g = 0;}
                        else if (kgb.type == "rocher") {drawRocher(kgb);}
                        else if (kgb.type == "exploM") {drawExploM(kgb);kgb.g = 0;}
                        else if (kgb.type == "bla") {drawBla(kgb);kgb.g = 0;}
                        else if (kgb.type == "pow") {drawPow(kgb);kgb.g = 0;}
                        else if (kgb.type == "texte") {drawTexte(kgb);kgb.g = 0;}
                        else if (kgb.type == "aspire" && kgb.n >= 0) {drawSpire(kgb);kgb.g = 0;}
                        kgb.n += 1;
                        if (kgb.type == "flamme") kgb.alti += kgb.g/150;
                        else kgb.alti += kgb.g/50;
                        kgb.g -= 1;
                        if (kgb.n == kgb.lim) {
                            if (kgb.re == 1){
                                kgb.n = - 30 - rnd(6);
                                if (kgb.type == "quake") kgb.n -= 100;
                                else if (kgb.type == "fumeeF"){
                                    kgb.n = -3;
                                    kgb.x = rnd(niveau[0].length);
                                    kgb.y = rnd(niveau.length);
                                }
                            }
                            else{
                                if (kgb.type == "feu") objNiveau[kgb.y][kgb.x] = [""];
                                else if (kgb.type == "rocher"){
                                    if (objNiveau[Math.round(kgb.y)][Math.round(kgb.x)] == [""]) objNiveau[Math.round(kgb.y)][Math.round(kgb.x)][0] =  "rocher";
                                    else {
                                        objNiveau[Math.round(kgb.y)][Math.round(kgb.x)].splice(0,0,"rocher");
                                    }
                                }
                                particles.splice(iii,1);
                            }
                        }
                    }
                }
            );
        }
    );
    if (Math.round(heros[0].y) >= niveau.length) drawHeros(0);
    if (edition == 1 && casePencil[1] != "ah") {
        ctx.globalAlpha = 0.2;
        Painter.cell( ctx, casePencil[1], casePencil[0], niveau[casePencil[0]][casePencil[1]] ,1);
        ctx.globalAlpha = 1;
    }
    drawInterface();
}

function drawHeros(n){
    if (heros[n].stun > 0) {
        heros[n].stun -= 1;
        if (heros[n].stun > 10000){
            return;
        }
        else if (heros[n].stun == 10000){
            heros[n].g = -1;
            heros[n].z += 0.2;
            heros[n].stun = 0;
            if (objNiveau[heros[n].y][heros[n].x] == "avaleur2"){
                objNiveau[heros[n].y][heros[n].x][0] = "avaleur1";
            }
        }
    }
    if (heros[n].mortal > 0){
        heros[n].mortal -= 1;
        if (heros[n].mortal % 4 < 2)return;
    }
    if (heros[n].plane == 1){
        Painter.img(ctx,heros[n].x, heros[n].y,niveau[Math.round(heros[n].y)][Math.round(heros[n].x)],imgElement.marque);
    }
    Painter.img( ctx, heros[n].x, heros[n].y, heros[n].z, imgHeros[heros[n].sens + 4*n + heros[n].imgUp*8] );
    if (heros[n].invent[heros[n].objet] != "blank" && heros[n].imgUp == 0) {
        Painter.img(ctx,heros[n].x,heros[n].y,heros[n].z,imgArme[heros[n].invent[heros[n].objet] + heros[n].sens]);
    }
    if (heros[n].aura != ""){
        Painter.imgScale(ctx,heros[n].x - 0.5,heros[n].y - 1 - 0.5,heros[n].z,heros[n].tAura/40,imgElement[heros[n].aura]);
    }
}

function drawEnnemi(n){
    if (ennemis[n].etat == 1){
        Painter.imgScaleRot( ctx, ennemis[n].x, ennemis[n].y, ennemis[n].z-0.5, 1, ennemis[n].r, imgMonstre[String(ennemis[n].img + ennemis[n].sens)] );
        ennemis[n].r += 0.2;
        if (ennemis[n].x > ennemis[n].ox) ennemis[n].x -= 0.02;
        else if (ennemis[n].x < ennemis[n].ox) ennemis[n].x += 0.02;
        else{
            if (ennemis[n].y > ennemis[n].oy) ennemis[n].y -= 0.02;
            else if (ennemis[n].y < ennemis[n].oy) ennemis[n].y += 0.02;
            else{
                ennemis[n].etat = 0;
                if (ennemis[n].pv <= 0) {
                    particles.push({n:0,type:"fumeeM",x:Math.round(ennemis[n].x),y:Math.round(ennemis[n].y),g:0,alti:ennemis[n].z,lim:40});
                    particles.push({n:0,type:"exploM",x:Math.round(ennemis[n].x),y:Math.round(ennemis[n].y),g:0,alti:ennemis[n].z,lim:80});
                    ennemis[n].pv = 0;
                    if (objetMort > 0){
                        var xxx = 0;
                        ennemis.forEach(
                            function (e,i){
                                if (e.pv > 0){
                                    xxx = 1;
                                }
                            }
                        );
                        if (xxx == 0){
                            for (var i = 0;i < objetMort;i++){
                                var exit = 0;
                                objNiveau.forEach(
                                    function(e,i){
                                        e.forEach(
                                            function(f,j){
                                                if (f[0] == "coffre3"){
                                                    if (f.length > 1) f.splice(0,1);
                                                    else f[0] = "";
                                                }
                                            }
                                        );
                                    }
                                );
                            }
                        }
                    }
                    if (ennemis[n].img == "bossFeu") {
                        particles.push({n:0,type:"quake",x:0,y:0,g:0,alti:0,lim:50});
                        particles.push({n:-34,type:"fumeeF",x:10,y:6,g:0,alti:0,lim:40});
                        particles.push({n:-40,type:"fumeeF",x:4,y:7,g:0,alti:0,lim:40});
                        niveau  = [[-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1],[-1,2,2,2,2,2,2,2,0,2,2],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[-1,2,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0]];
                        Painter.niveau(niveau);
                    }
                    else if (ennemis[n].img == "mCorps"){
                        ennemis.forEach(
                            function (e,n){
                                hitEnnemis(n,10000,4);
                            }
                        );
                    }
                }
            }
        }
        if (Math.abs(ennemis[n].ox - ennemis[n].x + ennemis[n].oy - ennemis[n].y) < 0.02){
            ennemis[n].x = ennemis[n].ox;
            ennemis[n].y = ennemis[n].oy;
        }
        ennemis[n].z -= ennemis[n].g;
        ennemis[n].g += 0.004;
    }
    else{
        if (ennemis[n].pv == 0) return;
        Painter.img( ctx, ennemis[n].x, ennemis[n].y, ennemis[n].z, imgMonstre[String(ennemis[n].img + ennemis[n].act)] );
        var altitude = niveau[Math.round(ennemis[n].y)][Math.round(ennemis[n].x)];
        if (ennemis[n].z > altitude) {
            ennemis[n].z -= ennemis[n].g;
            ennemis[n].g += 0.05;
        }
        else if (ennemis[n].z < altitude){
            ennemis[n].g = 0;
            ennemis[n].z = altitude;
        }
        if (edition == 0 && figer == 0){
            if (ennemis[n].stun > 0) ennemis[n].stun -= 1;
            choseDirection(n);
        }
        if (ennemis[n].stop == 0){
            ennemis[n].n += 1;
        }
    }
}


function drawInterface(){
    if (edition == 1){
        sideSelect = -1;
        sideEdit.forEach(
            function(el,i){
                var yel = i*(H/(3*sideEdit.length)*2) + H/6;
                var epel = H/(3*sideEdit.length)*2;
                var hautel = epel/8*7;
                if (mouse[1] > W - epel){
                    if (mouse[0] > yel && mouse[0] < yel + hautel){
                        epel = epel * 1.3;
                        sideSelect = i;
                    }
                }
                ctx.fillStyle = "rgb(20,178,139)";
                ctx.fillRect(W-epel,yel,epel*1.5,hautel);
                ctx.drawImage(imgElement[el],W-epel,yel,(imgElement[el].width * hautel) / imgElement[el].height,hautel);
            }
        );
        if (editHand[editnumber] != "rien"){
            if (editM == 0 || editHand[editnumber] == "return") ctx.drawImage(imgElement[editHand[editnumber]],mouse[1],mouse[0]- imgElement[editHand[editnumber]].height / 2);
            else ctx.drawImage(imgMonstre[editHand[editnumber]+2],mouse[1],mouse[0]- imgMonstre[editHand[editnumber]+2].height / 2);
            if (editHand[editnumber] == "tele"){
                objNiveau.forEach(
                    function (ee,YY){
                        ee.forEach(
                            function (fe,XX){
                                if (fe[0] == "teleport"){
                                    ctx.globalAlpha = 0.1;
                                    Painter.cell( ctx, XX, YY, niveau[YY][XX] ,1);
                                    ctx.globalAlpha = 1;

                                }
                            }
                        );
                    }
                );
            }
        }
    }
    else {
        ctx.drawImage(imgMenu[heros[0].invent[heros[0].objet]],W/2-25,5);
    }
    if (editPlate == 1 || editPlate == 2){
        ctx.beginPath();
        ctx.arc(mouse[1],mouse[0],15,-Math.PI,Math.PI);
        ctx.stroke();
    }

}

function attack(n,x){
    if (edition == 1){
        if (editPlate == 0){
            edition = 0;
            casePencil = ["ah","ah"];
            console.log(JSON.stringify(niveau));
            console.log(JSON.stringify(objNiveau));
            console.log(JSON.stringify(ennemis));
        }
        return;
    }
    if (heros[n].imgUp != 0){
        if (heros[n].plane == 1) {
            heros[n].plane = 0;
            heros[n].imgUp = 0;
            heros[n].imgN = 0;
        }
        return;
    }
    if (heros[n].g == 0) {heros[n].g = -heros[n].saut; heros[n].z += 0.01;}
    if (x == 1) {
        var use = heros[0].prim;
    }
    else var use = heros[n].invent[heros[n].objet];
    if (use == "boat"){
        if (heros[n].etat != 0) return;
        if (heros[n].y + vecteurs[heros[n].sens][0] == niveau.length || heros[n].y + vecteurs[heros[n].sens][0] == -1 || heros[n].x + vecteurs[heros[n].sens][1] == niveau[0].length || heros[n].x + vecteurs[heros[n].sens][1] == -1){
            if (out == 1){
                boatPosition[1] = heros[n].x + vecteurs[heros[n].sens][1] + boatPosition[1];
                boatPosition[0] = heros[n].y + vecteurs[heros[n].sens][0] + boatPosition[0];
                goto = "";
                onSea = 1;
                return;
            }
        }
        else if (niveau[heros[n].y+vecteurs[heros[n].sens][0]][heros[n].x+vecteurs[heros[n].sens][1]] == -1){
            if (out == 1){
                boatPosition[1] = heros[n].x + vecteurs[heros[n].sens][1] + boatPosition[1];
                boatPosition[0] = heros[n].y + vecteurs[heros[n].sens][0] + boatPosition[0];
                goto = "";
                onSea = 1;
                return;
            }
        }
    }
    var controlKeys = [[38,39,40,37],[101,99,98,97]];
    var grassContent = ["","","","rubisVert","rubisVert","rubisBleu"];
    var truc = objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0];
    if ((truc == "coffre0" || truc == "porte0" || truc == "pot" || truc == "PNJ" || truc == "checkPoint" || truc == "unCheckPoint") && niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] == niveau[heros[n].y][heros[n].x]){
        if (truc == "coffre0"){
            Crossed.improve();
            objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = "coffre1";
            if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].length > 1)donnerHeros(objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][1],n);
            else donnerHeros("",n);
        }
        else if (truc == "porte0"){
            if (heros[n].cles > 0) {objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = ""; heros[n].cles -= 1;}
            else alert("Cette porte est verouillée.");
        }
        else if (truc == "PNJ"){
            if (alerting == 0){
                questPNJ(heros[n].x + vecteurs[heros[n].sens][1],heros[n].y + vecteurs[heros[n].sens][0]);
                say(objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][2],heros[n].x + vecteurs[heros[n].sens][1],heros[n].y + vecteurs[heros[n].sens][0]);
            }
            else unsay();
        }
        else if (truc == "pot"){
            if (heros[n].etat != 0) return;
            if (x == 1){
                if (heros[0].prim == "blank"){
                    heros[0].prim = "pot";
                }
                else{
                    return;
                }
            }
            else {
                heros[n].invent.push("pot");
                heros[n].objet = heros[n].invent.length - 1;
            }
            if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].length > 1) objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].splice(0,1);
            else objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = "";
        }
        else if (truc == "checkPoint"){
            save();
        }
        else if (truc == "unCheckPoint"){
            unSave();
        }
    }
    else if (heros[n].etat == 0){
        if (use == "mastersword"){
            var machin = objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]];
            var truc = machin[0];
            particles.push({n:0,type:"sword",x:heros[n].x + (vecteurs[heros[n].sens][1]/2) + vecteurs[heros[n].sens][0]/5,y:heros[n].y + vecteurs[heros[n].sens][0]/2,g:0,alti:heros[n].z + Math.abs(vecteurs[heros[n].sens][1]/6),lim:10,sens:heros[n].sens});
            heros[n].imgUp = 1;
            heros[n].imgN = 10;
            if (niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] != niveau[heros[n].y][heros[n].x]) return;
            if (truc == "herbe0" | truc == "herbe1" | truc == "pot" | truc == "palmier"){
                if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].length > 1){
                    objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].splice(0,1);
                }
                else {
                    objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = grassContent[rnd(grassContent.length - 1)];
                }
                if (truc == "herbe0" || truc == "herbe1") particles.push({n:0,type:"herbe",x:heros[n].x + vecteurs[heros[n].sens][1],y:heros[n].y + vecteurs[heros[n].sens][0],g:5,alti:niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]],lim:10});
                else if (truc == "palmier") particles.push({n:0,type:"palmier",x:heros[n].x + vecteurs[heros[n].sens][1],y:heros[n].y + vecteurs[heros[n].sens][0],g:5,alti:niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]],lim:15});
            }
            else if (truc == "switch0" || truc == "switch1") changeColor();
            else if (truc == "wSwitch0") {waterLevel(1);machin[0] = "wSwitch1";}
            else if (truc == "wSwitch1") {waterLevel(-1);machin[0] = "wSwitch0";}
            else if (truc == "switch2"){
                if (machin[3] == "") objNiveau[machin[2]][machin[1]] = [""];
                else if (machin[3] == 1 || machin[3] == -1){
                    niveau[machin[2]][machin[1]] += machin[3];
                    Painter.niveau(niveau);
                }
                else if (machin[3] == "monstre"){
                    ennemis.push(monstreType(machin[4],machin[1],machin[2]));
                }
                else {
                    for (var i = machin.length-1;i>2;i--){
                        objNiveau[machin[2]][machin[1]].splice(0,0,machin[i]);
                    }
                }
                machin[0] = "switch3";
            }
            ennemis.forEach(
                function(e,gg){
                    if (Math.round(e.x) == heros[n].x + vecteurs[heros[n].sens][1] && Math.round(e.y) == heros[n].y + vecteurs[heros[n].sens][0]){
                        hitEnnemis(gg,1,heros[n].sens);
                    }
                }
            );
        }
        else if (use == "boomerang"){
            boomerang.push({"x":heros[n].x,"y":heros[n].y,"vx":0,"vy":0,"sx":heros[n].x,"sy":heros[n].y,"r":0,"alti":niveau[heros[n].y][heros[n].x],"sens":heros[n].sens,"endu":10,"content":[]});
            if (x == 1) heros[n].prim = "blank";
            else{
                if (heros[n].invent.length == 1) heros[n].invent[0] = "blank";
                else {
                    heros[n].invent.splice(heros[n].objet,1);
                }
                if (heros[n].objet >= heros[n].invent.length) heros[n].objet -= 1;
            }
        }
        else if (use == "pencil"){
            editHand = editObject[out];
            editnumber = 1;
            editM = 0;
            if (edition == 0)edition = 1;
            else if (editPlate == 0){
                edition = 0;
                casePencil = ["ah","ah"];
                console.log(JSON.stringify(niveau));
                console.log(JSON.stringify(objNiveau));
                console.log(JSON.stringify(ennemis));
            }
            if (quests.pencil == 0){
                quests.pencil = 1;
                cinematicos = 6;
            }
        }
        else if (use == "pot"){
            pots.push({"alti":niveau[heros[n].y][heros[n].x] + 0.9,"g":15,"x":heros[n].x + heros[n].vx / 50,"y":heros[n].y + heros[n].vy / 50,"ox":heros[n].x + vecteurs[heros[n].sens][1] * 3,"oy":heros[n].y + vecteurs[heros[n].sens][0] * 3,"n":0});
            var nPot = pots.length - 1;

            while (pots[nPot].oy >= niveau.length){pots[nPot].oy -= 1;}
            while (pots[nPot].oy < 0){pots[nPot].oy += 1;}
            while (pots[nPot].ox >= niveau[0].length){pots[nPot].ox -= 1;}
            while (pots[nPot].ox < 0){pots[nPot].ox += 1;}
            while (niveau[pots[nPot].oy][pots[nPot].ox] > pots[nPot].alti) {pots[nPot].ox -= vecteurs[heros[n].sens][1];pots[nPot].oy -= vecteurs[heros[n].sens][0];}
            if (x == 1) heros[0].prim = "blank";
            else{
                heros[n].invent.splice(heros[n].objet,1);
                if (heros[n].objet == heros[n].invent.length) heros[n].objet -= 1;
                if (heros[n].invent.length == 0) heros[n].invent[0] = "blank";
            }
        }
        else if (use == "hookShot"){
            if (heros[n].grap == 0 && heros[n].g == 0){
                heros[n].grap = 1;
                heros[n].plane = 0;
                heros[n].grapD = 0;
                heros[n].nGrap = hookShots.length;
                hookShots.push({x:heros[n].x,y:heros[n].y,s:heros[n].sens,z:heros[n].z,chaine:[[heros[n].x,heros[n].y],[heros[n].x,heros[n].y],[heros[n].x,heros[n].y],[heros[n].x,heros[n].y],[heros[n].x,heros[n].y]]});
            }
        }
        else if (use == "parachale"){
            if (heros[n].grap == 0 && heros[n].z != niveau[heros[n].y][heros[n].x]){
                heros[n].plane = 1;
                heros[n].imgUp = 2;
                heros[n].imgN = 0;
                heros[n].z = Math.ceil(heros[n].z);
            }
        }
        else if (use == "maskWind"){
            cinematicos = 4;
            heros[n].etat = 1;
            imgCinema[0] = n;
            imgCinema[1] = "maskWind";
            imgCinema[2] = "hWind";
        }
        else if (use == "lettre"){
            var to = "martin@memora.tolokoban.org";
            var subject = "Niveau Maker's Pencil " + goto + " out="+out;
            var nnn = niveau;
            var ooo = objNiveau;
            var eee = ennemis;
            var to = "martin@memora.tolokoban.org";
            var subject = "Niveau Maker's Pencil out=" + out + " part A";
            var body = JSON.stringify(nnn);

            var link = document.createElement('a');
            link.setAttribute(
                'href',
                'mailto:' + to
                    + "?subject=" + encodeURI(subject)
                    + "&body=" + encodeURI(body)
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            subject = "Niveau Maker's Pencil out=" + out + " part B";
            body = JSON.stringify(ooo);

            link = document.createElement('a');
            link.setAttribute(
                'href',
                'mailto:' + to
                    + "?subject=" + encodeURI(subject)
                    + "&body=" + encodeURI(body)
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            subject = "Niveau Maker's Pencil out=" + out + " part C";
            body = JSON.stringify(eee);

            link = document.createElement('a');
            link.setAttribute(
                'href',
                'mailto:' + to
                    + "?subject=" + encodeURI(subject)
                    + "&body=" + encodeURI(body)
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            markedLevels.forEach(
                function (ee){
                    if (ee[0] != goto){
                        if (ee[1] == 1){
                            var llevel = iles[ee[0]];
                        }
                        else {
                            var llevel = interieurs[ee[0]];
                        }
                        var nnn = llevel.alti;
                        var ooo = llevel.obj;
                        var eee = llevel.ennemis;
                        var to = "martin@memora.tolokoban.org";
                        var subject = "Niveau Maker's Pencil " + ee[0] + " out=" + ee[1] + " part A";
                        var body = JSON.stringify(nnn);

                        var link = document.createElement('a');
                        link.setAttribute(
                            'href',
                            'mailto:' + to
                                + "?subject=" + encodeURI(subject)
                                + "&body=" + encodeURI(body)
                        );
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        subject = "Niveau Maker's Pencil " + ee[0] + " out=" + ee[1] + " part B";
                        body = JSON.stringify(ooo);

                        link = document.createElement('a');
                        link.setAttribute(
                            'href',
                            'mailto:' + to
                                + "?subject=" + encodeURI(subject)
                                + "&body=" + encodeURI(body)
                        );
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        subject = "Niveau Maker's Pencil " + ee[0] + " out=" + ee[1] + " part C";
                        body = JSON.stringify(eee);

                        link = document.createElement('a');
                        link.setAttribute(
                            'href',
                            'mailto:' + to
                                + "?subject=" + encodeURI(subject)
                                + "&body=" + encodeURI(body)
                        );
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            );
        }
    }
}

function donnerHeros(obj,n){
    heros[n].sens = 2;
    heros[n].aura = obj;
    var description = {"":"Vous n'obtenez rien. Tant pis !","arbre0":"Vous obtenez un arbre ! Qu'allez vous bien pouvoir en faire ?","rubisVert":"C'est un rubis vert ! Il vaut 1. C'est le début de la richesse.","rubisBleu":"C'est un rubis bleu ! Il vaut 5 rubis verts. Prenez-en soin.","rubisRouge":"C'est un rubis rouge ! Il vaut 20 rubis verts.Cherissez le de tout votre coeur.","coffre0":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","herbe0":"C'est de l'herbe. Vous trouverez mieux la prochaine fois ...","herbe1":"C'est de l'herbe. Dommage...","coffre1":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","mastersword":"Wow, c'est une fausse mastersword ! La fameuse épée légendaire du héros du vent. Elle ressemble beaucoup à l'originale. Peut-être vous sera-t-elle utile.Assignez la avec ctrl ou i et attaquez avec la touche maj.","boomerang":"Un boomerang ! Assignez le avec ctrl ou i et utilisez le avec maj. Il va en ligne droite puis reviens sauf s'il touche un obstacle.","porte0":"Vous obtenez une porte verouillée! Ne la gardez pas ...","cle0":"Vous obtenez une clé ! Elle sert à ouvrir les portes mais elle ne sert qu'une seule fois. Utilisez la à bon escient !","cle1":"C'est un trousseau de clé. On trouve 5 clés dessus. Quel chance !","pencil":"Vous obtenez le pinceau du créateur. Il vous permet de modifier les alentours à volonté. Assignez le avec ctrl ou i puis appuyez sur maj pour déchainer votre créativité. Appuyer sur a si vous avec besoin d'aide durant son utilisation.","boat":"Vous trouvez un bateau. Utilisez le pour naviquer vers de nouvelles aventures. Pour cela, mettez vous face à une case de mer et appuyez sur maj.","pot":"C'est un pot de fleur !!! Attention c'est fragile.","fragment":"Un receptacle de coeur ! Vous gagnez un coeur supplémentaire et tous vos coeurs sont regénérés.","coeur":"C'est un coeur ! Cela devrait vous permettre de vous soigner. Ne me demandez pas comment.","lettre":"C'est une lettre metaphysique !! Elle vous permet de briser le 4eme mur en envoyant l'île dans laquelle vous vous trouvez au créateur du jeu. Si elle est jugée interessante, elle sera intégrée dans le jeu. A vos pinceaux, créateurs de tous poils !!!","tabouret":"Un vieux tabouret moche. En plus il ne ressemble pas à un tabouret mais plutôt à une table basse.","fleur2":"Un vase rempli de fleur !!! Voilà qui ferait plaisir à votre amant.","table0":"Une moitié de table ... Surtout ne croquez pas dedans !","table1":"C'est une demi-table. C'est aussi inutile que déplaisant à voir.","etagere":"Une etagere. Mais qu'est ce qu'il y a dedans ?","coffre1":"Vous obtenez un coffre déjà ouvert. Gné ????????","house0":"Woaw ! Mais c'est une maison ! Posez la avant d'avoir une crampe aux bras.","house1":"Une moitié de maison. Il est difficile d'avoir un meilleur rapport inutilité/encombrement.","house2":"Vous obtenez une moitié de maison. Vous restez sans voix.","house3":"Mais qu'est ce que c'est que cette horreur ???","house4":"Vous obtenez une moitié de maison. Le doute s'insinue en vous : et si tout était lié ?","armure":"Un bouclier et des épées !!! Pas de bol, c'est en plastique...","torche":"Pourquoi avoir mis une torche dans un coffre ? Pourquoi ?","rubisBlanc":"C'est le légendaire rubis blanc. Il vaut 10 000 rubis verts !!! Votre fortune est faite.","stele":"Ils arrivent ...","aiguille":"Vous avez découvert une aiguille magnetisée. C'est un des trois élements de la boussole.","palmier":"Vous obtenez un palmier. Tout est dit.","plate":"Un interrupteur au sol. Je suis presque certain que ça n'a rien à faire dans vos mains.","hookShot":"C'est un grappin, il permet d'aggriper un objet solide afin d'être tracté jusqu'à lui. Assignez le avec ctrl ou i et utilisez le avec maj. Il peut parcourir jusqu'à 5 cases !","statue0":"C'est une statue, elle vous dit quelqu'un mais impossible de savoir qui.","vitre":"Vous avez découvert une vitre de boussole. C'est un des trois éléments nécéssaires à la fabrication de la boussole des éléments. C'est sans doute peu utile une vitre, vu comme ça mais c'est très pratique pour éviter que le cadran soit plein de poussière !","corps":"Vous obtenez le corps de la boussole. Vous voilà rempli d'une joie indiscible ! On dit que le grand Linebeck s'en serait un jour servi !","parachale":"C'est un parachale ! Il permet de planer sur de courtes distances. Assignez le avec ctrl ou i et utilisez le avec maj quand vous êtes en l'air.","baton":"C'est un bâton mojo. Il peut s'enflammer et c'est plutôt badass mais faites vite avant qu'il ne se consumme entierement.","maskWind":"Vous obtenez un masque.","bush0":"Un buisson !!! Voilà voilà. C'est un peu decevant n'est ce pas."};
    alert(description[obj]);
    figer = 1;
    if (obj == "rubisVert") heros[n].rubis += 1;
    else if (obj == "rubisBleu") heros[n].rubis += 5;
    else if (obj == "rubisRouge") heros[n].rubis += 20;
    else if (obj == "mastersword" || obj == "hookShot" || obj == "boomerang" || obj == "pencil" || obj == "lettre" || obj == "boat" || obj == "pot" || obj == "parachale" || obj == "baton" || obj == "maskWind"){
        addObj(obj,n);
    }
    else if (obj == "cle0") {heros[n].cles += 1;}
    else if (obj == "cle1") {heros[n].cles += 5;}
    else if (obj == "fragment") {if (heros[n].vieTotale<20){heros[n].vieTotale += 1;}heros[n].vie = heros[n].vieTotale;}
    else if (obj == "rubisRouge") heros[n].rubis += 10000;
    else if (obj == "aiguille") quests.boussole += 2;
    else if (obj == "vitre") quests.boussole += 3;
}

function addObj(type,n){
    if (heros[n].invent.length < 5){
        heros[n].invent.push(type);
        heros[n].objet = heros[n].invent.length - 1;
    }
    else if (n == 0 && heros[0].prim == "blank"){
        if (heros[0].prim == "blank") heros[0].prim = type;
    }
    else{
        objInvent.push(type);
    }
}

function changeColor(){
    objNiveau.forEach(
        function(e){
            e.forEach(
                function(f){
                    if (f[0] == "switch0") f[0] = "switch1";
                    else if (f[0] == "switch1") f[0] = "switch0";
                    else if (f[0] == "bleu1") f[0] = "bleu0";
                    else if (f[0] == "bleu0") f[0] = "bleu1";
                    else if (f[0] == "rouge1") f[0] = "rouge0";
                    else if (f[0] == "rouge0") f[0] = "rouge1";
                }
            );
        }
    );

}

function GPS(x,y){
    x = Math.floor(x-scrollX);
    y = Math.floor(y-scrollY);
    var coor = Painter.case(niveau,x,y);
    if (coor[0] == "ah") return;
    alert(coor[1] + " ; " + coor[0]);
}

function pencil(x,y,action){
    if (sideSelect != -1){
        editHand = editArray[sideEdit[sideSelect]];
        editnumber = 0;
        if (sideEdit[sideSelect] == "monsters") editM = 1;
        else editM = 0;
        return;
    }
    if (action == "gear" || action == "loot" || action == "outDoor" || action == "inDoor" || action == "monsters" || action == "fireTemple" || action == "sky" || action == "special"){
        editHand = editArray[action];
        editnumber = 0;
        if (action == "monsters") editM = 1;
        return;
    }
    x = Math.floor(x-scrollX);
    y = Math.floor(y-scrollY);
    //    if (x < 0 | y < 0 | x > (niveau[0].length)*50 | y > (niveau.length)*50) return;
    var coor = Painter.case(niveau,x,y);
    if (coor[0] == "ah") return;
    if (editPlate == 2){
        if (Math.abs(coor[0]-pressurePlate[3]) > Math.abs(coor[1] - pressurePlate[4])){
            if (coor[0] > pressurePlate[0]){
                var ss = 2;
            }
            else var ss = 0;
        }
        else{
            if (coor[1] > pressurePlate[1]){
                var ss = 1;
            }
            else var ss = 3;
        }
        objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2],0,ss);
        console.log(objNiveau[pressurePlate[0]][pressurePlate[1]]);
        editPlate = 0;
    }
    else if (editPlate == 1 && action != "return"){
        editPlate = 0;
        if (action == 1 || action == -1){
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+1,0,coor[1]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+2,0,coor[0]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+3,0,action);
        }
        else if (action == "delete"){
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+1,0,coor[1]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+2,0,coor[0]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+3,0,"");
        }
        else if (editM == 1){
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+1,0,coor[1]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+2,0,coor[0]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+3,0,"monstre");
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+4,0,action);
        }
        else{
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+1,0,coor[1]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+2,0,coor[0]);
            objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+3,0,action);
            if (action == "plate" || action == "switch2"){
                editPlate = 1;
                pressurePlate[2] += 3;
            }
            else if (action == "main0" || action == "main1"){
                objNiveau[pressurePlate[0]][pressurePlate[1]].splice(pressurePlate[2]+4,0,50);
                editPlate = 2;
                pressurePlate[2] += 5;
                pressurePlate[3] = coor[0];
                pressurePlate[4] = coor[1];
                return;
            }
        }
    }
    else {
        if (action == 1 || action == -1){
            if (niveau[coor[0]][coor[1]] + action > -2)niveau[coor[0]][coor[1]] += action;
            Painter.niveau(niveau);
        }
        else if (action == "delete"){
            if (editM == 1){
                ennemis.forEach(
                    function(e,i){
                        if (Math.round(e.x) == coor[1] && Math.round(e.y) == coor[0]){
                            ennemis.splice(i,1);
                        }
                    }
                );
            }
            else {
                if (objNiveau[coor[0]][coor[1]].length > 1) objNiveau[coor[0]][coor[1]].splice(0,1);
                else objNiveau[coor[0]][coor[1]][0] = "";
            }
        }
        else if (action == "return"){
            editHand = editObject[out];
            editnumber = 1;
            editM = 0;
        }
        else if (editM == 1){
            ennemis.push(monstreType(action,coor[1],coor[0]));
        }
        else if (action == "mark"){
            console.log(goto);
            var lol = markedLevels.find(
                function(elem){
                    return elem[0] == goto;
                }
            );
            if (lol == undefined)markedLevels.push([goto,out]);
        }
        else if (action == "fastTravel"){
            teleport = [-1,-1];
            onSea = 5;
            islandData = {out:1,ileSet:0,x:0,y:0,select:0};
        }
        else if (action == "tele"){
            var truck = objNiveau[coor[0]][coor[1]][0];
            if (truck == "house0" || truck == "house1" || truck == "house3" || truck == "tele"){
            }
            else objNiveau[coor[0]][coor[1]] = ["teleport",-1,"void",0,0,0,0];
            teleport = [coor[0],coor[1]];
            onSea = 5;
            islandData = {out:1,ileSet:0,x:0,y:0,select:0};
        }
        else{
            if (objNiveau[coor[0]][coor[1]][0] != "") objNiveau[coor[0]][coor[1]].splice(0,0,action);
            else objNiveau[coor[0]][coor[1]][0] = action;
            if (action == "house3" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"house4");
                else objNiveau[coor[0]][coor[1]+1][0] = "house4";
                objNiveau[coor[0]][coor[1]].splice(1,0,"void");
                teleport = [coor[0],coor[1]];
                onSea = 5;
                islandData = {out:1,ileSet:0,x:0,y:0,select:0};
            }
            if (action == "planche0" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"planche1");
                else objNiveau[coor[0]][coor[1]+1][0] = "planche1";
            }

            if (action == "moulin0" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"moulin1");
                else objNiveau[coor[0]][coor[1]+1][0] = "moulin1";
            }
            if (action == "lit0" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"lit1");
                else objNiveau[coor[0]][coor[1]+1][0] = "lit1";
            }
            if (action == "table0" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"table1");
                else objNiveau[coor[0]][coor[1]+1][0] = "table1";
            }
            if (action == "house1" && coor[1] + 1 != objNiveau[coor[0]].length){
                if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"house2");
                else objNiveau[coor[0]][coor[1]+1][0] = "house2";
                objNiveau[coor[0]][coor[1]].splice(1,0,"void");
                teleport = [coor[0],coor[1]];
                onSea = 5;
                islandData = {out:1,ileSet:0,x:0,y:0,select:0};
            }
            if (action == "lambda0"){
                var dia = prompt("Que doit dire ce PNJ ?");
                objNiveau[coor[0]][coor[1]] = ["PNJ","lambda0",dia];
            }
            else if (action == "house0"){
                objNiveau[coor[0]][coor[1]].splice(1,0,"void");
                teleport = [coor[0],coor[1]];
                onSea = 5;
                islandData = {out:1,ileSet:0,x:0,y:0,select:0};
            }
            else if (action == "coffre2"){
                objNiveau[coor[0]][coor[1]][0] = "coffre3";
            }
            else if (action == "main0"){
                objNiveau[coor[0]][coor[1]] = ["main0",50];
                editPlate = 2;
                pressurePlate = [coor[0],coor[1],2,coor[0],coor[1]];
            }
            else if (action == "main1"){
                objNiveau[coor[0]][coor[1]] = ["main1",50];
                editPlate = 2;
                pressurePlate = [coor[0],coor[1],2,coor[0],coor[1]];
            }
            if (action == "plate" || action == "switch2"){
                editPlate = 1;
                pressurePlate = [coor[0],coor[1],0];
            }
        }
    }
}

function hitEnnemis(n,degat,sens){
    if (ennemis[n].pv <= 0 || ennemis[n].etat == 1) return;
    if (ennemis[n].img == "feu" || ennemis[n].img == "scie") return;
    if (ennemis[n].img == "moblin"){
        if (ennemis[n].sens == (sens+2)%4 && sens != 4){
            degat = 0;
        }
    }
    if (ennemis[n].ia == "ball"){
        ennemis[n].sens = sens;
        if (degat == 0) ennemis[n].v = 0.05;
        else ennemis[n].v = 0.1;
        ennemis[n].n = Math.round(1/ennemis[n].v);
        return;
    }
    if (ennemis[n].img == "bossFeu"){
        if (degat == 0) {
            ennemis[n].img = "bossFeuDead";
            ennemis[n].v = 0;
        }
        else {
            return;
        }
    }
    ennemis[n].pv -= degat;

    if (sens != 4) ennemis[n].sens = (sens + 2)%4;
    ennemis[n].stun = 1;
    if (degat == 0) {ennemis[n].stun = 2;particles.push({n:0,type:"hitB",x:Math.round(ennemis[n].x),y:Math.round(ennemis[n].y),g:0,alti:ennemis[n].z,lim:10});}
    else particles.push({n:0,type:"hitA",x:Math.round(ennemis[n].x),y:Math.round(ennemis[n].y),g:0,alti:ennemis[n].z,lim:10});
    ennemis[n].x = Math.round(ennemis[n].x);
    ennemis[n].y = Math.round(ennemis[n].y);
    if (sens < 4 && ennemis[n].img != "mCorps"){
        ennemis[n].ox = ennemis[n].x;
        ennemis[n].oy = ennemis[n].y;
        if (ennemis[n].y + vecteurs[sens][0] < niveau.length){
            if (ennemis[n].x + vecteurs[sens][1] < niveau[ennemis[n].y + vecteurs[sens][0]].length){
                if (niveau[ennemis[n].y][ennemis[n].x] == niveau[vecteurs[sens][0] + ennemis[n].y][vecteurs[sens][1] + ennemis[n].x]){
                    ennemis[n].ox = vecteurs[sens][1] + ennemis[n].x;
                    ennemis[n].oy = vecteurs[sens][0] + ennemis[n].y;
                }
            }
        }
    }
    ennemis[n].g = -0.1;
    ennemis[n].r = 0;
    ennemis[n].etat = 1;
}

function hitHeros(n,degat,sens){
    if (heros[n].mortal > 0) return;
    if (degat == -1) return;
    heros[n].Vx = vecteurs[sens][1]*0.2;
    heros[n].Vy = vecteurs[sens][0]*0.2;
    heros[n].vie -= degat;
    //heros[n].stun = 20;
    //heros[n].mortal = 60;
}

function waterLevel(n){
    niveau.forEach(
        function(e,y){
            e.forEach(
                function(fff,x){
                    niveau[y][x] += n;
                }
            );
        }
    );
    Painter.niveau(niveau);
    Painter.scrollYPlus(30*n);
    heros.forEach(
        function (e){
            e.z += n;
        }
    );
    ennemis.forEach(
        function (e,c){
            ennemis[c].z += n;
            if (e.z < 0){
                ennemis[c].pv = 0;
            }
        }
    );
    boomerang.forEach(
        function(e){
            e.alti += n;
        }
    );
}

function isSolid(x,y){
    var truc = objNiveau[y][x][0];
    if (truc == "arbre0" || truc == "coffre0" || truc == "coffre1" || truc == "porte0" || truc == "bleu0" || truc == "rouge1" || truc == "switch0" || truc == "switch1" || truc == "house0" || truc == "house1" || truc == "house2" || truc == "house3" || truc == "house4" || truc == "pot" || truc == "PNJ" || truc == "fleur2" || truc == "table0" || truc == "table1" || truc == "etagere" || truc == "armure" || truc == "tabouret" || truc == "autel" || truc == "torche" || truc == "torche1" || truc == "lit0" || truc == "lit1" || truc == "stele" || truc == "houseHelp" || truc == "templeFeu0" || truc == "templeEau0" || truc == "templeFeu1"|| truc == "templeFeu2" || truc == "templeEau1"|| truc == "templeEau2" || truc == "palmier" || truc == "arbre1" || truc == "bougie" || truc == "switch2" || truc == "switch3" || truc == "checkPoint" || truc == "unCheckPoint" || truc == "wSwitch0" || truc == "wSwitch1" || truc == "main0" || truc == "main1" || truc == "statue0" || truc == "miniTempleEau" || truc == "moulin0" || truc == "moulin1" || truc == "arbreG3" || truc == "arbreG4" || truc == "arbreG5"|| truc == "canon0" || truc == "canon1" || truc == "canon2" || truc == "eole0" || truc == "houseSky0" || truc == "houseSky1" || truc == "houseSky2"  || truc == "houseSky3" || truc == "arbreEole1"  || truc == "tombe0" || truc == "portail0" || truc == "portail2")  return true;
    else return false;
}

function isFloodable(x,y,carteChelouWeshWesh){
    if( typeof carteChelouWeshWesh === 'undefined' ) carteChelouWeshWesh = objNiveau;
    var truc = carteChelouWeshWesh[y][x][0];
    if (truc == "herbe0" || truc == "pot" || truc == "coffre0" || truc == "coffre1" || truc == "switch0" || truc == "switch1" || truc == "switch2" || truc == "switch3" || truc == "checkPoint" || truc == "herbe1" || truc == "PNJ" || truc == "armure" || truc == "table0" || truc == "table1" || truc == "unCheckPoint" || truc == "fleur2" || truc == "coeur" || truc == "rubisVert" || truc == "rubisRouge" || truc == "rubisBleu" || truc == "rubisBlanc" || truc == "statue0") return true;
    else return false;
}

function say(msg,x,y){
    var alti;
    if (x == undefined || y == undefined){
        x = -8000;
        y = 0;
        alti = 0;
    }
    else {
        if (y < niveau.length && y >= 0 && x < niveau[0].length && x >= 0){
            alti = niveau[y][x];
        }
        else alti = 0;
    }
    alerting = 1;
    particles.push({n:0,type:"bla",x:x,y:y,g:0,alti:alti,lim:-1,content:msg,actu:"",xx:0,yy:0,y2:0,x2:0});
    console.log(particles);
}

function unsay(){
    alerting = 0;
    disalert();
}

function questPNJ(x,y){
    var perso = objNiveau[y][x][1];
    if (perso == "chef"){
        if (quests[perso] == 1){
            objNiveau[y][x][2] = "Tu veux partir à l'aventure ? Je comprends, c'est la fougue de la jeunesse j'imagine. Tu peux prendre mon bateau si tu veux. Si tu navigues droit vers l'est, tu trouveras un vieux sage qui possède une carte maritime. Va lui demander.";
            iles["depart"].obj[12][15] = [""];
            iles["depart"].obj[11][15] = ["PNJ","jehan","Le chef m'a dit que tu pouvais prendre son bateau. Il est juste ici, va le chercher, il t'appartient."];
            quests["jehan"] = 1;
            quests["garcon"] = 2;
        }
    }
    else if (perso == "sage"){
        if (quests.boussole == 2) objNiveau[y][x][2] = "Tu as trouvé l'aiguille magéntisée de la boussole. Félicitations.";
        else if (quests.boussole == 3) objNiveau[y][x][2] = "C'est la vitre de la boussole. Tu me l'as apportée !";
        else if (quests.boussole == 4) objNiveau[y][x][2] = "Je constate que tu as récuperé le corps de la boussole !";
        else if (quests.boussole == 5) objNiveau[y][x][2] = "Je crois savoir que tu portes sur toi l'aiguille et la vitre de la boussole que tu cherche.";
        else if (quests.boussole == 6) objNiveau[y][x][2] = "Je vois que tu es en possession de l'aiguille et du corps de la boussole.";
        else if (quests.boussole == 7) objNiveau[y][x][2] = "Mais c'est la vitre de la boussole ! Et le corps de cette dernière si je ne m'abuse !";
        else if (quests.boussole == 9) objNiveau[y][x][2] = "Tu as trouvé les trois parties de la boussole ! Tu vas pouvoir partir plus loin encore sur les océans.";
        else {
            if (quests.boussoleF == 0)
            {
                objNiveau[y][x][2] = "Bienvenue Link. Le voleur que tu cherches a disparu. Voici cependant la carte des mers que tu peux utiliser avec la touche m quand tu navigues. Pour retrouver le malfrat, il te faudra reconstruire la boussole des elements. Malheureusement, elle a été brisée en 3 morceaux qu'il te faut aller chercher dans les temples du feu, de l'eau et du vent.";
                questObj.carteMaritime = 1;
            }
            else if (quests.boussoleF == 2) objNiveau[y][x][2] = "Il te manque encore les deux morceaux de la boussole qui se trouvent au temple du vent et au temple de l'eau.";
            else if (quests.boussoleF == 3) objNiveau[y][x][2] = "Il te manque encore les deux morceaux de la boussole qui se trouvent au temple du feu et au temple du vent.";
            else if (quests.boussoleF == 4) objNiveau[y][x][2] = "Il te manque encore les deux morceaux de la boussole qui se trouvent au temple de l'eau et au temple du feu.";
            else if (quests.boussoleF == 5) objNiveau[y][x][2] = "Il te faut une derniere pièce pour reconstituer la boussole. Elle se trouve au temple du vent selon mes souvenirs.";
            else if (quests.boussoleF == 6) objNiveau[y][x][2] = "Il te faut une derniere pièce pour reconstituer la boussole. Elle se trouve au temple de l'eau.";
            else if (quests.boussoleF == 7) objNiveau[y][x][2] = "Il te faut une derniere pièce pour reconstituer la boussole. Elle se trouve au temple du feu.";
            else if (quests.boussoleF == 9) objNiveau[y][x][2] = "Tu as finalement reconstitué la boussole. Il n'y a plus de temps à perdre si tu veux retrouver ce satané voleur !";
        }
        quests.boussoleF += quests.boussole;
        quests.boussole = 0;
    }
    else if (perso == "jehan"){
        if (quests[perso] == 0){ quests["chef"] = 1; quests["garcon"] = 1;}
    }
    else if (perso == "garcon"){
        if (quests[perso] == 1) objNiveau[y][x][2] = "Tu cherches le chef ? C'est mon père et il est très fort ! Il habite dans la maison ronde au nord du village.";
        else if (quests[perso] == 2) objNiveau[y][x][2] = "Tu t'en vas ? C'est dommage ... Un jour, moi aussi je partirai à l'aventure sur mon bateau pour vaincre des monstres et sauver une princesse";
    }
    else if (perso == "dev"){
        if (quests.dev == 0){
            objNiveau[8][3] = ["","","Bonjour très cher joueur. Je sais que vous bouillez d'impatience à l'idée de jouer à ce jeu amateur mais laissez moi d'abord vous guider à travers ce  petit tutoriel. Evidemment c'est très mauvais en termes de gameplay d'introduire aussi aprubtement au joueur les commandes d'un jeu mais il va falloir vous en contenter parce que je n'ai pas mieux en stock."];
            objNiveau[8][8] = ["PNJ","dev","Coucou ! Petit FDP !"];
            particles.push({n:0,type:"fumeeF",x:3,y:8,g:0,alti:0,lim:40});
            quests.dev = 1;
        }
        else if (quests.dev == 1){
            objNiveau[8][8] = ["","","Avant de commencer dans le vif du sujet, j'aimerais préciser qu'il s'agit d'un jeu amateur. C'est pourquoi il se peut que vous soyez confronté à des bugs, des graphismes médiocres ou des contrôles crispants. Alors soyez indulgent et n'attendez pas un triple A photoréaliste sans saveur mais irréprochable techniquement. J'espere cependant que vous prendrez plaisir à jouer et qu'au moins vous ne perdrez pas trop votre temps à le faire."];
            try {
                ctx.ellipse(-500,-500,5,1,0,-Math.PI,Math.PI);
            }
            catch (e) {
                objNiveau[8][8] = ["","","Avant de commencer dans le vif du sujet, j'aimerais préciser qu'il s'agit d'un jeu amateur. C'est pourquoi il se peut que vous soyez confronté à des bugs, des graphismes médiocres ou des contrôles crispants. Je constate d'ailleurs que vous risquez d'avoir quelques difficultés, sans doute parce que vous utilisez un firefox antérieur à la version 48.0 ou que vous utilisez Internet Explorer. Il y a peut-être une partie du jeu qui sera fonctionnel mais malheureusement pas l'intégralité ... Désolé."];
            }
            console.log(objNiveau[8][8]);
            objNiveau[6][8] = ["PNJ","dev","Coucou !"];
            particles.push({n:0,type:"fumeeF",x:8,y:8,g:0,alti:0,lim:40});
            quests.dev = 2;
        }
        else if (quests.dev == 2){
            objNiveau[6][8] = ["","","Pour voir un récapitulatif des touches, il suffit d'appuyer sur a. Si vous avez un ami, il peut jouer le mystérieux 2eme joueur. C'est le goron en cosplay en bas à gauche."];
            objNiveau[7][1] = ["PNJ","dev","Coucou ! Petit FDP !"];
            particles.push({n:0,type:"fumeeF",x:8,y:6,g:0,alti:0,lim:40});
            quests.dev = 3;
        }
        else if (quests.dev == 3){
            objNiveau[7][1] = ["","","Un dernier petit détail : ce jeu est aussi un Zelda Maker. Il vous suffit de trouver le pinceau pour créer vos propres niveaux. (le pinceau est disponible quel que soit le mode de jeu choisi)"];
            particles.push({n:0,type:"fumeeF",x:1,y:7,g:0,alti:0,lim:40});
            quests.dev = 4;
        }
    }
}

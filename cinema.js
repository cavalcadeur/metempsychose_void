function cIntro(){
        cIntroCinq();
}

function transition(){
    disalert();
    var timeOut = [];
    for (var i = 0;i<60;i++){
        timeOut[i] = window.setTimeout(drawohoh, i*5);
    }
    for (var i = 0;i<30;i++){
        timeOut[i] = window.setTimeout(drawfafa, (i*10) + 300);
    }
}

function drawohoh(){
    ctx.drawImage(imgCinema[1],rnd(W)-200,rnd(H)-200);
}

function drawfafa(){
    ctx.globalAlpha = 0.1;
    ctx.fillRect(0,0,W,H);
    ctx.globalAlpha = 1;
}

function cIntroDeux(){
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    ctx.drawImage(imgCinema[0],(W-600)/2,H-600);
    imgCinema[0].src = "images/cinematiques/intro2.png";
    alert("Sa légende fit le tour de l'océan. Et nombreux furent ceux qui voulurent marcher sur ses pas. Ce fut le cas de nos deux jeunes héros.");
    var timeoutID = window.setTimeout(transition, 9000);
    var timeoutA = window.setTimeout(cIntroTrois, 9600);
}

function cIntroTrois(){
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    ctx.drawImage(imgCinema[0],(W-500)/2,(H-500)/2);
    imgCinema[0].src = "images/cinematiques/intro3.png";
    alert("Mais le heros ne reparut point et sa legende ne devint plus qu'une rumeur tenue. Les peuples de l'océan le prirent pour mort et son nom tomba dans l'oubli.");
    var timeoutID = window.setTimeout(transition, 9000);
    var timeoutA = window.setTimeout(cIntroQuatre, 9600);
}

function cIntroQuatre(){
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    ctx.drawImage(imgCinema[0],(W-600)/2,(H-600)/2);
    alert("Cependant, certains ne perdirent pas espoir et unirent leurs forces pour retrouver leur heros perdu.");
    var timeoutID = window.setTimeout(transition, 9000);
    var timeoutA = window.setTimeout(cIntroCinq, 9900);
}

function cIntroCinq(){
    imgCinema[0].src = "images/cinematiques/reveil1.png";
    ctx.globalAlpha = 1;
    cinematicos = 0;
    animation();
}

function cReveil(){
    ctx.fillStyle = "rgb(20,80,10)";
    ctx.fillRect(0,0,W,H);
    ctx.drawImage(imgCinema[0],W/2 - 357,H/2 - 250);
    imgCinema[0].src = "images/cinematiques/reveil2.png";
    alert("Open your eyes ...");
    var timeoutID = window.setTimeout(cReveil2, 2500);
}

function cReveil2(){
    disalert();
    var timeoutID = window.setTimeout(cReveil3, 2000);
}

function cReveil3(){
    alert("Je voulais dire : Il est temps de vous reveiller Link et toi aussi, mysterieux deuxieme joueur. S'habiller en vert ne fait pas de vous des héros. Il vous faut partir à l'aventure et dès maintenant.");
    var timeoutID = window.setTimeout(cReveil4, 9000);
}

function cReveil4(){
    disalert();
    ctx.drawImage(imgCinema[0],W/2 - 357,H/2 - 250);
    imgCinema[0].src = "images/cinematiques/reveil3.png";
    imgCinema[1].src = "images/cinematiques/reveil4.png";
    imgCinema[2] = 0;
    imgCinema[3] = 0;
    var timeoutID = window.setTimeout(cReveil5, 2000);
}

function cReveil5(){
    var ff = function(t) {
        fondReveil();
        if (imgCinema[2] < Math.PI/2){
            ctx.save();
            ctx.translate(W/3,H);
            ctx.rotate(-Math.PI/2+imgCinema[2]);
            ctx.drawImage(imgCinema[0],-200,-350);
            ctx.restore();
            ctx.save();
            ctx.translate(W/3*2,H);
            ctx.rotate(Math.PI/2-imgCinema[2]);
            ctx.drawImage(imgCinema[1],-200,-350);
            ctx.restore();
            imgCinema[2] += 0.02;
            window.requestAnimationFrame(ff);
        }
        else if (imgCinema[3] < 100){
            ctx.save();
            ctx.translate(W/3,H);
            ctx.rotate(-Math.PI/2+imgCinema[2]);
            ctx.drawImage(imgCinema[0],-200,-350);
            ctx.restore();
            ctx.save();
            ctx.translate(W/3*2,H);
            ctx.rotate(Math.PI/2-imgCinema[2]);
            ctx.drawImage(imgCinema[1],-200,-350);
            ctx.restore();
            imgCinema[3] += 1;
            window.requestAnimationFrame(ff);
        }
        else cReveilFin();
    };
    window.requestAnimationFrame(ff);
}

function fondReveil(){
    ctx.fillStyle = "rgb(28,134,182)";
    ctx.fillRect(0,0,W,H);
    ctx.fillStyle = "rgb(72,98,178)";
    ctx.fillRect(0,H/4*3,W,H);
    waves.forEach(
        function(e){
            waveReveil(e);
        }
    );
}


function waveReveil(e){
    ctx.fillStyle = "rgb(180,180,215)";
    if (e[1] > H/4*3){
        if (e[2] < 100 && e[2] > 0){
            ctx.beginPath();
            ctx.moveTo(e[0] - 50,e[1] - e[2] / 10);
            ctx.lineTo(e[0],e[1] - 5 - e[2] / 5 - e[2] / 10);
            ctx.lineTo(e[0] + 50,e[1] - e[2] / 10);
            ctx.lineTo(e[0],e[1] - 5 - e[2] / 10 - e[2] / 10);
            ctx.closePath();
            ctx.fill();
        }
        else if (e[2] >= 100){
            ctx.beginPath();
            ctx.moveTo(e[0] - 50,e[1] - e[2] / 10);
            ctx.lineTo(e[0],e[1] - 5 - (200-e[2]) / 5 - e[2] / 10);
            ctx.lineTo(e[0] + 50,e[1] - e[2] / 10);
            ctx.lineTo(e[0],e[1] - 5 - (200-e[2]) / 10 - e[2] / 10);
            ctx.closePath();
            ctx.fill();
        }
    }
    if (e[2] >= 200) {
        e[2] = -rnd(300)-100;
        e[0] = rnd(W);
        e[1] = rnd(H);
    }
    e[2] += 1;
}

function cReveilFin(){
    if (goto == "depart") cMechant();
    else {
        boatPosition = [260,96];
        heros[0].sens = 2;
        heros[1].sens = 2;
        cinematicos = 0;
        animation();
    }
}

function cMechant(){
    imgCinema[0] = new Image();
    imgCinema[0].src = "images/cinematiques/statue.png";
    heros[0].sens = 2;
    heros[0].sens = 2;
    imgCinema[1] = new Image();
    imgCinema[1].src = "images/cinematiques/boat.png";
    imgCinema[1].onload = function(){};
    imgCinema[2] = new Image();
    imgCinema[2].src = "images/cinematiques/engmi.png";
    imgCinema[2].onload = function(){};
    imgCinema[3] = 35;
    imgCinema[4] = 0;
    var ff = function(t) {
        imgCinema[4] += 1;
        ctx.fillStyle = colorSet[out][3];
        ctx.fillRect(0,0,W,H);
        waves.forEach(
            function(e,n){
                waveNiveau(e,n);
            }
        );
        niveau.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        Painter.cell( ctx, x, y, f ,0);
                        if (objNiveau[y][x][0] == "coffre3") objetMort = 1;
                        if (niveau[y][x] < 0){
                            if (isFloodable(x,y) == false){
                                if (objNiveau[y][x][0] == "bleu0" || objNiveau[y][x][0] == "bleu1" || objNiveau[y][x][0] == "rouge0" || objNiveau[y][x][0] == "rouge1") Painter.img( ctx, x + 0.05, y + 0.45, f, imgElement[objNiveau[y][x][0]] );
                                else if (objNiveau[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNiveau[y][x][0]] );
                                else if (objNiveau[y][x][0] == "PNJ") Painter.img( ctx, x,y,f,imgPersoN[objNiveau[y][x][1]]);
                                else Painter.img( ctx, x, y, f, imgElement[objNiveau[y][x][0]] );
                            }
                        }
                        else{
                            if (objNiveau[y][x][0] == "bleu0" || objNiveau[y][x][0] == "bleu1" || objNiveau[y][x][0] == "rouge0" || objNiveau[y][x][0] == "rouge1") Painter.img( ctx, x + 0.05, y + 0.45, f, imgElement[objNiveau[y][x][0]] );
                            else if (objNiveau[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNiveau[y][x][0]] );
                            else if (objNiveau[y][x][0] == "PNJ") Painter.img( ctx, x,y,f,imgPersoN[objNiveau[y][x][1]]);
                            else Painter.img( ctx, x, y, f, imgElement[objNiveau[y][x][0]] );
                        }
                    }
                );
                heros.forEach(
                    function(h,n){
                        if (y == h.y) drawHeros(n);
                        if (h.vy > 0 && y == h.y + 1) drawHeros(n);
                    }
                );
                particles.forEach(
                    function(kgb,iii){
                        if (y == Math.ceil(kgb.y)){
                            if (kgb.type == "herbe" || kgb.type == "palmier") drawDebris(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);
                            else if (kgb.type == "fumeeM" || kgb.type == "fumeeF") {drawFumee(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                            else if (kgb.type == "sword") {drawSword(kgb.n,kgb.lim,kgb.sens,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                            else if (kgb.type == "feu") {drawFire(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                            else if (kgb.type == "flamme") drawFlamme(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti,kgb);
                            else if (kgb.type == "quake") Painter.drawQuake(kgb.n);
                            else if (kgb.type == "hitA" || kgb.type == "hitB") {drawHit(kgb.type,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                            else if (kgb.type == "rond" || kgb.type == "rondB") {drawRond(kgb.n,kgb.x,kgb.y,kgb.s,kgb.alti,kgb.type);kgb.g = 0;}
                            else if (kgb.type == "eclabousse" || kgb.type == "eclabousseB") drawEclabousse(kgb.n,kgb.x,kgb.y,kgb.alti,kgb.type);
                            else if (kgb.type == "fadeOut") drawFade(kgb.n);
                            else if (kgb.type == "eole") {drawEole(kgb);kgb.g = 0;}
                            kgb.n += 1;
                            if (kgb.type == "flamme") kgb.alti += kgb.g/150;
                            else kgb.alti += kgb.g/50;
                            kgb.g -= 1;
                            if (kgb.n == kgb.lim) {
                                if (kgb.type == "feu") objNiveau[kgb.y][kgb.x] = [""];
                                particles.splice(iii,1);
                            }
                        }
                    }
                );
            }
        );
        if (imgCinema[4] < 410)Painter.img( ctx, 17, 1, 2, imgCinema[0] );

        if (imgCinema[3] > 20){
            imgCinema[3] -= 0.1;
        }
        if (imgCinema[3] < 27) {
            Painter.img( ctx, imgCinema[3]+0.5, 1, Math.sin(imgCinema[4]/(Math.PI*10))/10 - 0.5, imgCinema[2] );
            Painter.img( ctx, imgCinema[3], 1, Math.sin(imgCinema[4]/(Math.PI*10))/10 - 1, imgCinema[1] );
        }
        if (imgCinema[3] <= 20){
            heros[0].sens = 1;
            heros[1].sens = 1;
        }
        if (imgCinema[4] == 360){
            imgCinema[5] = 0;
        }
        else if (imgCinema[4] > 360){

            if (imgCinema[4] < 385) imgCinema[5] += 0.04;
            else if (imgCinema[4] >= 410 && imgCinema[4] < 460) {
                imgCinema[5] -= 0.02;
                Painter.img( ctx, 20.5 - 3.5*imgCinema[5],1,2*imgCinema[5], imgCinema[0]);
            }
            else if (imgCinema[4] < 500 && imgCinema[4] > 410){
                Painter.img( ctx, 20.5,1,0, imgCinema[0]);
            }
            else if (imgCinema[4] > 500 && imgCinema[4] < 650){
                imgCinema[3] += 0.2;
            }
            if (imgCinema[4] < 460){
                Painter.img(ctx,20.5 - 3.5*(imgCinema[5]/4),1,3*(imgCinema[5]/4),imgDebris.chaineA);
                Painter.img(ctx,20.5 - 10.5*(imgCinema[5]/4),1,9*(imgCinema[5]/4),imgDebris.chaineA);
                Painter.img(ctx,20.5 - 7*(imgCinema[5]/4),1,3*(imgCinema[5]/2),imgDebris.chaineA);
                Painter.imgBoomerang(ctx,20.5 - 3.5*imgCinema[5],1,3*imgCinema[5],-1,imgDebris.hook);
            }
        }
        if (imgCinema[4] == 650){
            cinematicos = 0;
            animation();
        }
        else window.requestAnimationFrame(ff);
    };
    imgCinema[0].onload = function(){
        window.requestAnimationFrame(ff);
    };

}

function cShootOut(){
    imgCinema[3] = H;
    imgCinema[2] = 54;
    var ff = function(t) {
        ctx.fillStyle = "rgb(28,134,182)";
        ctx.fillRect(0,0,W,H);
        waves.forEach(
            function(e,n){
                if (n < 5) cloudNiveau(e,n);
            }
        );
        if (imgCinema[3] > H/2){
            ctx.drawImage(imgHeros[2],W/2-25,imgCinema[3]);
            ctx.drawImage(imgHeros[6],W/2+25,imgCinema[3]);
            imgCinema[3] -= imgCinema[2];
            imgCinema[2] -= 0.3;
            window.requestAnimationFrame(ff);
        }
        else if (imgCinema[2] > -6){
            waves.forEach(
                function(e,n){
                    if (n < 5){
                        e[1] += imgCinema[2];
                        if (e[1] > H + 70){
                            e[1] = -60;
                            e[0] = rnd(W);
                        }

                    }
                }
            );
            ctx.drawImage(imgHeros[2],W/2-25,imgCinema[3]);
            ctx.drawImage(imgHeros[6],W/2+25,imgCinema[3]);
            imgCinema[2] -= 0.3;
            window.requestAnimationFrame(ff);
        }
        else cReveilFin();
    };
    window.requestAnimationFrame(ff);
}

function cMask(){
    imgCinema[4] = 0;
    imgCinema[5] = 0;
    imgCinema[6] = -1;
    var list = [[10,200],[5,100],[25,300],[3,350],[60,300],[0,260]];
    var timeoutID = window.setTimeout(chargeNewMask, 1000);
    var ff = function(t) {
        imgCinema[5] += 1;
        ctx.fillStyle = "rgb(0,0,5)";
        ctx.fillRect(0,0,W,H);
        ctx.fillStyle = "rgb(100,10,160)";
        ctx.globalAlpha = 0.1;
        list.forEach(
            function (e){
                ctx.beginPath();
                ctx.arc(W/2,H/2-35,e[0] + e[1]*(Math.sin(imgCinema[5]/200 + e[0]/50)+1),Math.PI,-Math.PI);
                ctx.closePath();
                ctx.fill();
            }
        );
        ctx.globalAlpha = 1;
        ctx.drawImage(imgHeros[2+4*imgCinema[0]],W/2 - 25,H/2-70);
        if (imgCinema[6] != -1){
            ctx.globalAlpha = imgCinema[6]/100;
            ctx.fillStyle = "rgb(240,240,240)";
            ctx.fillRect(0,0,W,H);
            ctx.globalAlpha = 1;
            imgCinema[6] -= 1;
        }
        if (imgCinema[4] == 0)ctx.drawImage(imgElement[imgCinema[1]],W/2 - 18,H/2-75,37,52);
        if (imgCinema[4] == 0 || imgCinema[6] > 0) window.requestAnimationFrame(ff);
        else {
            cinematicos = 0;
            Painter.centerScroll(heros[imgCinema[0]].x,heros[imgCinema[0]].y,0,W,H);
            animation();
        }
    };
    window.requestAnimationFrame(ff);
}

function chargeNewMask(){
    imgCinema[3]= 4;
    for (var i = 0; i < 4; i++){
        imgHeros[i+imgCinema[0]*4].src = "images/heros/"+imgCinema[2]+(i+imgCinema[0]*4)+".png";
        imgHeros[i+imgCinema[0]*4].onload = function(){
            imgCinema[3] -= 1;
            if (imgCinema[3] == 0){ imgCinema[4] = 1; imgCinema[6] = 100;}
        };
    }
}

function cEnlevement(){
    imgCinema[0] = 3;
    imgCinema[1] = 9;
    imgCinema[2] = 0;
    imgCinema[3] = 0;
    imgCinema[4] = 0;
    imgCinema[6] = 0;
    imgCinema[7] = new Image();
    imgCinema[7].src = "images/cinematiques/question.png";
    imgCinema[7].onlad = function(){};
    for (var ilk = 1;ilk<7;ilk++){
        imgCinema[7+ilk] = new Image();
        imgCinema[7+ilk].src = "images/cinematiques/grumph" + ilk + ".png";
        imgCinema[7+ilk].onlad = function(){};
    }
    alert("IlhatuinletanolunseatétïAlsalllaMolteâSempicàEtrametitadeoIlha.");
    var ff = function(t) {
        ctx.fillStyle = colorSet[out][3];
        ctx.fillRect(0,0,W,H);
        waves.forEach(
            function(e,n){
                if (n < 5) cloudNiveau(e,n);
            }
        );
        niveau.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        Painter.cell( ctx, x, y, f ,0);
                        if (objNiveau[y][x][0] == "coffre3") objetMort = 1;
                        if (niveau[y][x] < 0){
                            if (isFloodable(x,y) == false){
                                if (objNiveau[y][x][0] == "bleu0" || objNiveau[y][x][0] == "bleu1" || objNiveau[y][x][0] == "rouge0" || objNiveau[y][x][0] == "rouge1") Painter.img( ctx, x + 0.05, y + 0.45, f, imgElement[objNiveau[y][x][0]] );
                                else if (objNiveau[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNiveau[y][x][0]] );
                                else if (objNiveau[y][x][0] == "PNJ") Painter.img( ctx, x,y,f,imgPersoN[objNiveau[y][x][1]]);
                                else Painter.img( ctx, x, y, f, imgElement[objNiveau[y][x][0]] );
                            }
                        }
                        else{
                            if (objNiveau[y][x][0] == "bleu0" || objNiveau[y][x][0] == "bleu1" || objNiveau[y][x][0] == "rouge0" || objNiveau[y][x][0] == "rouge1") Painter.img( ctx, x + 0.05, y + 0.45, f, imgElement[objNiveau[y][x][0]] );
                            else if (objNiveau[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNiveau[y][x][0]] );
                            else if (objNiveau[y][x][0] == "PNJ") Painter.img( ctx, x,y,f,imgPersoN[objNiveau[y][x][1]]);
                            else Painter.img( ctx, x, y, f, imgElement[objNiveau[y][x][0]] );
                        }
                    }
                );
                heros.forEach(
                    function(h,n){
                        if (y == h.y) drawHeros(n);
                        if (h.vy > 0 && y == h.y + 1) drawHeros(n);
                    }
                );
                particles.forEach(
                    function(kgb,iii){
                        if (y == Math.ceil(kgb.y)){
                            if (kgb.type == "herbe" || kgb.type == "palmier") drawDebris(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);
                            else if (kgb.type == "fumeeM" || kgb.type == "fumeeF") {drawFumee(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                            else if (kgb.type == "sword") {drawSword(kgb.n,kgb.lim,kgb.sens,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                            else if (kgb.type == "feu") {drawFire(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                            else if (kgb.type == "flamme") drawFlamme(kgb.type,kgb.n/2,kgb.x,kgb.y,kgb.alti,kgb);
                            else if (kgb.type == "quake") Painter.drawQuake(kgb.n);
                            else if (kgb.type == "hitA" || kgb.type == "hitB") {drawHit(kgb.type,kgb.x,kgb.y,kgb.alti);kgb.g = 0;}
                            else if (kgb.type == "rond" || kgb.type == "rondB") {drawRond(kgb.n,kgb.x,kgb.y,kgb.s,kgb.alti,kgb.type);kgb.g = 0;}
                            else if (kgb.type == "eclabousse" || kgb.type == "eclabousseB") drawEclabousse(kgb.n,kgb.x,kgb.y,kgb.alti,kgb.type);
                            else if (kgb.type == "fadeOut") drawFade(kgb.n);
                            else if (kgb.type == "eole") {drawEole(kgb);kgb.g = 0;}
                            kgb.n += 1;
                            if (kgb.type == "flamme") kgb.alti += kgb.g/150;
                            else kgb.alti += kgb.g/50;
                            kgb.g -= 1;
                            if (kgb.n == kgb.lim) {
                                if (kgb.type == "feu") objNiveau[kgb.y][kgb.x] = [""];
                                particles.splice(iii,1);
                            }
                        }
                    }
                );
            }
        );
        Painter.imgScaleRot( ctx, imgCinema[0]+0.5, imgCinema[1]+0.5, imgCinema[3], 1, imgCinema[6], imgPersoN["windTribe1"] );
        imgCinema[2] += 1;
        if (imgCinema[2] == 200) disalert();
        if (imgCinema[2] >= 300 && imgCinema[2] < 400){
            imgCinema[1] -= 4.2/100;
        }
        else if (imgCinema[2] == 400){
            alert("Vous n'avez pas l'air d'être du coin pour ne pas comprendre ma langue. Vous avez de la chance de m'avoir trouvée ! Je suis la traductrice officielle de la tribu du vent.");
        }
        else if (imgCinema[2] == 700){
            alert("Vous voulez vous rendre au temple du vent ? Je peux vous y emmener si vous le désirez.");
        }
        else if (imgCinema[2] < 850 && imgCinema[2] >= 800){
            Painter.img(ctx,3,428 - imgCinema[2]/2,0,imgMonstre.bossVent1);
        }
        else if (imgCinema[2] >= 850 && imgCinema[2] < 880){
            disalert();
            ctx.globalAlpha = 1-(imgCinema[2]-850)/30;
            ctx.fillStyle = "rgb(255,0,0)";
            ctx.fillRect(0,0,W,H);
            ctx.globalAlpha = 1;
        }
        else if (imgCinema[2] == 880){
            imgCinema[5] = 0.25;
        }
        else if (imgCinema[2] > 880 && imgCinema[2] <= 1000){
            if (imgCinema[2] == 960) imgCinema[5] = 0.125;
            imgCinema[3] += imgCinema[5];
            imgCinema[5] -= 0.0125/2;
            imgCinema[1] += 0.0125;
            imgCinema[6] += 0.2;
        }
        else if (imgCinema[2] > 1040){
            Painter.img(ctx,0,5,0,imgPersoN["windTribe2"]);
            if (imgCinema[2] == 1100) alert("IlhaTadeKishialehoIlha !!!");
            if (imgCinema[2] < 1100 && imgCinema[2] > 1060){
                Painter.img( ctx, 0,5,2,imgCinema[7]);
            }
            else if (imgCinema[2] < 1400 && imgCinema[2] > 1100){
                Painter.img( ctx, 0,5,1,imgCinema[8 + Math.round((imgCinema[2]%18)/3)]);
            }
            else if (imgCinema[2] < 1500 && imgCinema[2] >= 1450){
                disalert();
                ctx.globalAlpha = 1-(1500-imgCinema[2])/50;
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.fillRect(0,0,W,H);
                ctx.globalAlpha = 1;
            }
            else if (imgCinema[2] == 1500){
                imgCinema[4] = 1;
            }
        }
        if (imgCinema[4] == 0) window.requestAnimationFrame(ff);
        else {
            quests.sky = 1;
            cinematicos = 0;
            animation();
        }
    };
    window.requestAnimationFrame(ff);


}


function cPencil(){
    imgCinema[0] = [[-100,-100,0],[-100,-100,0],[-100,-100,0],[-100,-100,0],[-100,-100,0],[-100,-100,0],[-100,-100,0],[-100,-100,0],[-100,-100,0],[-100,-100,0]];
    imgCinema[5] = 0;
    imgCinema[6] = 0;
    imgCinema[1] = W/2;
    imgCinema[2] = H/2;
    imgCinema[4] = 0;
    imgCinema[3] = new Image();
    imgCinema[3].src = "images/cinematiques/sourisT.png";
    imgCinema[3].onload = function(){
        imgCinema[4] = 1;
    };
    imgCinema[7] = 0;
    imgCinema[8] = 0;
    var ff = function(t) {
        ctx.fillStyle = "rgb(0,0,10)";
        ctx.fillRect(0,0,W,H);
        ctx.drawImage(imgPersoN.dev,imgCinema[1] - 25,imgCinema[2] - 35);
        if (imgCinema[4] == 1){
            imgCinema[0].forEach(
                function(e){
                    if (e[2] > 0){
                        ctx.globalAlpha = e[2];
                        ctx.save();
                        ctx.translate(e[0],e[1]);
                        ctx.rotate(e[2]*3);
                        ctx.drawImage(imgCinema[3],-25,-25);
                        ctx.restore();
                        ctx.globalAlpha = 1;
                        e[2] -= 0.1;
                        imgCinema[6] += 1;
                    }
                }
            );
        }
        imgCinema[7] += 1;
        if (imgCinema[7] == 15){
            alert("Rebonjour. Je me permets cette intrusion peu délicate pour vous apprendre les bases du pinceau. C'est pas que j'en ai vraiment très envie mais comme de nombreux joueurs ne l'utilisent pas correctement à cause de sa contre-intuitivité ... Je me vois obligé de faire un petit récapitulatif à la fay. Si vous voyez ce que je veux dire. Appuyez sur une touche pour passer à la suite.");
        }
        else if (imgCinema[8] == 2){
            disalert();
            alert("Le pinceau permets de créer ses propres niveaux. Pour cela il suffit de cliquer sur la case de votre choix pour y placer l'objet qui apparaît à côté de votre curseur. Si vous placez plusieurs objets les uns sur les autres, c'est le dernier placé qui sera visible. Les autres seront cachés dessous.");
        }
        else if (imgCinema[8] == 3){
            disalert();
            alert(" Mais comment choisir l'objet à côté de la souris ? Il faut utiliser la molette pour faire défiler les différents objets. Certains sont des sous-catégories qui meneront vers une autre liste d'objets. Vous pouvez quitter la liste en cliquant avec la flèche bleue. Quand vous cliquez avec une flèche bleue ou une sous-catégorie, rien ne sera rajouté sur l'île.");
        }
        else if (imgCinema[8] == 4){
            disalert();
            alert("Pour passer rapidement d'une sous catégorie à l'autre, il suffit de cliquer sur les icones qui apparaissent à droite. Si il n'y a pas de symbole à côté de votre curseur, pas de panique. C'est un outil qui permet d'élever la case afin de mettre du relief dans le niveau. On peut le trouver dans la sous catégorie : objets d'exterieur.");
        }
        else if (imgCinema[8] == 5){
            disalert();
            if (imgCinema[6] > 1000) alert("Enfin, pour supprimer un objet ou faire descendre une case, il suffit de cliquer avec le bouton droit ou central. Et maintenant je m'en vais. Si un objet vous paraît étrange, appuyez sur a pour avoir une aide rapide à son sujet. Vous m'avez donné mal à la tête à force de tourner la souris de la sorte.");
            else alert("Enfin, pour supprimer un objet ou faire descendre une case, il suffit de cliquer avec le bouton droit ou central. Et maintenant je m'en vais. Si un objet vous paraît étrange, appuyez sur a pour avoir une aide rapide à son sujet.");
            imgCinema[8] += 1;
        }
        else if (imgCinema[8] == 7){
            cinematicos = 0;
        }
        if (cinematicos == 0){
            disalert();
            animation();
        }
        else window.requestAnimationFrame(ff);    
    };
    window.requestAnimationFrame(ff);

    
}

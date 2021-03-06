var Painter = function() {
    var scrollX = 430;
    var scrollY = 0;
    var cellX = 50;  // Largeur d'une cellule.
    var cellY = 30;  // Profondeur.
    var cellZ = 30;
    var cellS = 5;  // Décalage.
    var walls;
    var wallsVert;

    function toX( x, y, z ) {
        return Math.floor( scrollX + x * cellX - y * cellS );
    }

    function toY( x, y, z ) {
        return Math.floor( scrollY + H/3 + y * cellY - z * cellZ);
    }

    function exploMY( n ) {
        n = n/40;
        return (-6*n*n + 6*n)*-100;
    }

    function exploMX( n ) {
        n = n/40;
        return (-8*(n*n*n) + 12.67*(n*n) - 4.67*n)*50;
    }

    function metemN(n){
        return (-0.1*n*n+5*n);
    }

    return {
        realCoor: function(x,y){
            return [toX(x,y,1),toY(x,y,1)];
        },
        niveau: function( level ) {
            editNumber = 1;
            var rows = level.length;
            var cols = level[0].length;
            walls = [];
            wallsVert = [];
            level.forEach(function( row, y ) {
                var line = [];
                walls.push( line );
                var lineVert = [];
                wallsVert.push( lineVert );
                row.forEach(function ( z, x ) {
                    var v = 0;
                    if( y == 0 || level[y - 1][x] < z ) {
                        v += 1;
                    }
                    if( x == cols - 1 || level[y][x + 1] < z ) {
                        v += 2;
                    }
                    if( y == rows - 1 || level[y + 1][x] < z ) {
                        v += 4;
                    }
                    if( x == 0 || level[y][x - 1] < z ) {
                        v += 8;
                    }
                    line.push( v );

                    if( z < 0 ) {
                        // C'est la mer.
                        lineVert.push( [0,0,0] );
                        return;
                    }
                    var lineA = 0;
                    var lineB = 0;
                    var lineC = 0;

                    if( x == 0 ){
                        if (level.length-1 == y) lineA = z + 1;
                        else if (level[y+1][x] < z) lineA = z - level[y+1][x];
                    }
                    else if( level[y][x - 1] < z ) {
                        if (level.length-1 == y){
                            if (level[y][x-1] < -1) lineA = z + 1;
                            else lineA = z - level[y][x - 1];
                        }
                        else{
                            if (level[y][x-1] < -1) lineA = Math.min(z + 1,z - level[y+1][x]);
                            else lineA = Math.min(z - level[y][x - 1],z - level[y+1][x]);
                        }
                    }
                    lineC = y == 0 ? z + 1 : 0;
                    if( y > 0 && level[y - 1][x] < z ) {
                        if (level[y-1][x] < -1) lineC = z + 1;
                        else lineC = z - level[y-1][x];
                    }
                    if( x < cols - 1 ) {
                        lineC = Math.min( lineC, Math.max( 0, z - level[y][x + 1] ) );
                    }
                    lineB = z + 1;
                    if( x < cols - 1 && level[y][x + 1] <= z ) {
                        if (level[y][x+1] < -1) lineB = z + 1;
                        else lineB = z - level[y][x + 1];
                    }
                    else if(x < cols - 1 && level[y][x + 1] >= z) lineB = 0;
                    if( y < rows - 1 ) {
                        lineB = Math.min( lineB, z - level[y + 1][x] );
                    }

                    lineVert.push( [lineA, lineB, lineC] );
                });
            });

            //console.info("[painter] wallsVert=...", wallsVert);
        },

        scroll: function( x, y ) {
            scrollX = x;
            scrollY = y;
        },

        centerScroll: function ( x, y , z , W , H) {
            scrollX = Math.floor(W/2 - x*cellX + y*cellS);
            scrollY = Math.floor(H/2 - H/3 - y*cellY + z*cellZ);
            if (scrollY < 0) scrollY = 0;
        },

        scrollYPlus: function(a) {
            scrollY += a;
        },

        drawQuake: function( n ) {
            scrollX += Math.sin(n)*10;
        },

        drawChain: function(ctx,x,y,x2,y2,z) {
            z += 0.5;
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(toX(x,y,z) + cellX / 2,toY(x,y,z) - cellY / 1.5);
            ctx.lineTo(toX(x2,y2,z) + cellX / 2,toY(x2,y2,z) - cellY / 2);
            ctx.stroke();
        },

        img: function( ctx, x, y, z, img ) {
            if( !img ) return;

            var X = toX( x, y, z ) + cellS / 2 + (cellX - img.width) / 2;
            var Y = toY( x, y, z ) - img.height - cellY / 2;

            ctx.drawImage( img, X, Y );
        },

        imgBoomerang: function( ctx, x, y, z, r, img ) {
            if( !img ) return;

            var X = toX( x, y, z ) + cellS / 2 + (cellX - img.width) / 2;
            var Y = toY( x, y, z ) - img.height - cellY / 2;

            ctx.save();
            ctx.translate(X+12,Y);
            ctx.rotate(r);
            ctx.drawImage(img,-13,-13);
            ctx.restore();
        },
        imgPale: function( ctx, x, y, z, r, img ) {
            if( !img ) return;

            var X = toX( x, y, z ) + cellS / 2 + (cellX - img.width) / 2;
            var Y = toY( x, y, z ) - img.height - cellY / 2;

            ctx.save();
            ctx.translate(X+27.5,Y);
            ctx.rotate(r);
            ctx.drawImage(img,-27.5,-27.5);
            ctx.restore();
        },
        imgScale: function( ctx, x, y, z, s, img ) {
            if( !img ) return;

            var X = toX( x, y, z ) + cellS / 2 + (cellX - img.width) / 2;
            var Y = toY( x, y, z ) - img.height - cellY / 2;

            ctx.save();
            ctx.translate(X+12,Y);
            ctx.scale(s,1);
            ctx.drawImage(img,-img.width/2,-img.height/2);
            ctx.restore();
        },
        imgScaleTot: function( ctx, x, y, z, s, img ) {
            if( !img ) return;

            var X = toX( x, y, z ) + cellS / 2 + (cellX - img.width) / 2;
            var Y = toY( x, y, z ) - img.height - cellY / 2;

            ctx.save();
            ctx.translate(X+12,Y);
            ctx.scale(s,s);
            ctx.drawImage(img,-img.width/2,-img.height/2);
            ctx.restore();
        },
        imgScaleRot: function( ctx, x, y, z, s, r, img ) {
            if( !img ) return;

            var X = toX( x, y, z ) + cellS / 2 + (cellX - img.width) / 2;
            var Y = toY( x, y, z ) - img.height - cellY / 2;

            ctx.save();
            ctx.translate(X+12,Y);
            ctx.rotate(r);
            ctx.scale(s,1);
            ctx.drawImage(img,-img.width/2,-img.height/2);
            ctx.restore();
        },

        cell: function( ctx, x, y, z ,n , nivel) {

            //-----------------------------------------------------------------

            if( typeof nivel === 'undefined' ) nivel = niveau;
            if( z > -1 ) {
                var X = toX( x, y, z );
                var Y = toY( x, y, z );
                // Partie frontale (verticale)
                if  (y == nivel.length - 1 || z > nivel[y+1][x]){
                    ctx.fillStyle = colorSet[out][0];
                    ctx.fillRect( X, Y, cellX, cellZ * (z + 1) );
                }
                // Partie latérale (verticale)
                if  (x == nivel[y].length - 1 || z > nivel[y][x+1]){
                    ctx.fillStyle = colorSet[out][1];
                    ctx.beginPath();
                    ctx.moveTo( X + cellX, Y );
                    ctx.lineTo( X + cellX + cellS, Y - cellY );
                    ctx.lineTo( X + cellX + cellS, Y - cellY + (z + 1) * cellZ);
                    ctx.lineTo( X + cellX, Y + (z + 1) * cellZ );
                    ctx.closePath();
                    ctx.fill();
                }

                // Partie horizontale.
                ctx.fillStyle = "rgb("+(colorSet[out][2][0]+z*colorSet[out][2][3])+","+(colorSet[out][2][1]+z*colorSet[out][2][4])+","+(colorSet[out][2][2]+z*colorSet[out][2][5])+")";
                if (n == 1) ctx.fillStyle = "rgb(255,255,255)";
                ctx.beginPath();
                ctx.moveTo( X, Y );
                ctx.lineTo( X + cellX + 1, Y );
                ctx.lineTo( X + cellX + 1 + cellS, Y - cellY );
                ctx.lineTo( X + cellS, Y - cellY );
                ctx.closePath();
                ctx.fill();

                if (n == 1) return;

                ctx.strokeStyle = colorSet[out][4];
                ctx.lineWidth = 2;
                // Tracer les lignes des plateaux.
                var wall = walls[y][x];
                if( wall & 1 ) {
                    ctx.beginPath();
                    ctx.moveTo( X + cellS, Y - cellY );
                    ctx.lineTo( X + cellS + cellX, Y - cellY );
                    ctx.stroke();
                }
                if( wall & 2 ) {
                    ctx.beginPath();
                    ctx.moveTo( X + cellX, Y );
                    ctx.lineTo( X + cellX + cellS, Y - cellY );
                    ctx.stroke();
                }
                if( wall & 4 ) {
                    ctx.beginPath();
                    ctx.moveTo( X, Y );
                    ctx.lineTo( X + cellX, Y );
                    ctx.stroke();
                }
                if( wall & 8 ) {
                    ctx.beginPath();
                    ctx.moveTo( X, Y );
                    ctx.lineTo( X + cellS, Y - cellY );
                    ctx.stroke();
                }
                // Tracer les lignes verticales.
                wall = wallsVert[y][x];
                if( wall[0] > 0 ) {
                    ctx.beginPath();
                    ctx.moveTo( X, Y );
                    ctx.lineTo( X, Y + cellZ * wall[0] );
                    ctx.stroke();
                }
                if( wall[1] > 0 ) {
                    ctx.beginPath();
                    ctx.moveTo( X + cellX, Y );
                    ctx.lineTo( X + cellX, Y + cellZ * wall[1] );
                    ctx.stroke();
                }
                if( wall[2] > 0 ) {
                    ctx.beginPath();
                    ctx.moveTo( X + cellX + cellS, Y - cellY);
                    ctx.lineTo( X + cellX + cellS, Y + cellZ * wall[2] - cellY);
                    ctx.stroke();
                }
            }
        },
        case: function(level,x,y){
            var result = ["ah","ah"];
            level.forEach(
                function(e,Y){
                    e.forEach(
                        function(f,X){
                            if (toY(X,Y,f) > y && toY(X,Y,f) - cellY < y){
                                if (toX(X,Y,f) < x && toX(X,Y,f) + cellX + cellS > x) result = [Y,X];
                            }
                        }
                    );
                }
            );
            return result;
        },
        caseGround: function(level,x,y){
            var result = ["ah","ah"];
            level.forEach(
                function(e,Y){
                    e.forEach(
                        function(f,X){
                            if (toY(X,Y,-1) > y && toY(X,Y,-1) - cellY < y){
                                if (toX(X,Y,-1) < x && toX(X,Y,-1) + cellX + cellS > x) result = [Y,X];
                            }
                        }
                    );
                }
            );
            return result;
        },
        scrolling: function(){
            var x = toX(heros[0].x+heros[0].vx/50,heros[0].y+heros[0].vy/50,heros[0].z);
            var y = toY(heros[0].x+heros[0].vx/50,heros[0].y+heros[0].vy/50,heros[0].z);
            if (x > W-150) scrollX = W-150-(x-scrollX);
            else if (x < 100) scrollX = 100-(x-scrollX);
            if (y > H-50) scrollY = H-50-(y-scrollY);
            else if (y < H/3+50) scrollY = H/3+50-(y-scrollY);
        },
        drawHit: function(ctx,x,y,z,n){
            ctx.fillStyle = "rgb("+(215+n*4)+","+(100+n*10)+",45)";
            var X = toX(x+0.5,y+0.5,z+1.8);
            var Y = toY(x+0.5,y+0.5,z+1.8);
            var j = 16;
            for (var i = 0;i<j;i++){
                var cX = X + n*15*Math.cos(Math.PI*2/j*(i+2));
                var cY = Y + n*15*Math.sin(Math.PI*2/j*(i+2));
                var s = 4 - i%2*(n/10*4);
                ctx.beginPath();
                ctx.moveTo(cX + s*Math.cos(Math.PI*2/j*i),cY + s*Math.sin(Math.PI*2/j*i));
                ctx.lineTo(cX + s*15*Math.cos(Math.PI*2/j*(i+2)),cY + s*15*Math.sin(Math.PI*2/j*(i+2)));
                ctx.lineTo(cX - s*Math.cos(Math.PI*2/j*i),cY - s*Math.sin(Math.PI*2/j*i));
                ctx.lineTo(cX - s*15*Math.cos(Math.PI*2/j*(i+2)),cY - s*15*Math.sin(Math.PI*2/j*(i+2)));
                ctx.closePath();
                ctx.fill();
            }
            ctx.globalAlpha = 1 - n/10;
            ctx.beginPath();
            ctx.arc(X,Y,n*5,Math.PI,-Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(X,Y,n*3,Math.PI,-Math.PI);
            ctx.fill();
            ctx.globalAlpha = 1;
        },
        drawExploM: function(ctx,x,y,z,n){
            ctx.fillStyle = "rgb(80,0,50)";
            var N = n/2;
            var X = toX(x+0.5,y+0.5,z+1);
            var Y = toY(x+0.5,y+0.5,z+1);
            ctx.beginPath();
            ctx.moveTo(X + exploMX(N) + 3,Y + exploMY(N));
            ctx.lineTo(X + exploMX(N-2),Y + exploMY(N-2));
            ctx.lineTo(X + exploMX(N) - 3,Y + exploMY(N));
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(X - exploMX(N) + 3,Y + exploMY(N));
            ctx.lineTo(X - exploMX(N-2),Y + exploMY(N-2));
            ctx.lineTo(X - exploMX(N) - 3,Y + exploMY(N));
            ctx.closePath();
            ctx.fill();
        },
        drawPow: function(ctx,x,y,z,n){
            ctx.fillStyle = "rgb(100,0,63)";
            var X = toX(x+0.5,y+0.5,z+0.5);
            var Y = toY(x+0.5,y+0.5,z+0.5);
            ctx.globalAlpha = 1 - n/10;
            ctx.beginPath();
            ctx.arc(X,Y,n*4,Math.PI,-Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(X,Y,n*2,Math.PI,-Math.PI);
            ctx.fill();
            ctx.globalAlpha = 1;
        },
        drawMetem: function(ctx,kg){
            ctx.fillStyle = "rgb(50,0,100)";
            var x = kg.x;
            var y = kg.y;
            var z = kg.alti;
            var X = toX(x+0.5,y+0.5,z+2);
            var Y = toY(x+0.5,y+0.5,z+2);
            for (var i = 0;i<12;i++){
                ctx.beginPath();
                ctx.moveTo((X+Math.cos(Math.PI/4*i)*metemN(kg.n)) ,(Y-Math.sin(Math.PI/4*i)*metemN(kg.n)));
                ctx.lineTo(X+Math.cos(Math.PI/4*i)*(metemN(kg.n+5))+5*Math.sin(Math.PI/4*i),Y-Math.sin(Math.PI/4*i)*(metemN(kg.n+5))+5*Math.cos(Math.PI/4*i));
                ctx.lineTo(X+Math.cos(Math.PI/4*i)*(metemN(kg.n+5))-5*Math.sin(Math.PI/4*i),Y-Math.sin(Math.PI/4*i)*(metemN(kg.n+5))-5*Math.cos(Math.PI/4*i));
                ctx.closePath();
                ctx.fill();
            }
        },
        drawTexte: function(ctx,x,y,z,texte){
            ctx.fillStyle = "rgb(230,230,255)";
            ctx.font = "20px serif";
            var X = toX(x+0.5,y+0.5,z+0.5);
            var Y = toY(x+0.5,y+0.5,z+0.5);
            ctx.fillText(texte,X,Y);
        }
    };
}();

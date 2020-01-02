
let pixelSize = 10;
let aliveColor = "#2196f3";
let backGround = "#031321"  ;
let fps = 60;
let wW;
// let Heigth = 600;
let mReleased = true;
let looping = true; 
let resizeValue = 0.5;



function makeMatrix(x, y) {
    let matrix = new Array(x);
    for (let i = 0 ; i < x ; i++) {
        matrix[i] = new Array(y);
        for (let j = 0 ; j < y ; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function matrixRnd(matrix, cols, rows) {
    for (let i = 1; i < (cols-1); i++) {
        for (let j = 1; j < (rows-1); j++) {
            matrix[i][j] = floor(random(2))
        }
    }
    return matrix;
}



function drawRect(matrix, cols, rows) {
    background(backGround);

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                // console.log(i + ' ' + j + ' ' + matrix[i][j]);
                if (matrix[i][j] == 1) {
                    stroke(backGround);
                    fill(aliveColor);
                    rect(i*pixelSize, j*pixelSize, pixelSize - 1, pixelSize - 1);

                }
                // else if (matrix0[i][j] == 0) {
                //     fill(0,0,0);
                //     rect(i*pixelSize, j*pixelSize, pixelSize, pixelSize);
                // }
                // else {
                //     fill(255,0,0);
                //     rect(i*pixelSize, j*pixelSize, pixelSize, pixelSize);
                // }
            }
        }         
    }

    function sommexy(grid, x, y) {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
          }
        }
        sum -= grid[x][y];
        return sum;
      } 
      

function update(cols, rows) {
    cols = matrix0.length;
    rows = matrix0[0].length;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            let somme = sommexy(matrix0, i, j);

            state = matrix0 [i][j];

            // console.log(i +'  '+ j + ' = ' + state + '   somme = '+ somme );

            if (state == 0 && somme == 3) {
                matrix1 [i][j] = 1;
            }
            else if (state == 1 && (somme < 2 || somme > 3) ) {
                matrix1 [i][j] = 0;
            }
            else {
                matrix1 [i][j] = state;
            }
        }
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            matrix0[i][j] = matrix1[i][j];
        }
    }     
}

// function matrixIncrease(matrix, newCols, newRows, cols, rows) {
//     for (i = 0 ; i < newCols ; i++) {
//         if (i >= cols) {
//             matrix.push(new Array(rows-1));
//             matrix[i].fill(0);
//         }
//         for (j = 0 ; j < newRows ; j++) {
//             if(j >= rows) {
//             matrix.push(0);
//             }
//         }
//     }

//     return matrix;
// }

// function resizeMatrix(windowWidth, windowHeight, matrix) {

//     let newCols = 0;
//     let newRows = 0;

//     if (windowWidth > cols * pixelSize) {
//         newCols = Math.floor(windowWidth/pixelSize);
//         matrix = matrixIncrease(matrix, newCols, newRows, cols, rows);
//     }
//     if (windowHeight > rows * pixelSize) {
//         newRows = Math.floor(windowHeight/pixelSize);
//         matrix = matrixIncrease(matrix, newCols, newRows, cols, rows);
//     }

//     // console.log(matrix);

    
//     cols = newCols;
//     rows = newRows;
//     return matrix;
// }

// function windowResized() {
//     resizeCanvas(windowWidth - resizeValue, windowHeight - resizeValue);
//     // matrix0 = resizeMatrix(windowWidth, windowHeight, matrix0);
//     // matrix1 = resizeMatrix(windowWidth, windowHeight, matrix1);
//   }

function setup() {
    // var cnv = createCanvas(cols*pixelSize, rows*pixelSize);

    let wW = 5*windowWidth/6;
    let wH = 3*windowHeight/4;
    // let wH = windowHeight;
    background(0);
    frameRate(fps);


    cols = Math.floor(wW/pixelSize);
    rows = Math.floor(wH/pixelSize);
    // rows = Math.floor(wH/pixelSize);
    // alert (cols + ' ' + rows);

    var cnv = createCanvas(wW - resizeValue, wH - resizeValue);
    cnv.style('display', 'block');
    cnv.parent("sketch-holder");

    matrixEmpty = makeMatrix(cols, rows) 
    matrix0 = matrixRnd(makeMatrix(cols, rows), cols, rows);
    matrix1 = matrixRnd(makeMatrix(cols, rows), cols, rows);

    drawRect(matrixEmpty, cols, rows);
                    filter(BLUR, 3);
}



// for (let i = 1; i < matrix1.length - 1; i++) {
//     for (let j = 1; j < matrix1[i].length - 1; j++) {
//         console.log(sommexy(matrix0, i , j));
//     }
// }

function addCell() {
    matrix0[Math.floor(mouseX/pixelSize)][Math.floor(mouseY/pixelSize)] = 1;
    matrix0[Math.floor(mouseX/pixelSize)][Math.floor(mouseY/pixelSize)] = 1;

    stroke(backGround);
    fill(aliveColor);
    rect(Math.floor(mouseX/pixelSize)*pixelSize, Math.floor(mouseY/pixelSize)*pixelSize, pixelSize - 1, pixelSize - 1);
}

function mousePressed() {
    mReleased = false;
    console.log('pressed')
    addCell();
    
}

function mouseReleased() {
    mReleased = true;

}

function mouseDragged() {
    if (mouseIsPressed) {
        addCell();
    }
    console.log('pressed')
}

function keyPressed() {
    if (keyCode === 69) {
        redraw();
    }
    if (keyCode === UP_ARROW) {
        loop();
    }
    if (keyCode === RIGHT_ARROW) {
        redraw();
    }
    if (keyCode === 32) {
        if(looping) {
            looping = false;
            noLoop();
        }
        else {
            looping = true;
            loop();
        }
    }

}

function draw() {
    update(cols, rows);
    drawRect(matrix0, cols, rows);


}

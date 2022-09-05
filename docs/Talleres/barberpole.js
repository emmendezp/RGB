var linew = 20;
var lineoffset = 30;
var space = linew + lineoffset;

function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('sketch-div');
    strokeCap(PROJECT);
}

function draw() {
    background(255);

    // lines
    strokeWeight(linew);
    for (let i = 0; i < 1.5 * width / space; i++) {
        if (i % 2 == 0) {
            stroke(255, 0, 0);
        } else {
            stroke(0, 0, 255);
        }

        let xoff = i * space + frameCount % (2 * space);
        line(-width / 2 + xoff,
            height / 4,
            xoff,
            3 * height / 4);
    }

    // hiding blocks
    if (!mouseIsPressed) {
        noStroke();
        fill(255);
        rect(0, 0, width, height / 4);
        rect(0, 3 * height / 4, width, height / 4);
        rect(0, 0, 2 * width / 5, height);
        rect(3 * width / 5, 0, 2 * width / 5, height);
    }
    strokeWeight(1);
    stroke(0);
    noFill();
    rect(2 * width / 5, height / 4, width / 5, height / 2);
}
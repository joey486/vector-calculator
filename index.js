
let is3D = true;

function toggleDimension() {
    is3D = !is3D;
    document.getElementById('vector1z').style.display = is3D ? 'block' : 'none';
    document.getElementById('vector1zLabel').style.display = is3D ? 'block' : 'none';
    document.getElementById('vector2z').style.display = is3D ? 'block' : 'none';
    document.getElementById('vector2zLabel').style.display = is3D ? 'block' : 'none';

    calculateAndDrawVectors();
}

function calculate(operation) {
    let vector1x = parseFloat(document.getElementById('vector1x').value);
    let vector1y = parseFloat(document.getElementById('vector1y').value);
    let vector2x = parseFloat(document.getElementById('vector2x').value);
    let vector2y = parseFloat(document.getElementById('vector2y').value);

    let vector1z = 0;
    let vector2z = 0;

    if (is3D) {
        vector1z = parseFloat(document.getElementById('vector1z').value);
        vector2z = parseFloat(document.getElementById('vector2z').value);
    }

    let result;
    switch (operation) {
        case 'sum':
            result = `Sum: (${vector1x + vector2x}, ${vector1y + vector2y}, ${vector1z + vector2z})`;
            break;
        case 'subtract':
            result = `Subtraction: (${vector1x - vector2x}, ${vector1y - vector2y}, ${vector1z - vector2z})`;
            break;
        case 'dot':
            result = `Dot Product: ${vector1x * vector2x + vector1y * vector2y + vector1z * vector2z}`;
            break;
        case 'cross':
            if (!is3D) {
                result = 'Cross product is only defined in 3D!';
            } else {
                let crossX = vector1y * vector2z - vector1z * vector2y;
                let crossY = vector1z * vector2x - vector1x * vector2z;
                let crossZ = vector1x * vector2y - vector1y * vector2x;
                result = `Cross Product: (${crossX}, ${crossY}, ${crossZ})`;
            }
            break;
        case 'angle':
            let dotProduct = (vector1x * vector2x) + (vector1y * vector2y) + (vector1z * vector2z);
            let magnitude1 = Math.sqrt((vector1x ** 2) + (vector1y ** 2) + (vector1z ** 2));
            let magnitude2 = Math.sqrt((vector2x ** 2) + (vector2y ** 2) + (vector2z ** 2));
            let angleInRadians = Math.acos(dotProduct / (magnitude1 * magnitude2));
            let angleInDegrees = (angleInRadians * 180) / Math.PI;
            result = `Angle between vectors: ${angleInDegrees.toFixed(2)} degrees`;
            break;
        default:
            result = 'Invalid operation';
    }

    document.getElementById('result').textContent = result;
    calculateAndDrawVectors();
}

function clearInputs() {
    document.getElementById('vector1x').value = '';
    document.getElementById('vector1y').value = '';
    document.getElementById('vector1z').value = '';
    document.getElementById('vector2x').value = '';
    document.getElementById('vector2y').value = '';
    document.getElementById('vector2z').value = '';
    document.getElementById('result').textContent = '';
    // Optionally, clear the canvas as well
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


//----------------------------------------------------------------
// draw the vectors
//----------------------------------------------------------------

let canvas = document.getElementById('vectorCanvas');
let ctx = canvas.getContext('2d');

function drawVector(x, y, z = 0, color) {
    const focalLength = 300; // Adjust for perspective effect
    const cameraZ = 500; // Position of the camera along the Z-axis
    
    // Perspective projection formula
    let scale = focalLength / (cameraZ - z);
    let screenX = canvas.width / 2 + x * scale;
    let screenY = canvas.height / 2 - y * scale;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(screenX, screenY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
}


function drawAxes() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
    ctx.beginPath();
    ctx.lineWidth = 2;

    // X-axis (horizontal)
    ctx.strokeStyle = 'black';
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);

    // Z-axis (depth) - Only in 3D mode
    if (is3D) {
        ctx.strokeStyle = 'black'; // Different color for better visibility
        const focalLength = 300;  // Perspective effect
        const cameraZ = 500;       // Simulated camera position
        const zFar = 300;          // Positive Z direction
        const zNear = -1000;        // Negative Z direction

        // Convert positive Z-axis to screen coordinates
        let scaleFar = focalLength / (cameraZ - zFar);
        let zFarX = canvas.width / 2 + zFar * scaleFar;
        let zFarY = canvas.height / 2 + zFar * scaleFar;

        // Convert negative Z-axis to screen coordinates
        let scaleNear = focalLength / (cameraZ - zNear);
        let zNearX = canvas.width / 2 + zNear * scaleNear;
        let zNearY = canvas.height / 2 + zNear * scaleNear;

        // Draw Z-axis behind other elements
        ctx.moveTo(zNearX, zNearY);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(zFarX, zFarY);
    }

    ctx.stroke();

    // Y-axis (vertical) - Draw **last** so it's always on top
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
}



function calculateAndDrawVectors() {
    let vector1x = parseFloat(document.getElementById('vector1x').value) || 0;
    let vector1y = parseFloat(document.getElementById('vector1y').value) || 0;
    let vector2x = parseFloat(document.getElementById('vector2x').value) || 0;
    let vector2y = parseFloat(document.getElementById('vector2y').value) || 0;

    let vector1z = 0;
    let vector2z = 0;

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (is3D) {
        vector1z = parseFloat(document.getElementById('vector1z').value);
        vector2z = parseFloat(document.getElementById('vector2z').value);

        drawVector(vector1x * 10, vector1y * 10, vector1z * 10, 'red'); // Scale the vectors for visualization
        drawVector(vector2x * 10, vector2y * 10, vector2z * 10, 'blue'); // Scale the vectors for visualization
    }

    else{
        
        // Draw vector 1
        drawVector(vector1x * 10, vector1y * 10,0, 'red'); // Scale the vectors for visualization

        // Draw vector 2
        drawVector(vector2x * 10, vector2y * 10,0, 'blue'); // Scale the vectors for visualization
    }

    drawAxes();
}

// Call calculateAndDrawVectors when the page loads or when the button is clicked
document.addEventListener('DOMContentLoaded', calculateAndDrawVectors);

//----------------------------------------------------------------
//Cursor code:
//----------------------------------------------------------------
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e){
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    //cursorOutline.style.left = `${posX}px`;
    //cursorOutline.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {duration: 250, fill: "forwards"});
});

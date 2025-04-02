// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw initial black background
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw initial vectors
  handleDrawEvent();
}

function handleDrawEvent() {
  // Get the coordinates for v1 and v2 from input fields
  const v1x = parseFloat(document.getElementById('v1-x').value) || 0;
  const v1y = parseFloat(document.getElementById('v1-y').value) || 0;
  const v2x = parseFloat(document.getElementById('v2-x').value) || 0;
  const v2y = parseFloat(document.getElementById('v2-y').value) || 0;
  
  // Create vectors v1 and v2
  let v1 = new Vector3([v1x, v1y, 0]);
  let v2 = new Vector3([v2x, v2y, 0]);
  
  // Clear canvas
  const canvas = document.getElementById('example');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw both vectors
  drawVector(v1, "red");
  drawVector(v2, "blue");
}

function angleBetween(v1, v2) {
  // Calculate dot product
  const dotProduct = Vector3.dot(v1, v2);
  
  // Calculate magnitudes
  const mag1 = v1.magnitude();
  const mag2 = v2.magnitude();
  
  // Calculate angle using arccos of dot product divided by product of magnitudes
  // Handle potential numerical errors by clamping the value between -1 and 1
  const cosTheta = Math.max(-1, Math.min(1, dotProduct / (mag1 * mag2)));
  const angleRadians = Math.acos(cosTheta);
  
  // Convert to degrees
  return angleRadians * 180 / Math.PI;
}

function areaTriangle(v1, v2) {
  // Calculate cross product
  const cross = Vector3.cross(v1, v2);
  
  // The magnitude of the cross product equals the area of the parallelogram
  // The area of the triangle is half of that
  return cross.magnitude() / 2;
}

function handleDrawOperationEvent() {
  // Get the coordinates for v1 and v2 from input fields
  const v1x = parseFloat(document.getElementById('v1-x').value) || 0;
  const v1y = parseFloat(document.getElementById('v1-y').value) || 0;
  const v2x = parseFloat(document.getElementById('v2-x').value) || 0;
  const v2y = parseFloat(document.getElementById('v2-y').value) || 0;
  
  // Create vectors v1 and v2
  let v1 = new Vector3([v1x, v1y, 0]);
  let v2 = new Vector3([v2x, v2y, 0]);
  
  // Get operation and scalar value
  const operation = document.getElementById('operation').value;
  const scalar = parseFloat(document.getElementById('scalar').value) || 1;
  
  // Clear canvas
  const canvas = document.getElementById('example');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw original vectors
  drawVector(v1, "red");
  drawVector(v2, "blue");
  
  // Perform operation and draw result
  if (operation === 'angle') {
    // Calculate and log angle between vectors
    const angle = angleBetween(v1, v2);
    console.log('Angle:', angle.toFixed(2), 'degrees');
  } else if (operation === 'area') {
    // Calculate and log area of triangle
    const area = areaTriangle(v1, v2);
    console.log('Area:', area.toFixed(2), 'square units');
  } else if (operation === 'magnitude') {
    // Calculate and log magnitudes
    const mag1 = v1.magnitude();
    const mag2 = v2.magnitude();
    console.log('Vector 1 magnitude:', mag1);
    console.log('Vector 2 magnitude:', mag2);
  } else if (operation === 'normalize') {
    // Create copies for normalization
    let v3 = new Vector3([v1x, v1y, 0]);
    let v4 = new Vector3([v2x, v2y, 0]);
    
    // Normalize and draw
    v3.normalize();
    v4.normalize();
    
    // Log original and normalized magnitudes
    console.log('Vector 1 original magnitude:', v1.magnitude());
    console.log('Vector 1 normalized magnitude:', v3.magnitude());
    console.log('Vector 2 original magnitude:', v2.magnitude());
    console.log('Vector 2 normalized magnitude:', v4.magnitude());
    
    drawVector(v3, "green");
    drawVector(v4, "green");
  } else if (operation === 'add' || operation === 'sub') {
    // Create result vector v3 as a copy of v1
    let v3 = new Vector3([v1x, v1y, 0]);
    
    // Perform operation
    if (operation === 'add') {
      v3.add(v2);
    } else {
      v3.sub(v2);
    }
    
    // Draw result vector
    drawVector(v3, "green");
  } else {
    // For mul and div, create copies of both vectors
    let v3 = new Vector3([v1x, v1y, 0]);
    let v4 = new Vector3([v2x, v2y, 0]);
    
    // Perform operation
    if (operation === 'mul') {
      v3.mul(scalar);
      v4.mul(scalar);
    } else {
      v3.div(scalar);
      v4.div(scalar);
    }
    
    // Draw result vectors
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
}

function drawVector(v, color) {
  // Get canvas and context
  const canvas = document.getElementById('example');
  const ctx = canvas.getContext('2d');
  
  // Get canvas center
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  // Set drawing style
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  
  // Start drawing from center
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  
  // Calculate end point (scale by 20 and flip y-coordinate since canvas y is inverted)
  const endX = centerX + v.elements[0] * 20;
  const endY = centerY - v.elements[1] * 20; // Subtract to flip y coordinate
  
  // Draw the line
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

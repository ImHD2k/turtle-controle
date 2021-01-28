var scene, renderer, camera;
var cube;
var controls;
const group = new THREE.Group();

init();
animate();
updateTurtlePos();

function init()
{
    renderer = new THREE.WebGLRenderer( {antialias:true} );
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize (width, height);
    document.body.appendChild (renderer.domElement);
    scene = new THREE.Scene();
    
    function updateCamera() {
        camera = new THREE.PerspectiveCamera (45, width/height, 1, 10000);
        camera.position.y = 10;
        camera.position.z = 10;
        camera.lookAt (new THREE.Vector3(0,0,0));
    }
    updateCamera();
    
    controls = new THREE.OrbitControls (camera, renderer.domElement);
    
    var gridXZ = new THREE.GridHelper(10, 10);
    gridXZ.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
    scene.add(gridXZ);
}
function updateTurtlePos() {
     // start
     function createTurtle(posx, posy, posz) {
        material = new THREE.MeshBasicMaterial({color: 0xff0000});
        var cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material);
        cube.position.set(posx, posy, posz);
        group.add(cube);
        scene.add(group);
     }
     if (scene.children.length == '1') {
        createTurtle(posx,posy,posz);
     }
     group.position.set(posx,posy,posz)
     //while(scene.children.length > 0){ 
     //   scene.remove(scene.children[0]); 
     //}
    
    // end
}
function updateWorld(type,name,posx,posz) {
    if (type == 'down') {
        var cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1));
        cube.position.set(posx, posy - 1, posz);
        scene.add(cube);
    }
    if (type == 'forward') {
        var cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1));
        cube.position.set(posx, posy, posz);
        scene.add(cube);
    }
    if (type == 'up') {
        var cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1));
        cube.position.set(posx, posy + 1, posz);
        scene.add(cube);
    }
}
function animate()
{
    controls.update();
    requestAnimationFrame ( animate );  
    renderer.render (scene, camera);
}
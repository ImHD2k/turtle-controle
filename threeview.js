var scene, renderer, camera;
var cube;
var controls;

init();
animate();

function init()
{
    renderer = new THREE.WebGLRenderer( {antialias:true} );
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize (width, height);
    document.body.appendChild (renderer.domElement);
    scene = new THREE.Scene();

    function createCube(posx, posy, posz) {
        var cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1));
        cube.position.set(posx, posy, posz);
        scene.add(cube);
    }

    // start
    createCube(posx,posy,posz);
    // end

    camera = new THREE.PerspectiveCamera (45, width/height, 1, 10000);
    camera.position.y = 10;
    camera.position.z = 10;
    camera.lookAt (new THREE.Vector3(0,0,0));

    controls = new THREE.OrbitControls (camera, renderer.domElement);
    
    var gridXZ = new THREE.GridHelper(100, 10);
    gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff) );
    scene.add(gridXZ);
}

function animate()
{
    controls.update();
    requestAnimationFrame ( animate );  
    renderer.render (scene, camera);
}
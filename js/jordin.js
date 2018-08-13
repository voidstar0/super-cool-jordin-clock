const canvas = document.getElementById('hours');
const ctx = canvas.getContext('2d');
canvas.style.display = "none";

const canvas2 = document.getElementById('minutes');
const ctx2 = canvas2.getContext('2d');
canvas2.style.display = "none";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const basegeometry = new THREE.BoxGeometry( 1150, 400, -10 );
const basematerial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false } );
const basecube = new THREE.Mesh( basegeometry, basematerial );
basecube.position.x = -0.09;
scene.add( basecube );

const geometry = new THREE.BoxGeometry( 350, 150, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x3665ff, wireframe: false } );
const cube = new THREE.Mesh( geometry, material );
cube.position.x = -300;
cube.position.z = 0.7;
scene.add( cube );

const geometry2 = new THREE.BoxGeometry( 350, 150, 1 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xfe0000, wireframe: false } );
const cube2 = new THREE.Mesh( geometry2, material2 );
cube2.position.z = 0.7;
cube2.position.x = 300;
scene.add( cube2 );

const texture = new THREE.Texture(canvas);
const hourmat = new THREE.MeshBasicMaterial({ map: texture });
const hourgeo = new THREE.BoxGeometry( 100, 100, 1 );
const hourmesh = new THREE.Mesh(hourgeo, hourmat);
hourmesh.position.x = -300;
hourmesh.position.z = 1.2;
scene.add(hourmesh);

const texture2 = new THREE.Texture(canvas2);
const minutemat = new THREE.MeshBasicMaterial({ map: texture2 });
const minutegeo = new THREE.BoxGeometry(100, 100, 1);
const minutemesh = new THREE.Mesh(minutegeo, minutemat);
minutemesh.position.x = 300;
minutemesh.position.z = 1.2;
scene.add(minutemesh);

const controls = new THREE.OrbitControls( camera );
camera.position.z = 600;
controls.update();

const changeCanvas = () => {
    ctx.font = '900 80px Orbitron';
    ctx.fillStyle = '#3665ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(new Date().getHours() - 12, canvas.width / 2, canvas.height / 2);

    ctx2.font = '700 80px Orbitron';
    ctx2.fillStyle = '#fe0000';
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    ctx2.fillStyle = 'black';
    ctx2.textAlign = "center";
    ctx2.textBaseline = "middle";
    ctx2.fillText(new Date().getMinutes(), canvas2.width / 2, canvas2.height / 2);
}

const animate = () => {
    requestAnimationFrame( animate );
    changeCanvas();
    controls.update();
    texture.needsUpdate = true;
    texture2.needsUpdate = true;
	renderer.render( scene, camera );
}

animate();

window.addEventListener( 'resize', onWindowResize, false );

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
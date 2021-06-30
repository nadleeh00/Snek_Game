import "./styles.css";

function Canvas() {
  var canvas = document.getElementById("canvas");
  // var ctx = canvas.getContext('2d');

  return (
    <canvas className="board" id="canvas">
      <div className="snake-head"></div>
    </canvas>
  );
}

export default Canvas;

// const Canvas = () => {

//   var canvas = <HTMLCanvasElement> document.getElementById('canvas');
//   var ctx = canvas.getContext('2d');
//   const can = document.getElementById("canvas");
//   const canContext = can.getContext('2d');

//   return (
//     <canvas id="canvas" height="608" width="608">
//       </canvas>
//   );
// }

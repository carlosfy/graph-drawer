import './App.css';
import React, { useState, useRef, useEffect } from 'react';

import Drawer from './components/Drawer'

function App() {
  const [mode, setMode] = useState("create")
  const [container, setContainer] = useState()
  const [dimensions, setDimensions] = useState({ width: 700, height: 700 })

  const [nodes, setNodes] = useState([{ id: 0, x: 10, y: 10 }, { id: 1, x: 50, y: 50 }]);
  const [nextNodeId, setNextNodeId] = useState(2)

  const [edges, setEdges] = useState([{ id: 0, source: 0, target: 1 }]);
  const [sourceEdge, setSourceEdge] = useState()
  const [targetEdge, setTargetEdge] = useState()
  const [nextEdgeId, setNextEdgeId] = useState(1)
  const [edgeState, setEdgeState] = useState(0)

  const [adj, setAdj] = useState([[0, 1], [1, 0]])

  const [sourceImage, setSourceImage] = useState('')


  const svgRef = useRef();




  const changeDistances = (element) => {
    setContainer(hola => element)
  }

  // Global modications
  const reset = () => {
    setNodes([]);
    setNextNodeId(0);
    setAdj([])
    setEdges([])
  }

  // Node modification
  // Base function
  const getNextNodeId = () => {
    let id = nextNodeId;
    setNextNodeId(i => i + 1);
    return id;
  }

  const addNodeCoordinates = (x, y) => {
    let newId = getNextNodeId();
    // console.log('new node, x:' + x + ' y: ' + y);
    setNodes([...nodes, { id: newId, x: x, y: y }]);
    setAdj(adj => [...adj.map(ele => [...ele, 0]), Array(adj.length + 1).fill(0)]);
  }

  const addRandomNode = () => {
    let newX = Math.floor(Math.random() * dimensions.width)
    let newY = Math.floor(Math.random() * dimensions.height)
    addNodeCoordinates(newX, newY);
  }

  const addNodeClick = (event, element) => {
    if (!element) { console.log(event.target.parent); return };
    let newX = event.clientX - element.offsetLeft;
    let newY = event.clientY - element.offsetTop;
    addNodeCoordinates(newX, newY)
  }

  const addNodeMouse = (event) => {
    let newX = event.clientX - container.offsetLeft;
    let newY = event.clientY - container.offsetTop;
    addNodeCoordinates(newX, newY)
  }

  const deleteNode = (id) => {
    let currentNode = nodes.filter(ele => ele.id == id)[0];
    console.log('current Node:', currentNode);
    console.log('filter: ', nodes.filter(ele => ele.id != id))
    edges.forEach(ele => {
      if (ele.source == id || ele.target == id) deleteEdge(ele.id);
    })

  }

  // Edges
  // Basic functions
  const getNextEdgeId = () => {
    let id = nextEdgeId;
    setNextEdgeId(i => i + 1);
    return id;
  }

  const addEdge = (source, target) => {
    if (source < 0 || target < 0) return;
    if (typeof adj[source] === 'undefined') return;
    if (typeof adj[source][target] === 'undefined') return;
    if (adj[source][target] === 1) return;
    console.log('you Created and edge')
    let newId = getNextEdgeId();
    setEdges([...edges, { id: newId, source: source, target: target }])
    setAdj(adj => {
      adj[source][target] = 1;
      return adj;
    })
  }

  const deleteEdge = (id) => {
    let edge = edges.filter(edge => edge.id == id)[0]
    setAdj(adj => {
      adj[edge.source][edge.target] = 0;
      return adj;
    })
    setEdges(currentEdges => currentEdges.filter(edge => edge.id != id));
  }

  const addEdgeCall = () => {

    addEdge(sourceEdge, targetEdge);
    setSourceEdge();
    setTargetEdge();
  }

  const handleClick = (event) => {

    switch (mode) {
      case "create":
        switch (event.target.className.baseVal) {
          case 'theSvg':
          case 'theImage':
            if (sourceEdge) {
              setSourceEdge();
              setEdgeState(0);
            }
            addNodeMouse(event);
            break;

          case 'node':
            if (edgeState === 0) {
              setSourceEdge(event.target.id);
              setEdgeState(1)
            }
            else {
              setTargetEdge(event.target.id);
              addEdge(sourceEdge, event.target.id);
              setEdgeState(0);
              setSourceEdge(null);
              setTargetEdge(null);
            }
            break;
          default:
            break;
        }
        break;
      case 'delete':
        switch (event.target.className.baseVal) {
          case 'edge':
            deleteEdge(event.target.id)
            break;
          case 'node':
            console.log('mode delete>node')
            deleteNode(event.target.id);
            break;

        }
    }
  }

  const handleClick2 = (event) => {
    switch (event.target.className.baseVal) {
      case "theSvg":
        if (mode === 'node') {
          addNodeMouse(event);
        }

        console.log('svg')
        break;
      case 'node':
        console.log('node');
        if (edgeState === 0) {
          setSourceEdge(event.target.id);
          setEdgeState(1)
        }
        else {
          console.log('the second node is:', event.target.id)
          setTargetEdge(event.target.id);
          console.log('sourceEdge, targetEdge: ', sourceEdge, targetEdge)
          addEdge(sourceEdge, event.target.id);
          setEdgeState(0);
          setSourceEdge(null);
          setTargetEdge(null);
        }
        break;
      case 'edge':
        console.log('edge')
        break;
      default:
        break;
    }
  }

  // Image
  function handleImageUpload() {

    var image = document.getElementById("upload2").files[0];

    var reader = new FileReader();

    reader.onload = function (e) {
      setSourceImage(ele => e.target.result)
      document.getElementById("display-image").src = e.target.result;
    }

    reader.readAsDataURL(image);

  }

  useEffect(() => {
    // changeDistances(container);


  }, [])




  return (
    <React.Fragment>
      <Drawer sourceImage={sourceImage} nodes={nodes} edges={edges} dimensions={dimensions} add={addNodeMouse} svgReference={svgRef} handleClick={handleClick} changeDistances={changeDistances} selected={sourceEdge} />
      <button onClick={addRandomNode}>Add node</button>
      <button onClick={reset}>Reset</button>
      <div>
        <input name="source" placeholder='Source' onChange={(e) => setSourceEdge(e.target.value)} value={sourceEdge}></input>
        <input name="target" placeholder='Source' onChange={(e) => setTargetEdge(e.target.value)} value={targetEdge}></input>
        <button onClick={() => addEdgeCall()}>Add Edge</button>
      </div>
      <div>
        <button onClick={() => setMode("create")}>Mode Create</button>
        <button onClick={() => setMode("modify")}>Mode Modify</button>
        <button onClick={() => setMode("delete")}>Mode Delete</button>
        <button onClick={() => setMode("image")}>Mode Image</button>
      </div>
      <div>
        <p>
          State: {mode}
        </p>
      </div>
      <div>
        <input id="upload2" type="file" onChange={handleImageUpload} />
        <img id="display-image" src="" />

      </div>

    </React.Fragment>

  )
}



export default App;


// function App() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [counter, setCounter] = useState(0)
//   const handleMouseMove = useCallback(event => {
//     setCounter(counter => counter + 1);
//     const { clientX, clientY } = event;
//     setMousePosition({ x: clientX, y: clientY });

//   }, [setMousePosition])
//   return (
//     <>
//       <svg width={300} height={150} onMouseMove={handleMouseMove}>
//         <g transform={``}>
//           <image href="./googleLogo.png" x={mousePosition.x} y={mousePosition.y} height="100px" width="200px" />
//         </g>
//       </svg>
//       <p>{counter}</p>
//       <p>{mousePosition.x}</p>
//     </>
//   );
// }
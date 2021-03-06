import './App.css';
import React, { useState, useRef, useEffect, useCallback, useReducer } from 'react';

import Drawer from './components/Drawer'
import OutputBlock from './components/OutputBlock'
import Panel from './components/Panel'
import CreateBox from './components/CreateBox'
import DeleteBox from './components/DeleteBox'
import ImageBox from './components/ImageBox'
import ConfigBox from './components/ConfigBox'


const initialState = {
  mode: 'create',
  container: '',
  dimensions: { width: 700, height: 700 },

  nodes: [],
  nextNodeId: 0,

  edges: [],
  sourceEdge: -1,
  nextEdgeId: 0,

  adj: [],

  sourceImage: '',
  imagePosition: { x: 0, y: 0 },
  imageState: 0,
  firstClick: { x: 0, y: 0 }
}

const getNode = (nodes, id) => {
  for (let index in nodes) {
    if (nodes[index].id == id) return { ...nodes[index] };
  }
}


const distance = (x1, y1, x2, y2) => {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}

function reducer(state, action) {
  switch (action.type) {
    case 'deleteImage':
      return {
        ...state,
        sourceImage: ''
      }
    case 'configuration':
      return {
        ...state,
        configuration: action.configuration
      }
    case 'reset':
      // document.getElementById('upload4').value = null;
      return { ...initialState, container: state.container, configuration: state.configuration };
    case 'change-sourceImage':
      return {
        ...state,
        sourceImage: action.source
      }
    case 'change-container':
      return {
        ...state,
        container: action.element
      }
    case "change-mode":
      return { ...state, mode: action.mode }
      break;
    case "event":
      switch (state.mode) {
        case 'create':
          switch (action.event.target.className.baseVal) {
            case 'theSvg':
            case 'theImage':
              if (parseInt(state.sourceEdge) >= 0) {
                return ({ ...state, sourceEdge: -1, edgeState: 0 })
              }
              else {
                let newX = action.event.clientX - state.container.offsetLeft;
                let newY = action.event.clientY - state.container.offsetTop;
                let newId = state.nextNodeId
                let newNodes = [...state.nodes, { id: newId, x: newX, y: newY }]
                let newAdj = [...state.adj.map(ele => [...ele, 0]), Array(state.adj.length + 1).fill(0)]
                return ({
                  ...state,
                  nodes: newNodes,
                  adj: newAdj,
                  nextNodeId: newId + 1
                })
              }
              break;
            case 'node':
            case 'node-label':
              // Creation of and edge
              if (state.sourceEdge < 0) {
                return ({ ...state, edgeState: 1, sourceEdge: action.event.target.id })
              }
              else {
                if (action.event.target.id < 0 || typeof state.adj[state.sourceEdge] === 'undefined' || typeof state.adj[state.sourceEdge][action.event.target.id] === 'undefined' || state.adj[state.sourceEdge][action.event.target.id] === 1) return ({ ...state });
                let newId = state.nextEdgeId;
                let newAdj = [...state.adj];
                if (state.configuration.edgeDefaultValue == -1) {
                  let originNode = getNode(state.nodes, parseInt(state.sourceEdge))
                  let finalNode = getNode(state.nodes, parseInt(action.event.target.id))
                  var newValue = Math.floor(distance(originNode.x, originNode.y, finalNode.x, finalNode.y))

                }
                else {
                  var newValue = state.configuration.edgeDefaultValue
                }
                let newEdge = { id: newId, source: parseInt(state.sourceEdge), target: parseInt(action.event.target.id), value: newValue }
                newAdj[state.sourceEdge][action.event.target.id] = 1;
                return ({
                  ...state,
                  edges: [...state.edges, newEdge],
                  nextEdgeId: newId + 1,
                  adj: newAdj,
                  sourceEdge: -1
                })
              }
            default:
              return { ...state }
          }
          break;
        case 'image':
          switch (action.event.target.className.baseVal) {
            case 'theImage':
              if (state.imageState == 1) {
                return {
                  ...state,
                  imagePosition: { x: state.imagePosition.x + action.event.clientX - state.firstClick.x, y: state.imagePosition.y + action.event.clientY - state.firstClick.y },
                  firstClick: { x: 0, y: 0 },
                  imageState: 0
                }
              }
              else {
                if (state.sourceImage == '') return { ...state };
                return {
                  ...state,
                  firstClick: { x: action.event.clientX, y: action.event.clientY },
                  imageState: 1
                }
              }
            default:
              return { ...state }
          }
          break;
        case 'modify':
          break;
        case 'delete':
          switch (action.event.target.className.baseVal) {
            case 'edge':
              let clickedEdge = state.edges.filter(edge => edge.id == action.event.target.id)[0];
              let newAdj = state.adj;
              newAdj[clickedEdge.source][clickedEdge.target] = 0;
              return ({
                ...state,
                adj: newAdj,
                edges: state.edges.filter(edge => edge.id != action.event.target.id)
              })
              break;
            case 'node':
              let newAdj2 = state.adj.map((ele, index) => ele.map((ele2, index2) => (index == action.event.target.id || index2 == action.event.target.id) ? 0 : ele2));
              let newEdges = state.edges.filter(ele => !(ele.source == action.event.target.id || ele.target == action.event.target.id));
              let newNodes = state.nodes.filter(ele => ele.id != action.event.target.id)
              return ({
                ...state,
                edges: newEdges,
                adj: newAdj2,
                nodes: newNodes,
              })
              break;
            default:
              return { ...state };
              break;
          }
          break;
        case 'config':
          return { ...state, mode: 'create' }
        default:
          return { ...state }
      }
      break;
    case 'undo':
      return action.last;
    default:
      console.log('Error, no case was matched')
      return { ...state }
      break;

  }
}

const initialConfiguration = {
  nodeColor: '#eee',
  nodeLabelColor: '#111',
  nodeRadius: 17,

  edgeColor: '#111',
  edgeStroke: 2.5,
  edgeLabelColor: '#111',
  edgeDefaultValue: -1,
  showValueEdges: false,

  imageWidth: 700,
  imageHeight: 500
}

function configurationReducer(state, action) {
  let changes = {};
  changes[action.type] = action.value;
  return {
    ...state,
    ...changes
  }

}



function testReducer(state, action) {
  state.testfunction()
  return { ...state };
}

function App() {
  const [configuration, changeConfig] = useReducer(configurationReducer, initialConfiguration);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [prueba, setPrueba] = useState(0)
  const [history, setHistory] = useState([initialState])
  useEffect(() => {
    dispatch({ type: 'configuration', configuration })
  }, [configuration])

  useEffect(() => {
    setHistory(current => [...current, state])
  }, [state.nodes, state.edges, state.adj])

  const reset = () => {
    toggleClass('createButton')
    dispatch({ type: 'reset' })
  }

  useEffect(() => {
    toggleClass(state.mode + 'Button')

  }, [state.mode])


  const undo = () => {
    if (history.length > 1) {
      let hist = history.filter((ele, index) => index < history.length - 1)
      setHistory(current => hist)
      dispatch({ type: 'undo', last: hist[hist.length - 1] })
    }

  }

  const toggleClass = (id) => {
    let allButtons = document.querySelectorAll('.navButton')
    for (let i = 0; i < allButtons.length; i++) {
      allButtons[i].classList.remove('selected')
    }
    let element = document.getElementById(id)
    element.classList.add("selected")
  }


  // Image
  function handleImageUpload() {
    var image = document.getElementById("upload4").files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      dispatch({ type: 'change-sourceImage', source: e.target.result })
    }
    if (image) reader.readAsDataURL(image);;

  }
  function deleteImage() {
    document.getElementById('upload4').value = null;
    dispatch({ type: 'deleteImage' })
  }

  return (
    <React.Fragment>
      <div id="left-container">
        {
          state.mode == 'create' ? <CreateBox configuration={configuration} changeConfig={changeConfig} /> : state.mode == 'delete' ? <DeleteBox /> : state.mode == 'image' ? <ImageBox handleImageUpload={handleImageUpload} deleteImage={deleteImage} /> : <ConfigBox changeConfig={changeConfig} configuration={configuration} />}
      </div>
      {/* <Panel changeConfig={changeConfig} configuration={configuration} handleImageUpload={handleImageUpload} /> */}
      <div id='central-container'>

        <div>

        </div>
        <nav>
          <ul class="nav__link">
            <li><button id="createButton" className="navButton selected" onClick={(e) => { toggleClass(e.target.id); dispatch({ type: 'change-mode', mode: 'create' }) }} >Add</button></li>
            <li><button id="deleteButton" className="navButton" onClick={(e) => { toggleClass(e.target.id); dispatch({ type: 'change-mode', mode: 'delete' }) }}>Delete</button></li>
            <li><button id="imageButton" className="navButton" onClick={(e) => { toggleClass(e.target.id); dispatch({ type: 'change-mode', mode: 'image' }) }}>Image</button></li>
            <li><button id="configButton" className="navButton" onClick={(e) => { toggleClass(e.target.id); dispatch({ type: 'change-mode', mode: 'config' }) }}>Config</button></li>
            <li><button id="reseteButton" className="navButton" onClick={reset}> Reset </button></li>

          </ul>
        </nav>
        <Drawer state={state} dispatchar={dispatch} configuration={configuration} />
      </div>

      <div id="right-container">
        <OutputBlock adj={state.adj} nodes={state.nodes} edges={state.edges} />
      </div>

    </React.Fragment>

  )
}



export default App;

// Old functions
// -------------------------------------------------------------------------------------------------------

  // const [mode, setMode] = useState("create")
  // const [container, setContainer] = useState()
  // const [dimensions, setDimensions] = useState({ width: 700, height: 700 })
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // const [nodes, setNodes] = useState([{ id: 0, x: 10, y: 10 }, { id: 1, x: 50, y: 50 }]);
  // const [nextNodeId, setNextNodeId] = useState(2)

  // const [edges, setEdges] = useState([{ id: 0, source: 0, target: 1 }]);
  // const [sourceEdge, setSourceEdge] = useState()
  // const [targetEdge, setTargetEdge] = useState()
  // const [nextEdgeId, setNextEdgeId] = useState(1)
  // const [edgeState, setEdgeState] = useState(0)

  // const [adj, setAdj] = useState([[0, 1], [1, 0]])

  // const [sourceImage, setSourceImage] = useState('')
  // const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  // const [imageState, setImageState] = useState(0)
  // const [firstClick, setFirstClick] = useState({ x: 0, y: 0 })



  // const handleMouseMove = useCallback(event => {
  //   const { clientX, clientY } = event;
  //   setMousePosition({ x: clientX, y: clientY })
  // }, [setMousePosition])

  // Global modications


  // Node modification
  // Base function
  // const getNextNodeId = () => {
  //   let id = nextNodeId;
  //   setNextNodeId(i => i + 1);
  //   return id;
  // }

  // const addNodeCoordinates = (x, y) => {
  //   let newId = getNextNodeId();
  //   // console.log('new node, x:' + x + ' y: ' + y);
  //   setNodes([...nodes, { id: newId, x: x, y: y }]);
  //   setAdj(adj => [...adj.map(ele => [...ele, 0]), Array(adj.length + 1).fill(0)]);
  // }

  // const addRandomNode = () => {
  //   let newX = Math.floor(Math.random() * dimensions.width)
  //   let newY = Math.floor(Math.random() * dimensions.height)
  //   addNodeCoordinates(newX, newY);
  // }

  // const addNodeClick = (event, element) => {
  //   if (!element) { console.log(event.target.parent); return };
  //   let newX = event.clientX - element.offsetLeft;
  //   let newY = event.clientY - element.offsetTop;
  //   addNodeCoordinates(newX, newY)
  // }

  // const addNodeMouse = (event) => {
  //   let newX = event.clientX - container.offsetLeft;
  //   let newY = event.clientY - container.offsetTop;
  //   addNodeCoordinates(newX, newY)
  // }

  // const deleteNode = (id) => {
  //   let currentNode = nodes.filter(ele => ele.id == id)[0];
  //   edges.forEach(ele => {
  //     if (ele.source == id || ele.target == id) deleteEdge(ele.id);
  //   })
  //   setTimeout(
  //     setNodes(current => {
  //       return current.filter(ele => ele.id != id)
  //     }), 50
  //   )
  // }

  // Edges
  // Basic functions
  // const getNextEdgeId = () => {
  //   let id = nextEdgeId;
  //   setNextEdgeId(i => i + 1);
  //   return id;
  // }

  // const addEdge = (source, target) => {
  //   if (source < 0 || target < 0 || typeof adj[source] === 'undefined' || typeof adj[source][target] === 'undefined' || adj[source][target] === 1) return;
  //   let newId = getNextEdgeId();
  //   setEdges([...edges, { id: newId, source: source, target: target }])
  //   setAdj(adj => {
  //     adj[source][target] = 1;
  //     return adj;
  //   })
  // }

  // const deleteEdge = (id) => {
  //   let edge = edges.filter(edge => edge.id == id)[0]
  //   setAdj(adj => {
  //     adj[edge.source][edge.target] = 0;
  //     return adj;
  //   })
  //   setEdges(currentEdges => currentEdges.filter(edge => edge.id != id));
  // }

  // const addEdgeCall = () => {

  //   addEdge(sourceEdge, targetEdge);
  //   setSourceEdge();
  //   setTargetEdge();
  // }

  // const handleClick = (event) => {
  //   // dispatch({ type: 'change-mode', mode: 'modify' })

  //   switch (mode) {
  //     case "create":
  //       switch (event.target.className.baseVal) {
  //         case 'theSvg':
  //         case 'theImage':
  //           if (sourceEdge) {
  //             setSourceEdge(-1);
  //             setEdgeState(0);
  //           }
  //           else {
  //             addNodeMouse(event);
  //           }

  //           break;

  //         case 'node':
  //           if (edgeState === 0) {
  //             setSourceEdge(event.target.id);
  //             setEdgeState(1)
  //           }
  //           else {
  //             setTargetEdge(event.target.id);
  //             addEdge(sourceEdge, event.target.id);
  //             setEdgeState(0);
  //             setSourceEdge(null);
  //             setTargetEdge(null);
  //           }
  //           break;
  //         default:
  //           break;
  //       }
  //       break;
  //     case 'delete':
  //       switch (event.target.className.baseVal) {
  //         case 'edge':
  //           deleteEdge(event.target.id)
  //           break;
  //         case 'node':
  //           console.log('mode delete>node')
  //           deleteNode(event.target.id);
  //           break;

  //       }
  //       break;
  //     case 'image':
  //       console.log('mode:image')
  //       switch (event.target.className.baseVal) {
  //         case 'theImage':
  //           console.log('case:theImg')
  //           if (imageState == 1) {
  //             setImagePosition(currentPosition => {
  //               return { x: currentPosition.x + event.clientX - firstClick.x, y: currentPosition.y + event.clientY - firstClick.y }

  //             })
  //             setFirstClick({ x: 0, y: 0 })
  //             setImageState(0)
  //           }
  //           else {
  //             setFirstClick({ x: event.clientX, y: event.clientY })
  //             setImageState(1)
  //           }
  //           break;
  //         default:
  //           if (imageState == 1) {
  //             setImagePosition(currentPosition => {
  //               return { x: currentPosition.x + event.clientX - firstClick.x, y: currentPosition.y + event.clientY - firstClick.y }

  //             })
  //             setFirstClick({ x: 0, y: 0 })
  //             setImageState(0)
  //           }
  //       }
  //       break;
  //   }
  // }

// -------------------------------------------------------------------------------------------------------


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
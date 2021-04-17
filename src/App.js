
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import React, { useEffect, useState, Component } from "react";
import cloneDeep from "lodash.clonedeep";
import { useEvent, getColors } from "./util";
import ReactDOM from 'react-dom';
import './App.css';
import Swipe from "react-easy-swipe";
import {useGameContext} from "./gameContext";

//import {SwipeRight} from "./swipes"

function App() {

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  const {data, setData, gameOver, setGameOver} = useGameContext();

// Initialize
  const initialize = () => {
    // console.log("CALLING INITIALIZE");

    let newGrid = cloneDeep(data);
    let newClone = cloneDeep(data);
    console.log(newGrid);

    addNumber(newGrid);
    console.table(newGrid);
    addNumber(newGrid);
    console.table(newGrid);
    setData(newGrid);
  };

///////////////
// class MyComponent extends Component {
//   onSwipeStart(event) {
//     console.log('Start swiping...', event);
//   }

//   onSwipeMove(position, event) {
//     console.log(`Moved ${position.x} pixels horizontally`, event);
//     console.log(`Moved ${position.y} pixels vertically`, event);
//   }

//   onSwipeEnd(event) {
//     console.log('End swiping...', event);
//   }

//   render() {
//     const boxStyle = {
//       width: '100%',
//       height: '100%',
//       opacity: 0.1,
//       // border: '1px solid black',
//       // background: '#ccc',
//       // padding: '20px',
//       // fontSize: '3em'
//     };

//     return (
//       <Swipe
//         onSwipeStart={this.onSwipeStart}
//         onSwipeMove={this.onSwipeMove}
//         onSwipeEnd={this.onSwipeEnd}>
//           {/* <div style={boxStyle}>Open the console and swipe me</div> */}
//       </Swipe>
//     );
//   }
// }

//ReactDOM.render(<MyComponent/>, document.getElementById('root'));
///////////////

// AddNumber - Add an item
const addNumber = (newGrid) => {
  let added = false;
  let gridFull = false;
  let attempts = 0;
  while (!added) {
    if (gridFull) {
      break;
    }

    let rand1 = Math.floor(Math.random() * 4);
    let rand2 = Math.floor(Math.random() * 4);
    attempts++;
    if (newGrid[rand1][rand2] === 0) {
      newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
      added = true;
    
    }
    
    if (attempts > 50) {
      gridFull = true;
      let gameOverr = checkIfGameOver();
      if (gameOverr) {
        alert("game over");
        setGameOver(true);
      }
      //setGameOver(true);
    }

  }
};

/////////////
/////////////
document.addEventListener('touchstart', handleTouchStart);        
//document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchStart);

var xDown = null;                                                        
var yDown = null;



function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    //const firstTouch = getTouches(evt)[0];                                      
    //xDown = firstTouch.clientX;                                      
    //yDown = firstTouch.clientY;   
    console.log(evt.type);    
    console.log(evt.touches);                                
};                                                
/*
function handleTouchMove(evt) {
   
    if ( ! xDown || ! yDown ) {
        return;
    }
    console.log(evt.touches);
   var xUp = evt.touches[0].clientX;                        
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if(xDiff>4 || yDiff>4){
      console.log(xDiff);
      console.log(yDiff);
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 && timer ==0) {
          
          timer = 3000
          swipeLeft()
          
          
        } else {
          timer = 3000
          SwipeRight()
            // right swipe 
            
            
        }                       
    } else if ( xDiff = 0 && timer ==0) {
        if ( yDiff > 0 ) {
            // up swipe 
            
        } else { 
            // down swipe 
            
        }                                                                 
    }
    }
    
    xDown = null;
    yDown = null;   
                                              
};
*/


function handleTouchEnd(evt) {
  //console.log(evt.touches);
  //console.log(evt.touches.clientX);
}

/////////////
/////////////
  

// Swipe - Right, Left, Up, Down

  // Swipe Left
  const swipeLeft = (dummy) => {
    //console.log("swipe left");
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };
// Swipe Right
const SwipeRight = (dummy) => {
    

  
    //console.log("swipe right");
    let oldData = data;
    let newArray = cloneDeep(data);

    

    for (let i = 3; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };
// Swipe Down
  const swipeDown = (dummy) => {
    console.log("swipe down");
    console.log(data);
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 3; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setData(b);
    }
  };
// Swipe Up
  const swipeUp = (dummy) => {
    console.log("swipe up");
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setData(b);
    }
  };


// CheckGameover
const checkIfGameOver = () => {
  console.log("CHECKING GAME OVER");
  // let original = cloneDeep(data);
  let checker = swipeLeft(true);

  if (JSON.stringify(data) !== JSON.stringify(checker)) {
    return false;
  }

  let checker2 = swipeDown(true);
  console.log("CHECKER DOWN");
  console.table(data);
  console.table(checker2);
  if (JSON.stringify(data) !== JSON.stringify(checker2)) {
    return false;
  }

  let checker3 = SwipeRight(true);

  if (JSON.stringify(data) !== JSON.stringify(checker3)) {
    return false;
  }

  let checker4 = swipeUp(true);

  if (JSON.stringify(data) !== JSON.stringify(checker4)) {
    return false;
  }

  return true;
};


// Reset

const resetGame = () => {
  setGameOver(false);
  const emptyGrid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  addNumber(emptyGrid);
  addNumber(emptyGrid);
  setData(emptyGrid);
};

// HANDLE KEY DOWN
const handleKeyDown = (event) => {
  if(gameOver){
    return;
  }

  
  switch (event.keyCode) {
    case UP_ARROW:
      // alert("up");
      // console.table(data);
      swipeUp();
      // console.table(data);
      break;
    case DOWN_ARROW:
      // console.table(data);
      swipeDown();
      // console.table(data);
      break;
    case LEFT_ARROW:
      // console.table(data);
      swipeLeft();
      // console.table(data);
      break;
    case RIGHT_ARROW:
      // console.table(data);
      SwipeRight();
      // console.table(data);
      break;
    default:
      break;
  }

  let gameOverr = checkIfGameOver();
  if (gameOverr) {
    alert("game over");
    setGameOver(true);
  }

};




useEffect(() => {
  initialize();
  //document.addEventListener('keydown',handleKeyDown);
  // eslint-disable-next-line
}, []);

  useEvent("keydown",handleKeyDown);

  return (
    <div className="App">
      <div
        style={{
          width: 345,
          margin: "auto",
          marginTop: 30,
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              fontFamily: "sans-serif",
              flex: 1,
              fontWeight: "700",
              fontSize: 60,
              color: "#776e65",
            }}
          >
            2048
          </div>
          <div
            style={{
              flex: 1,
              marginTop: "auto",
            }}
          >
            <div onClick={resetGame} style={style.newGameButton}>
              NEW GAME
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#AD9D8F",
            width: "max-content",
            height: "max-content",
            margin: "auto",
            padding: 5,
            borderRadius: 5,
            marginTop: 10,
            position: "relative",
          }}
        >
          {gameOver && (
            <div style={style.gameOverOverlay}>
              <div>
                <div
                  style={{
                    fontSize: 30,
                    fontFamily: "sans-serif",
                    fontWeight: "900",
                    color: "#776E65",
                  }}
                >
                  Game Over
                </div>
                <div>
                  <div
                    style={{
                      flex: 1,
                      marginTop: "auto",
                    }}
                  >
                    <div onClick={resetGame} style={style.tryAgainButton}>
                      Try Again
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Swipe
            onSwipeDown={() => {
              swipeDown();
            }}
            onSwipeLeft={() => swipeLeft()}
            onSwipeRight={() => SwipeRight()}
            onSwipeUp={() => swipeUp()}
            style={{ overflowY: "hidden" }}
          >
            {data.map((row, oneIndex) => {
              return (
                <div style={{ display: "flex" }} key={oneIndex}>
                  {row.map((digit, index) => (
                    <Block num={digit} key={index} />
                  ))}
                </div>
              );
            })}
          </Swipe>
        </div>

        <div style={{ width: "inherit" }}>
          <p class="game-explanation">
            <strong class="important">How to play:</strong> Use your{" "}
            <strong>arrow keys</strong> to move the tiles. When two tiles with
            the same number touch, they <strong>merge into one!</strong>
          </p>
        </div>
      </div>
    </div>
  );
}



const Block = ({num})=>{
  const { blockStyle } = style;

  return (
    <div
      style={{
        ...blockStyle,
        background: getColors(num),
        color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
      }}
    >
     
      {num !== 0 ? num : ""}
    </div>
  );
}

const style = {
  blockStyle: {
    height: 80,
    width: 80,
    background: "lightgray",
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "800",
    color: "white",
  }
}



export default App;

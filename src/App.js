import React, { useEffect } from "react";
import cloneDeep from "lodash.clonedeep";
import { useEvent, getColors } from "./service/utils";
import "./App.css";
import Swipe from "react-easy-swipe";
import { useGameDataContext } from "./service/contexts";
import { swipeDown, swipeLeft, swipeRight, swipeUp } from "./service/swipes";

function App() {
  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  const {
    data,
    setData,
    gameOver,
    checkGameOver,
    addNumber,
    initializeGame,
    resetGame,
  } = useGameDataContext();

  const gameDataContext = { data, setData, addNumber };

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

  // UseAddNumber - Add an item

  /////////////
  /////////////
  document.addEventListener("touchstart", handleTouchStart);
  //document.addEventListener('touchmove', handleTouchMove, false);
  document.addEventListener("touchend", handleTouchStart);

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return (
      evt.touches || // browser API
      evt.originalEvent.touches
    ); // jQuery
  }

  function handleTouchStart(evt) {
    //const firstTouch = getTouches(evt)[0];
    //xDown = firstTouch.clientX;
    //yDown = firstTouch.clientY;
    console.log(evt.type);
    console.log(evt.touches);
  }
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
          swipeRight()
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

  // HANDLE KEY DOWN
  const handleKeyDown = (event) => {
    if (gameOver) {
      return;
    }

    switch (event.keyCode) {
      case UP_ARROW:
        // alert("up");
        // console.table(data);
        swipeUp(false, gameDataContext);
        // console.table(data);
        break;
      case DOWN_ARROW:
        // console.table(data);
        swipeDown(false, gameDataContext);
        // console.table(data);
        break;
      case LEFT_ARROW:
        // console.table(data);
        swipeLeft(false, gameDataContext);
        // console.table(data);
        break;
      case RIGHT_ARROW:
        // console.table(data);
        swipeRight(false, gameDataContext);
        // console.table(data);
        break;
      default:
        break;
    }

    checkGameOver();
  };

  useEffect(() => {
    initializeGame();
    //document.addEventListener('keydown',handleKeyDown);
    // eslint-disable-next-line
  }, []);

  useEvent("keydown", handleKeyDown);

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
              swipeDown(false, gameDataContext);
            }}
            onSwipeLeft={() => swipeLeft(false, gameDataContext)}
            onSwipeRight={() => swipeRight(false, gameDataContext)}
            onSwipeUp={() => swipeUp(false, gameDataContext)}
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

const Block = ({ num }) => {
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
};

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
  },
};

export default App;

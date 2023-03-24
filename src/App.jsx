import { useState, useRef } from 'react'
import Navbar from './Components/Navbar'
import Tracklist from './Components/Tracklist'
import soundtracks from './assets/soundtracks'

function App() {
  const [clicked, setclicked] = useState(false)
  const [context, setcontext] = useState(true)
  const [progress, setprogress] = useState(false)
  const [playbtn, setplaybtn] = useState("▶")
  const [que, setque] = useState(soundtracks[0])

  const currentsong = useRef()

  const next = () => {
    if (soundtracks.indexOf(soundtracks.filter(item => item.songname.toLowerCase().includes(que.songname.toLowerCase()))[0]) != soundtracks.length - 1) {
      setque(soundtracks[soundtracks.indexOf(soundtracks.filter(item => item.songname.toLowerCase().includes(que.songname.toLowerCase()))[0]) + 1])
    }
    else { currentsong.current.pause() }
  }


  const previous = () => {
    if (soundtracks.indexOf(soundtracks.filter(item => item.songname.toLowerCase().includes(que.songname.toLowerCase()))[0]) != 0) {
      setque(soundtracks[soundtracks.indexOf(soundtracks.filter(item => item.songname.toLowerCase().includes(que.songname.toLowerCase()))[0]) - 1])

    }
    else { currentsong.current.pause() }
  }

  const playPause = () => {
    if (context) {
      init()
      render()
      if (currentsong.current.paused) {
        setplaybtn("||")
        currentsong.current.play()
      }
      else {
        setplaybtn("▶")
        currentsong.current.pause()
      }
    }
    else {
      if (currentsong.current.paused) {
        setplaybtn("||")
        currentsong.current.play()
      }
      else {
        setplaybtn("▶")
        currentsong.current.pause()
      }
    }
    setcontext(false)
  }

  const clickhandler = (e) => {
    if (e.target.innerText.length < 50) {
      setque(soundtracks.filter(item => item.songname.toLowerCase().includes(e.target.innerText.toLowerCase()))[0])
      setclicked(true)
    }

    else {
      console.log("click ignored")
    }
  }

  // Controls
  const colBg = "#65c946";
  const colBar0 = '#38e9e0';
  const colBar1 = '#07012b';
  const colBar2 = '#c2319e';

  const fftSz = 1024;
  const barWidth = 2;
  const barLength = 0.25;
  const bassFactor = 1.2;

  let canvasCtx, audioCtx, audio, stream, analyser, buf, bufLength;

  function render() {
    requestAnimationFrame(render);
    visCircle();
  }

  function init() {
    audioCtx = new AudioContext();
    canvasCtx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create stream and analyser
    stream = audioCtx.createMediaElementSource(currentsong.current);
    analyser = audioCtx.createAnalyser(); // Analyser
    analyser.fftSize = fftSz;
    bufLength = analyser.frequencyBinCount;
    buf = new Uint8Array(bufLength); // Buffer

    // Connections
    stream.connect(analyser);
    analyser.connect(audioCtx.destination);
    // console.log(`buff is ${buf}, bufflength is ${bufLength}, stream ${stream}`)
  }

  // Visualisation technique

  function visCircle() {
    analyser.getByteFrequencyData(buf);
    let threshold = 0;
    let width = 100;
    let dtRot = (360 / bufLength * 2) * Math.PI / 180;
    let bass = Math.floor(buf[1]);
    let radius = -(width * barLength + bass * bassFactor);

    canvasCtx.fillStyle = colBg;
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.save();
    canvasCtx.scale(0.5, 0.5);
    canvasCtx.translate(window.innerWidth, window.innerHeight);

    function draw(rad, wdt, mlt, rot) {
      for (let i = 0; i < bufLength; ++i) {
        let smp = buf[i];
        if (smp >= threshold) {
          canvasCtx.fillRect(0, rad, wdt, -smp * mlt);
          canvasCtx.rotate(rot);
        }
      }
    }
    canvasCtx.fillStyle = colBar0;
    draw(radius, barWidth, 1.00, dtRot);
    draw(radius, barWidth, 1.00, -dtRot);
    canvasCtx.fillStyle = colBar1;
    draw(radius, barWidth, 0.50, dtRot);
    draw(radius, barWidth, 0.50, -dtRot);
    canvasCtx.fillStyle = colBar2;
    draw(radius, barWidth, 0.05, dtRot);
    draw(radius, barWidth, 0.05, -dtRot);
    canvasCtx.restore();
  }


  return (
    <>
      <div className="flex-column-center">
        <Navbar />
        <div id="playlist" onClick={clickhandler}>
          <Tracklist soundtracks={soundtracks} />
          <audio src={que.tracklink} ref={currentsong} crossOrigin={'anonymous'}></audio>
        </div>
        <div className="canvas"><canvas id='canvas'></canvas></div>
        <div className="playercontrols">
          <div className="controlbtns">
            <p>{que.songname}</p>
            <div className="flex-row-center">
              <img id="currentsongimage" src={que.bgimage} alt="no image" />
              <button onClick={previous} className="playerbtn" type="button">Prev</button>
              <button onClick={playPause} className="playerbtn" type="button">{playbtn}</button>
              <button onClick={next} className="playerbtn" type="button">Next</button>
            </div>
          </div>
          <div className="slider">
            <input type="range" name="range" id="range" value="0" />
          </div>
        </div>
      </div>
    </>
  )
}

export default App

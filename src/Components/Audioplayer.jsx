import React from 'react'
import { useState, useEffect, useRef } from 'react'

const Audioplayer = ({ que }) => {
    const [playbtn, setplaybtn] = useState("▶")
    // const [playset, setplayset] = useState("")
    const [flag, setflag] = useState(false)

    // console.log(que)


    let soundtracks = [
        {
            songname: "Stranger things",
            tracklink: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_ecba0c58a1.mp3?filename=stranger-things-124008.mp3",
            bgimage: "https://pixabay.com/images/download/way-7522066_640.jpg?attachment"
        },
        {
            songname: "In Search of",
            tracklink: "https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=lifelike-126735.mp3",
            bgimage: "https://pixabay.com/images/download/maze-2264_640.jpg?attachment"
        },
        {
            songname: "Cinematic",
            tracklink: "https://cdn.pixabay.com/download/audio/2022/03/07/audio_79bd0ad83e.mp3?filename=cinematic-atmosphere-score-2-22136.mp3",
            bgimage: "https://pixabay.com/images/download/family-7108650_640.jpg?attachment"
        },
        {
            songname: "Mystery unfold",
            tracklink: "https://cdn.pixabay.com/download/audio/2022/10/07/audio_94333066a7.mp3?filename=let-the-mystery-unfold-122118.mp3",
            bgimage: "https://pixabay.com/get/g6f3526180afc2ab635e328f391204605135df285dabee038110a9047b8dfbbc03f27c3a02e3f050ac2d6f33b524bb2d5d0af15cb68975d996262a3d14b45a063987b520776d7df0e94d16131abc1d811_640.jpg"
        },
        {
            songname: "Inspiring",
            tracklink: "https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3?filename=inspiring-cinematic-ambient-116199.mp3",
            bgimage: "https://pixabay.com/get/ge643126bdc44f4b562d524a84ed1fa5004c99a3e18596c3087b298d5b6a3cbf43c9d89a40d4e886ce1d74f83b12f88ab04f07269769e3632fd5aef6ea90f9edbe74edb5bfd84a3eb41d777ab9eb0c233_640.jpg"
        },
        {
            songname: "Awaken by OYstudio",
            tracklink: "https://cdn.pixabay.com/download/audio/2023/01/27/audio_e649bbdf58.mp3?filename=awaken-136824.mp3",
            bgimage: "https://cdn.pixabay.com/photo/2016/02/13/10/35/tulips-1197602__340.jpg"
        }
    ]
    // let songquery = soundtracks.filter(item => item.songname.toLowerCase().includes(que.toLowerCase()))[0].tracklink
    let myAudio = new Audio(que)

    // audioplayer 
    let progress
    // let myAudio = document.getElementById('myAudio')

    // const playAudio = () => {
    //     new Audio(myAudio).play()
    //     // myAudio.play()
    //     setflag(true)
    //     // console.log(flag)
    // }

    // const pauseAudio = () => {
    //     new Audio(myAudio).pause()
    //     setflag(false)
    //     // setplaybtn("▶")

    // }  

    const next = () => {
        if (soundtracks.indexOf(setsong) != soundtracks.length - 1) { setsong = soundtracks[soundtracks.indexOf(setsong) + 1] }
        playAudio()
    }

    const previous = () => {
        if (soundtracks.indexOf(setsong) != 0) { setsong = soundtracks[soundtracks.indexOf(setsong) - 1] }
        playAudio()
    }

    const playPause = () => {
        if (myAudio.paused) {
            myAudio.play()
            // console.log(songquery)
            // setflag(true)
        }
        else {
            myAudio.pause()
            // setflag(false) 
        }
    }

    // useEffect(() => {
    //     setplayset(soundtracks.filter(item => item.songname.toLowerCase().includes(que.toLowerCase()))[0].tracklink)
    // }, [])

    // search.addEventListener("keypress", function (event) {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         searcher()
    //     }
    // })
    return (
        <>
            {/* <audio id="myAudio">
            <source src={que.tracklink} type="audio/mp3" />
            Your browser does not support the audio element.ref={audioElem}
        </audio> */}
        <audio src={soundtracks[0].tracklink}/>
            <div className="playercontrols">
                <div className="controlbtns">
                    {/* <label id="currentsongname" htmlFor='range'>{que.songname}</label> */}
                    <div className="flex-row-center">
                        <img id="currentsongimage" src={soundtracks[0].bgimage} alt="no image" />
                        {/* <button onClick={previous} className="playerbtn" type="button">Prev</button> */}
                        <button onClick={playPause} className="playerbtn" type="button">{playbtn}</button>
                        {/* <button onClick={next} className="playerbtn" type="button">Next</button> */}
                    </div>
                </div>
                {/* <div className="slider">
                <input type="range" name="range" id="range" value="0"/>
            </div> */}
            </div>

        </>
    )
}

export default Audioplayer
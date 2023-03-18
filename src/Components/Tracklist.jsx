import React from 'react'

const Tracklist = ({soundtracks}) => {
    
    return (
        <>
            <div className="flex-row-center">
                {soundtracks.map((song) => { 
                    return <div className="songbox" style={{ backgroundImage: `url(${song.bgimage})` }} >
                        <p className="songnames">{song.songname}</p>
                    </div>
                })}
            </div>
        </>
    )
}

export default Tracklist
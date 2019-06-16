import React from 'react'
import {Link} from 'react-router-dom'
const Track = (props) => {
    const { track } = props;
    console.log(track);
    return (
        <div className="col-md-6">
            <div className="card mb-4">
                <div className="card-body">
                    <h5>{track.track_name}</h5>
                    <h6 className="text-info">{track.artist_name}</h6>
                    <Link to={`lyrics/track/${track.track_id}`} >See Lyrics</Link>
                </div>
            </div>
        </div>
    )
}

export default Track;
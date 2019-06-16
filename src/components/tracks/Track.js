import React from 'react'
const Track = (props) => {
    const { track } = props;
    console.log(track);
    return (
        <div className="col-md-6">
            <div className="card mb-4">
                <div className="card-body">
                    <h5>{track.track_name}</h5>
                </div>
            </div>
            
        </div>
    )
}

export default Track;
import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';

class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {}
    }
    componentDidMount(){


        const urlLyrics = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`;
        console.log(urlLyrics)
        axios.get(urlLyrics)
        .then(res => {
            console.log(res.data);
            this.setState({lyrics: res.data.message.body.lyrics});

            const url = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`;
            axios.get(url)
            .then(res => {
                console.log(res.data)
                this.setState({track: res.data.message.body.track})
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    render() {
        const {track , lyrics} = this.state;

        if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0 ){
            return <Spinner />
        }else{
            let newText = lyrics.lyrics_body.split ('\n').map ((item, i) => <p key={i}>{item}</p>);

            return  (
                <React.Fragment>
                    <h3 className="text-center mb-4">{ track.track_name }</h3>
                    <div className="text-center mb-4">
                        { newText }
                    </div> 
                </React.Fragment>
                
            )
        }
    }
}

export default Lyrics;

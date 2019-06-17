import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from "../../context";
import { classBody } from '@babel/types';

class Search extends Component {

    state = {
        trackTitle: ""
    }

    // Arrow to bind
    onChange = (e) => {
        this.setState({trackTitle: e.target.value});
    }

    findTracks = (dispatch, e) =>{
        e.preventDefault();

        const {trackTitle} = this.state;
        const url = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&s_track_rating=desc&s_artist_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`;
        // console.log(url)
        axios.get(url)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: "SEARCH_TRACKS",
                    payload: res.data.message.body.track_list
                })
                // this.setState({track_list: res.data.message.body.track_list})
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Consumer>
                { value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fa fa-music"></i>Search For a Song
                            </h1>
                            <p className="lead text-center">Get the lyrics for any song</p>

                            <form onSubmit={this.findTracks.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input type="text" className="form-control"
                                     placeholder="song title" 
                                     name="trackTitle" 
                                     value={this.state.trackTitle}
                                     onChange={this.onChange}
                                    />
                                </div>
                                <button className="btn btn-info btn-lg btn-block mb-5" type="submit">Get Track lyrics</button>
                            </form>

                        </div>
                    );
                }}
            </Consumer>
         
        )
    }
}


export default Search;
import React, {useState} from 'react'

import { withRouter } from 'react-router'

function Play(props) {
    const [state , setState] = useState({
        roomId:"",
        rooms: []
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    function joinRoom(roomIDToBeUsed) {
        console.log(roomIDToBeUsed)
        const url = `http://127.0.0.1:8000/play/${roomIDToBeUsed}/joinRoom/`
        fetch(url).then(res => {return res.json()}).then(data => console.log(data)).catch(error => console.log("Error"))
    }

    function availabeRooms() {
        const url = "http://127.0.0.1:8000/play/"
        fetch(url, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Token ec5e0e255e66fe1a9378325c7edc3c02a3ed4709"
            }
        }).then(res => {return res.json()}).then(data => setState({rooms: data})).catch(error => console.log("Error"))
    }

    function createRoom() {
        console.log(state.roomId)
        const information = {
            "roomId": state.roomId
        }

        fetch("http://127.0.0.1:8000/play/createRoom/", {
            method: 'POST', 
            body: JSON.stringify(information),
            headers: {
                "Content-type": "application/json",
                "Authorization": "Token ec5e0e255e66fe1a9378325c7edc3c02a3ed4709"
            }
        }).then(res => {
            return res.json()
            })
            .then(data => console.log(data))
            .catch(error => console.log("Error"))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        createRoom()
    }

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <h1>Welcome to Game Room!</h1>

            <h2>You can join or create Room Here!</h2>

            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input type="text" 
                        className="form-control" 
                        id="roomId" 
                        placeholder="Enter Room Id"
                        onChange={handleChange} 
                        value={state.roomId}
                    />
                </div>
                <h1>    </h1>
                <div>
                    <button type="submit" onClick={handleSubmitClick}>Create Room</button>
                </div>
            </form>

            <div>
                <h1>Available Rooms</h1>
            </div>

            <h1>   </h1>

            <button onClick={availabeRooms}>Get Available Rooms</button>

            <div>
                <h1>RoomID - RoomName - NoOfPlayers</h1>
                {state.rooms.map(room => (
                    <div key={room.id}>
                        <h2>{room.id} - {room.roomId}</h2>
                        <button onClick={joinRoom}>Join</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default withRouter(Play);
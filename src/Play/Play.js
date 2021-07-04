import React, {useState} from 'react'

import { withRouter } from 'react-router'
import StartGame from './StartGame'

// ["8c0000b275a995c128c12424d172e4a998e83ac5", "74a7830a826023859f16a619ec2ab260715aa389", "900e748b0ad69b5d233b15c5483873395d572fe8", "ae959ad5e201380b0041f8f346b620f4cbe21371", "fce31f58033bb41915e86cc29ef467ce85400dd1", "1e3721f9d261df3fd0fa9154f9c77de4e5ec7919", "842b1f5564798e1e5fd07b3c73a9e1b6bea18421"]

function Play(props) {
    const [state , setState] = useState({
        roomId:"",
        rooms: [],
        decidedRoomId: ""
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }


    function startGame() {
        const url = `http://127.0.0.1:8000/play/ghsdjfkjsfkkmfka/startGame/`
        fetch(url, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Token ec5e0e255e66fe1a9378325c7edc3c02a3ed4709"
            }
        }).then(res => {return res.json()}).then(data => console.log(data)).catch(error => console.log("Error"))
    }


    function joinRoom(givenRoomId) {
        setState({decidedRoomId: givenRoomId})
        const url = `http://127.0.0.1:8000/play/${givenRoomId}/joinRoom/`
        fetch(url, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Token 900e748b0ad69b5d233b15c5483873395d572fe8"
            }
        }).then(res => {return res.json()}).then(data => console.log(data)).catch(error => console.log("Error"))
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

    if (state.decidedRoomId !== "") {
        return <StartGame roomId={state.decidedRoomId} />
    }


    return (
        <>
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
                            <h2>{room.id} - {room.roomId} - {room.noOfPlayers}</h2>
                            <button onClick={e=> joinRoom(room.roomId)}>Join</button>
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={startGame}>Start Game</button>
        </>
    )
}

export default withRouter(Play);
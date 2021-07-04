import React from 'react'

import CountDown from './CountDown'


export default class StartGame extends React.Component {
    constructor() {
        super();
        // this.counter = this.counter.bind(this);
    }

    state = {
        token: "ec5e0e255e66fe1a9378325c7edc3c02a3ed4709",
        loading: true,
        players: [],
        playerType: "Not Getting",
        username: "",
        hasGameStarted: false,
        isMafiaTime: true, 
        isDetectiveTime: true, 
        isDoctorTime: true,
        currentTime: 0,
        returnedResponses: {
            startGameResponse: "No Response",
            joinRoomResponse: "No Response",
            killSomeoneResponse: "No Response",
            chooseSomeoneResponse: "No Response",
            saveSomeoneResponse: "No Response"
        }
    }

    async componentDidMount() {
        const url = `http://127.0.0.1:8000/play/${this.props.roomId}/playersInRoom/`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            this.setState({players: data, loading:false})
        }
        else{
            console.log("Error")
        }

        const url2 = `http://127.0.0.1:8000/play/playerType/`
        const response2 = await fetch(url2, {headers: {
            "Content-type": "application/json",
            "Authorization": `Token ${this.state.token}`
        }})
        if (response2.ok) {
            const data2 = await response2.json();
            console.log(data2)
            this.setState({playerType:data2})
        }
        else{
            console.log("Error")
        }


        const url3 = `http://127.0.0.1:8000/myUsername/`
        const response3 = await fetch(url3, {headers: {
            "Content-type": "application/json",
            "Authorization": `Token ${this.state.token}`
        }})
        if (response3.ok) {
            const data3 = await response3.json();
            this.setState({username:data3})
        }
        else{
            console.log("Error")
        }
    }

    async startGame(roomIdToStart) {
        const url = `http://127.0.0.1:8000/play/${roomIdToStart}/startGame/`
        const response = await fetch(url, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Token ${this.state.token}`
            }})
        if (response.ok) {
            const data = await response.json();
            this.setState({returnedResponses: {startGameResponse:data}})
            if (this.state.returnedResponses.startGameResponse !== "Only Owner Can Start Game") {
                this.setState({hasGameStarted: true})
            }
        }
        else{
            console.log("Error")
        }
    }

    // firstCountdownEnded() {
    //     this.setState({isMafiaTime:false, isDetectiveTime:true})
    // }

    // secondCountdownEnded() {
    //     this.setState({isDetectiveTime:false, isDoctorTime:true})
    // }

    // thirdCountdownEnded() {
    //     this.setState({isDoctorTime: false})
    // }

    // citySleeps() {
    //     this.state.currentTime = setInterval(this.counter, 1000)
    // }

    // counter() {
    //     if (this.state.currentTime === 30) {
    //         this.firstCountdownEnded()
    //     }
    //     else if (this.state.currentTime === 60) {
    //         this.secondCountdownEnded()
    //     }
    //     else if (this.state.currentTime === 90) {
    //         this.thirdCountdownEnded()
    //     }
    //     else {
    //         clearInterval(this.counter)
    //     }
    //     this.setState({currentTime: this.state.currentTime+1})
    // }

    async killSomeOne(userUsername, givenRoomId) {
        const url = `http://127.0.0.1:8000/play/${userUsername}/${givenRoomId}/killSomeone/`
        const response = await fetch(url, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Token ${this.state.token}`
            }})
        if (response.ok) {
            const data = await response.json();
            this.setState({returnedResponses: {killSomeoneResponse:data}})
        }
        else{
            console.log("Error")
        }
    }

    async chooseSomeone(userUsername, givenRoomId) {
        const url = `http://127.0.0.1:8000/play/${userUsername}/${givenRoomId}/chooseSomeone/`
        const response = await fetch(url, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Token ${this.state.token}`
            }})
        if (response.ok) {
            const data = await response.json();
            this.setState({returnedResponses: {chooseSomeoneResponse:data}})
        }
        else{
            console.log("Error")
        }
    }

    async saveSomeone(userUsername, givenRoomId) {
        const url = `http://127.0.0.1:8000/play/${userUsername}/${givenRoomId}/saveSomeone/`
        const response = await fetch(url, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Token ${this.state.token}`
            }})
        if (response.ok) {
            const data = await response.json();
            this.setState({returnedResponses: {saveSomeoneResponse:data}})
        }
        else{
            console.log("Error")
        }
    }

    render() {
        if (this.state.loading) {
            return <div>Loading</div>
        }
        if (!this.state.players.length) {
            return <div>No Players</div>
        }

        if (!this.state.hasGameStarted) {
            return <button onClick={() => this.startGame(this.props.roomId)}>Start Game</button>
        }

        // this.citySleeps()


        if (this.state.playerType === "Mafia" && this.state.isMafiaTime) {
            return (
                <div>
                    <h1>Game Started - {this.state.username} </h1> <CountDown startCountDown={this.state.hasGameStarted} />
                    {this.state.players.map(player => (
                        <div key={player}>
                            {player} - <button onClick={() => this.killSomeOne(player, this.props.roomId)}>Kill</button> - {this.state.returnedResponses.killSomeoneResponse}
                        </div>
                    ))}
                </div>
            )
        }

        if (this.state.playerType === "Detective" && this.state.isDetectiveTime) {
            return (
                <div>
                    <h1>Game Started - {this.state.username} </h1> <CountDown startCountDown={this.state.hasGameStarted} />
                    {this.state.players.map(player => (
                        <div key={player}>
                            {player} - <button onClick={() => this.chooseSomeOne(player, this.props.roomId)}>Choose</button> - {this.state.returnedResponses.chooseSomeoneResponse}
                        </div>
                    ))}
                </div>
            )
        }

        if (this.state.playerType === "Doctor" && this.state.isDoctorTime) {
            return (
                <div>
                    <h1>Game Started - {this.state.username} </h1> <CountDown startCountDown={this.state.hasGameStarted} />
                    {this.state.players.map(player => (
                        <div key={player}>
                            {player} - <button onClick={() => this.saveSomeone(player, this.props.roomId)}>Save</button> - {this.state.returnedResponses.saveSomeoneResponse}
                        </div>
                    ))}
                </div>
            )
        }

        return (
            <div>
                <h1>Game Started - {this.state.username} {this.props.roomId} </h1>
                {this.state.players.map(player => (
                    <div key={player}>
                        {player}
                    </div>
                ))}
            </div>
        )
    }
}
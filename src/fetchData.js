import React from 'react'

export default class FetchData extends React.Component {
    state = {
        loading: true,
        rooms: []
    }

    async componentDidMount() {
        const url = "http://127.0.0.1:8000/play/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            this.setState({rooms: data, loading:false})
            console.log(data)
        }
        else{
            console.log("Hey")
        }
    }

    render() {
        if (this.state.loading) {
            return <div>Loading</div>
        }
        if (!this.state.rooms.length) {
            return <div>No Rooms</div>
        }

        return (
            <div>
                {this.state.rooms.map(room => (
                    <div>
                        <div>{room.id}</div>
                        <div>{room.roomId}</div>
                    </div>
                ))}
            </div>
        )
    }
}
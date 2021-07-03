import React from 'react'

import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h1><Link to='/register/'>Register Here</Link></h1>
            <h1><Link to='/login/'>  Login Here</Link></h1>
        </div>
    )
}

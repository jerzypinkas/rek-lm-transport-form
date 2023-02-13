
import React, { Component } from 'react'
import { render } from 'react-dom'
import App from './App'

render(
    // <Message color="blue" minutes={50} msg="how are yooooou?" />,
    // <SkiDayCounter2 powderDays={data.powderDays} total={data.total} progress={calcProgress(data.total, data.powderDays)}/>,
    <div>
        <App />
    </div>,
    document.getElementById('root')
)
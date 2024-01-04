import React, { forwardRef } from 'react'
import './style.scss'

interface props {
    children: React.ReactNode
}

const DrawerForm = forwardRef(({ children }: props, ref) => {
    return (
        <div id='drawer-form'>
            <div id="blur-area" />
            <div id="content">
                drawer
            </div>
        </div>
    )
})

export default DrawerForm
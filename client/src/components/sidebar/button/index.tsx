import React, { Fragment, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'

interface props {
    Svg?: React.ReactNode,
    content?: string,
    children?: React.ReactNode,
    active?: boolean,
    href?: string,
    id?: string
}

const Button = ({ Svg, content, children, active, href, id }: props) => {
    const navigate = useNavigate();

    const btn = useRef<HTMLButtonElement | null>(null)

    const showMore = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const onClick = (e: any) => {
            if (children && !active &&
                showMore?.current?.getAttribute("id") !== e?.target?.getAttribute("id") &&
                !showMore?.current?.contains(e?.target)) {
                showMore?.current?.classList?.remove("active")
                btn?.current?.classList?.remove("active")
            }
        }

        window.addEventListener("click", onClick)

        return () => {
            window.removeEventListener("click", onClick)
        }
    }, [])

    return (
        <Fragment>
            <button
                ref={btn}
                data-btn-for="sidebar"
                id={id}
                className={`${active && "active"} ${children && "show_more"}`}
                onClick={() => {
                    if (children && !active) {
                        showMore?.current?.classList?.add("active")
                        btn?.current?.classList?.add("active")
                    } else if (!children && href) {
                        navigate(href)
                    }
                }}
            >
                {Svg}

                {content}

                {children && <div className="arrow" />}
            </button>

            {children && <div
                id={id}
                data-btn-action="show_more_items"
                ref={showMore}
                className={`${active && "active"}`}
            >
                {children}
            </div>}
        </Fragment>
    )
}

export default Button
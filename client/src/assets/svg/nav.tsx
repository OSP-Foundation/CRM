interface props {
    width: string,
    height: string,
    className?: string,
}

const Nav = ({ width, height, className }: props) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 52 52"
            data-name="Layer 1"
            id="Layer_1"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50,12.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z" />
            <path d="M50,28H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z" />
            <path d="M50,43.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z" />
        </svg>
    )
}

export default Nav
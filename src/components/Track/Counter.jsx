function Counter({ current, duration, color }) {
    return (
        <div
            className={`
            ${color}
            my-4
            mx-auto
            p-4
            rounded-full
            justify-between
            text-center
            w-48
            ${current == duration || current == 0 ? "brightness-[60%]" : "brightness-[140%] scale-125"}
            `}
        >
            {current / 10} / {duration / 10}
        </div>
    )
}

export default Counter

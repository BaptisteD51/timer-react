function Counter({ current, duration }) {
    return (
        <div
            className={`
          bg-red-800
            my-4
            p-4
            rounded-full
            justify-between
            text-center
            ${current == duration || current == 0 ? "brightness-[60%]" : "brightness-[140%]"}
            `}
        >
            {current / 10} / {duration / 10}
        </div>
    )
}

export default Counter

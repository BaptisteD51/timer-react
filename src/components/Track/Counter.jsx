import { getFullMinutes, getRemainingSecs, getRemainingTenths} from '../../functions/functions.js'

function Counter({ current, duration, color }) {
    let fullMinDur = getFullMinutes(duration)
    let remSecDur  = getRemainingSecs(duration)

    let fullMinCur = getFullMinutes(current)
    let remSecCur  = getRemainingSecs(current)
    let remTenCur  = getRemainingTenths(current)

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

            <span className='text-xl'>
                { fullMinCur } m&nbsp;
                { remSecCur }.{ remTenCur } s&nbsp;
            </span>
            <span className='text-sm text-gray-700'>
                { fullMinDur } m&nbsp; 
                { remSecDur } s
            </span>
        </div>
    )
}

export default Counter

export function getFullMinutes(tenth){
    return parseInt(tenth / 600)
}

export function getRemainingSecs(tenth){
    return parseInt( (tenth % 600) / 10 )
}

export function getRemainingTenths(tenth){
    return parseInt( tenth % 10 )
}

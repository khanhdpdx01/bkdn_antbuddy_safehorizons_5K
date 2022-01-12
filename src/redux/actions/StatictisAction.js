export const statictis = () => {
    return {
        type: 'STATICTIS',
    }
}

export const statictisSuccess = payload => {
    return {
        type: 'STATICTIS_SUCCESS',
        payload: payload
    }
}
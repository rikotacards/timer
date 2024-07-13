export const getTimeWindow = (window: string) => {
    const to = new Date(); 
    const from = new Date();

    if(window === 'd'){
        from.setDate(from.getDate()-1)
    }
    if(window === 'w'){
        from.setDate(from.getDate()-7)

    }
    if(window === 'm'){
        from.setDate(from.getDate()-30)
    }
    if(window === '6m'){
        from.setDate(from.getDate()-180)
    }

    return {
        to: to,
        from,
    }
}
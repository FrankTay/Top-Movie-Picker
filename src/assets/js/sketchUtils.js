export const breakpointData = {
    default: {pinSize: "l", translate: -7000, scale: 30, wheelPerimeterOffset: 172, btnXTextOffset: 266 , canvX:window.innerWidth},
    1200:    {pinSize: "l", translate: -7100, scale: 30, wheelPerimeterOffset: 65, btnXTextOffset: 159 , canvX:window.innerWidth},
    1024:    {pinSize: "s", translate: -7150, scale: 30, wheelPerimeterOffset: 65, btnXTextOffset: 115, canvX:window.innerWidth},
    860:     {pinSize: "l", translate: -7000, scale: 30, wheelPerimeterOffset: 172, btnXTextOffset: 266, canvX:window.innerWidth},
    540:     {pinSize: "l", translate: -7150, scale: 30, wheelPerimeterOffset: 65, btnXTextOffset: 159, canvX:window.innerWidth},
    480:     {pinSize: "s", translate: -4775, scale: 20, wheelPerimeterOffset: -70, btnXTextOffset: -15, canvX:window.innerWidth},
}


export const positioning = (width) => {
    if (width < 550) { // phone size
        return breakpointData[480]
    } else if (width < 680) { // phone size
        return breakpointData[540]
    } else if (width < 860) { // tablet size
        return breakpointData[860]
    } else if (width < 1024){ // large tablet and small/low res monitor
        return breakpointData[1024]
    } else if (width < 1200){ // small laptop tablet
        return breakpointData[1200]
    } else {
        return breakpointData.default
    }
}


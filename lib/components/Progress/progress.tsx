import React, { FC, useEffect, useMemo, useState } from 'react'
import { themeProps } from '../Icon/icon'

export interface ProgressProps {
    /**传入数字 */
    percent: number,
    /**条状进度条的高度 */
    strokeHeight?: number,
    /**条状进度条的主体颜色 */
    theme?: themeProps;
    /**是否开启环状进度条 */
    circle?: boolean;
    /**环状进度条的大小 */
    size?: number,
    /**进度条文本 */
    showText?: boolean,
    /**样式 */
    styles?: React.CSSProperties,
}



export const Progress: FC<ProgressProps> = props => {
    const { percent, strokeHeight, showText, styles, theme, circle, size } = props
    const [state, setState] = useState(0);
    const [dashOffset, setdashOffset] = useState(0);
    useMemo(() => {
        if (percent < 0) {
            setState(0);
        } else if (percent > 100) {
            setState(100);
        } else {
            setState(percent);
        }
    }, [percent]);

    useEffect(() => {
        if (circle) {
            let percent = state / 100
            let perimeter = Math.PI * 2 * 50; //圆形的周长
            let dashOffset = (1 - percent) * perimeter;
            setdashOffset(dashOffset);
        }
    }, [circle, state]);

    return (
        <>
        <div className="rookie-progress-wrapper">
            {circle ?
                <div className='rookie-progress-circle' style={styles}>
                    <svg width={`${size}`} height={`${size}`} viewBox="0 0 100 100">
                        <circle className="circle-background" cx="50" cy="50" r="50" fill="transparent" />
                        <circle className="circle-bar" cx="50" cy="50" r="50" fill="transparent" strokeDasharray="314" strokeDashoffset={`${dashOffset}`} />
                        {showText && <text className='inner-text' x="50" y="50" fill="black" textAnchor="middle" alignmentBaseline="middle">{`${state}%`}</text>}
                    </svg>
                </div> 
                :
                <div className="rookie-progress-bar" style={styles} >
                    <div className='rookie-progress-bar-outer' style={{ height: `${strokeHeight}px` }}>
                        <div
                            className={`rookie-progress-bar-inner color-${theme}`}
                            style={{ width: `${state}%` }}
                        >
                            {showText && <span className='inner-text'>{`${state}%`}</span>}
                        </div>
                    </div>
                </div>
            }
        </div>
        </>
    )
}

Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary',
    circle: false,
    size: 200
}
export default Progress;
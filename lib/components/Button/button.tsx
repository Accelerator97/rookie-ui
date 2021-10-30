import classNames from 'classnames'
import * as React from 'react'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string
}
type NatvieButtonProps = React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> & BaseButtonProps
export type ButtonProps = Partial<NatvieButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
    const { btnType, disabled, size, children, href ,className,...restprops} = props
    const classes = classNames('btn',className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })
    if (btnType === 'link' && href) {
        return (
            <a className={classes} href={href} {...restprops}>{children}</a>
        )
    } else {
        return (
            <button className={classes} disabled={disabled} {...restprops}>{children}</button>
        )
    }
}
Button.defaultProps={
    disabled:false,
    btnType:'default'
}

export default Button

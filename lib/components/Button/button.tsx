import classNames from 'classnames'
import * as React from 'react'

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}
export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

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
        'disabled': (btnType === ButtonType.Link) && disabled
    })
    if (btnType === ButtonType.Link && href) {
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
    btnType:ButtonType.Default
}

export default Button

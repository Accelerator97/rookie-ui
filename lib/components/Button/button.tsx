import classNames from 'classnames'
import React,{ButtonHTMLAttributes,AnchorHTMLAttributes,FC} from 'react'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    /**链接按钮跳转地址 */
    href?: string
}
type NatvieButtonProps = ButtonHTMLAttributes<HTMLElement> & BaseButtonProps
type AnchorButtonProps = AnchorHTMLAttributes<HTMLElement> & BaseButtonProps
export type ButtonProps = Partial<NatvieButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = (props) => {
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

export default Button;

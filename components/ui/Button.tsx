"use client";

import React from 'react';

type Variant = 'primary' | 'outline' | 'gold' | 'neutral' | 'ghost' | 'link';

export type ButtonProps = (React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>) & {
  variant?: Variant;
  href?: string;
  children?: React.ReactNode;
  className?: string;
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-600 to-rose-500 text-white font-semibold text-sm rounded-xs transition-all shadow-lg hover:from-pink-700 hover:to-rose-600 hover:shadow-xl active:scale-95',
  outline: 'btn-outline',
  gold: 'btn-gold',
  neutral: 'inline-flex items-center gap-2 px-4 py-2 rounded-xs border-2 border-pink-300 text-pink-700 bg-white/95',
  ghost: 'inline-flex items-center gap-2 px-4 py-2 rounded-xs bg-transparent text-slate-700',
  link: 'text-pink-600 underline',
};

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
  const { variant = 'primary', href, children, className = '', type = 'button', disabled, ...rest } = props as ButtonProps;
  const vclass = VARIANT_CLASS[variant] ?? '';
  const classes = `${vclass} ${className}`.trim();

  if (href) {
    const aprops = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes} {...aprops}>
        {children}
      </a>
    );
  }

  const bprops = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type} disabled={disabled} className={classes} {...bprops}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;

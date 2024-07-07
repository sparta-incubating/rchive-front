import React, { ComponentProps } from 'react';
import Label from '../atoms/label';
import Input from '../atoms/input';
import { cva, VariantProps } from 'class-variance-authority';
import { classMerge } from '@/lib/utils';

const divVariants = cva(' flex flex-col w-[360px]', {
  variants: {
    variant: {
      primary: 'h-[46px]',
      secondary: 'w-[320px] h-[100px] mb-[24px] ',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface InputFieldProps
  extends ComponentProps<'div'>,
    VariantProps<typeof divVariants> {
  label: string;
  labelProps: ComponentProps<'label'>;
  inputProps: ComponentProps<'input'>;
}

const InputField = ({
  label,
  labelProps,
  inputProps,
  variant,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <div {...props} className={classMerge(divVariants({ variant }), className)}>
      <Label {...labelProps}>{label}</Label>
      <Input
        {...inputProps}
        className="peer h-[20px] w-[236px] bg-blue-50 text-sm focus:outline-none"
      />
    </div>
  );
};

export default InputField;

'use client';

import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { classMerge } from '@/lib/utils';
import Image from 'next/image';

const SelectInputVariants = cva(
  'relative flex justify-self-start text-md font-semibold',
  {
    variants: {
      variant: {
        unSelected: 'text-gray-300',
        selected: 'text-gray-900',
      },
    },
    defaultVariants: {
      variant: 'unSelected',
    },
  },
);

interface SelectInputProps
  extends PropsWithChildren<VariantProps<typeof SelectInputVariants>> {
  className?: string;
  clicked: boolean;
  onClick: () => void;
}

const SelectInput = ({
  children,
  clicked,
  className,
  variant,
  onClick,
}: SelectInputProps) => {
  return (
    <div className="flex cursor-pointer justify-between" onClick={onClick}>
      <span className={classMerge(SelectInputVariants({ variant }), className)}>
        {children}
      </span>
      <div
        data-clicked={clicked}
        className="flex h-6 w-6 rotate-180 items-center justify-center transition-transform duration-500 ease-in-out data-[clicked=false]:rotate-0"
      >
        <Image
          src={'/assets/icons/selectArrow.svg'}
          alt={'select arrow icon'}
          fill
        />
      </div>
    </div>
  );
};

export default SelectInput;

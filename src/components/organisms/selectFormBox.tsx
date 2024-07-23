import SelectContainer from '@/components/atoms/selectContainer';
import SelectDropDown from '@/components/atoms/selectDropDown';
import SelectInput from '@/components/atoms/selectInput';
import SelectItem from '@/components/atoms/selectItem';
import SelectLabel from '@/components/atoms/selectLabel';
import SelectLayout from '@/components/atoms/selectLayout';
import useDropDownOutsideClick from '@/hooks/useDropDownOutsideClick';
import { SelectOptionType } from '@/types/signup.types';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

interface SelectBoxProps<T extends FieldValues> {
  options: SelectOptionType[];
  label: string;
  onSelect: (value: SelectOptionType['value']) => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  value: string;
}

const SelectFormBox = <T extends FieldValues>({
  options,
  label,
  onSelect,
  variant,
  className,
  value,
}: SelectBoxProps<T>) => {
  const { isOpen, setIsOpen, dropdownRef, handleClick } =
    useDropDownOutsideClick();

  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(
    options.find((option) => option.value === value) || null,
  );

  const handleSelect = (option: SelectOptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <SelectContainer className={className}>
      <SelectLayout label={label}>
        <SelectLabel>{label}</SelectLabel>
        <SelectInput
          variant={selectedOption ? 'selected' : 'unSelected'}
          onClick={handleClick}
          clicked={isOpen}
        >
          {selectedOption ? selectedOption.label : '선택안함'}
        </SelectInput>
        <SelectDropDown ref={dropdownRef} clicked={isOpen}>
          {options.map((option) => (
            <SelectItem
              key={option.value + option.label}
              data-value={option.value}
              selected={option.value === selectedOption?.value}
              variant={variant}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectDropDown>
      </SelectLayout>
    </SelectContainer>
  );
};

export default SelectFormBox;

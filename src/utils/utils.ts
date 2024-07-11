import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function classMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleKeyPressOnlyNumber = (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
  if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
};

export function formatDate(dateStr: string) {
  if (dateStr.length !== 8) {
    throw new Error('YYYYMMDD 형식으로 입력해주세요.');
  }

  // YYYY, MM, DD로 분할
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);

  // 형식화된 문자열 반환
  return `${year}-${month}-${day}`;
}

/**
 * 문자열에 특정 문자가 포함되어 있는지 확인하는 함수
 * @param{string} str 검사할 문자열
 * @param{string} char 찾을 문자
 * @returns 문자열에 문자가 포함되어 있으면 true, 아니면 false
 */
export const containsCharacter = (str: string, char: string): boolean => {
  return str.includes(char);
};

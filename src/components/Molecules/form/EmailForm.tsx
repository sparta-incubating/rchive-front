'use client';

import InputContainer from '@/components/atoms/InputContainer';
import React, { useState } from 'react';
import InputField from '../InputField';
import Button from '@/components/atoms/button';

const EmailForm = () => {
  const [test, setTest] = useState<string>('');

  return (
    <>
      <InputContainer>
        <InputField
          label="이메일"
          labelProps={{
            htmlFor: 'email',
            className: 'text-xs mb-[8px] group-focus-within:text-primary-400',
          }}
          inputProps={{
            type: 'text',
            placeholder: '이메일 입력',
            id: 'email',
            value: test,
          }}
          className="group"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTest(e.target.value)
          }
        />
        {test.length > 0 && (
          <Button size="sm" variant="submit" disabled={true}>
            중복 확인
          </Button>
        )}
      </InputContainer>
    </>
  );
};

export default EmailForm;

'use client';

import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';

import { loginSchema } from '@/validators/auth/login.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      await signIn('credentials', {
        username: data.username,
        password: data.password,
        callbackUrl: '/posts',
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return { error: 'Invalid credentials!' };
          default:
            return { error: '오류' };
        }
      }
      throw error;
    }
  };
  return (
    <>
      <br />
      <br />
      <div>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="border">
            <Input type="text" placeholder="이메일" {...register('username')} />
          </div>
          <br />
          <span className="text-primary-400">{errors.username?.message}</span>
          <br />
          <div className="border">
            <Input
              type="password"
              placeholder="비밀번호 "
              {...register('password')}
            />
            <br />
            <span className="text-primary-400">{errors.password?.message}</span>
          </div>

          <br />
          <Button type="submit" disabled={false} className="mb-5 w-80 px-7">
            다음
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;

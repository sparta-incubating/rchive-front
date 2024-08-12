import { useProfileUpdate } from '@/api/profile/useMutation';
import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import Label from '@/components/atoms/label';
import InputField from '@/components/molecules/InputField';
import ProfileChangeForm from '@/components/organisms/profileChangeForm';
import SelectFormBox from '@/components/organisms/selectFormBox';
import { SelectOptionType } from '@/types/signup.types';
import { roleSchema } from '@/validators/auth/role.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import ChangeSuccessModal from './changeSuccessModal';

interface RoleChangeModalProps {
  trackRole: string;
  onClose: () => void;
}
const RoleChangeModal = ({ onClose, trackRole }: RoleChangeModalProps) => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    mode: 'onChange',
    defaultValues: {
      trackName: '',
      period: '',
      trackRole,
    },
  });

  const { updateRoleMutate } = useProfileUpdate();

  const onSubmit = async (data: z.infer<typeof roleSchema>) => {
    if (trackRole) {
      try {
        await updateRoleMutate.mutateAsync(data);
        alert('권한 수정 요청이 성공적으로 변경되었습니다.');
        setIsSuccessful(true);
      } catch (error) {
        console.error('Error updating password:', error);
        alert('권한 수정 요청에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!isSuccessful ? (
        <ProfileChangeForm
          label="권한요청 페이지입니다."
          onClose={onClose}
          isValid={isValid}
        >
          <p className="text-center text-gray-300">
            해당하는 직책과 트랙 및 기수를 입력하세요
          </p>
          <Controller
            name="trackName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectFormBox
                className="w-[360px]"
                options={trackOptions}
                label="트랙"
                onSelect={onChange}
                value={value || ''} // 기본 값 설정
              />
            )}
          />
          {errors.trackName && (
            <p className="text-red-500">{errors.trackName.message}</p>
          )}
          <InputContainer>
            <InputField>
              <Label htmlFor="period">기수</Label>
              <Input
                {...register('period')}
                placeholder="기수입력"
                className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
              />
            </InputField>
          </InputContainer>
          <p className="text-gray-300">*1기라면 '1'만 작성해주세요</p>{' '}
          {errors.period && (
            <p className="text-red-500">{errors.period.message}</p>
          )}
        </ProfileChangeForm>
      ) : (
        <ChangeSuccessModal label="권한수정" onClose={onClose} />
      )}
    </form>
  );
};
const trackOptions: SelectOptionType[] = [
  {
    value: 'UNITY',
    label: '게임 개발(Unity)',
    selected: false,
  },
  {
    value: 'NODEJS',
    label: '게임 개발(Node.js)',
    selected: false,
  },
  {
    value: 'SPRING_JAVA',
    label: '백엔드 개발(Java+Spring)',
    selected: false,
  },
  {
    value: 'SPRING_KOTLIN',
    label: '백엔드 개발(Kotlin+Spring)',
    selected: false,
  },
  {
    value: 'FRONT_REACT',
    label: '프론트엔드 개발',
    selected: false,
  },
  {
    value: 'WEB',
    label: 'WEB',
    selected: false,
  },
  {
    value: 'ANDROID',
    label: '안드로이드 앱 개발',
    selected: false,
  },
  {
    value: 'IOS',
    label: 'Ios 앱 개발',
    selected: false,
  },
  {
    value: 'DATA',
    label: 'DATA',
    selected: false,
  },
  {
    value: 'UXUI',
    label: 'UX/UI 디자인',
    selected: false,
  },
];
export default RoleChangeModal;

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const formSchema = z.object({
  name: z.string().min(2, '이름은 최소 두 글자 이상이어야 합니다.').max(10, '이름은 최대 10자까지 가능합니다.'),
  email: z
    .string()
    .email('올바른 이메일 형식이어야 합니다.')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, '올바른 이메일 형식이어야 합니다.'),
  phone: z.string().regex(/^[0-9]{10,11}$/, '연락처는 10~11자리 숫자여야 합니다.'),
});
export const organizerFormSchema = formSchema.pick({ email: true, phone: true });
export const eventTitleSchema = z.object({
  title: z.string().min(2, '제목은 최소 두 글자 이상이어야 합니다.'),
});
export const hostCreationSchema = z.object({
  hostChannelName: z.string().min(2, '채널 이름은 최소 두 글자 이상이어야 합니다.'),
  hostEmail: z.string().email('올바른 이메일 형식이어야 합니다.'),
  channelDescription: z.string().min(5, '채널 설명은 최소 두 글자 이상이어야 합니다.'),
});
export const myPageSchema = formSchema.pick({ name: true, phone: true });

export type FormData = z.infer<typeof formSchema>;
export type OrganizerFormData = z.infer<typeof organizerFormSchema>;
export type EventTitleFormData = z.infer<typeof eventTitleSchema>;
export type HostCreationFormData = z.infer<typeof hostCreationSchema>;

export const zodValidation = {
  resolver: zodResolver(formSchema),
};

export const organizerZodValidation = {
  resolver: zodResolver(organizerFormSchema),
};

export const eventTitleZodValidation = {
  resolver: zodResolver(eventTitleSchema),
};

export const hostCreationZodValidation = {
  resolver: zodResolver(hostCreationSchema),
};

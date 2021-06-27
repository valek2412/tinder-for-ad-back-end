export class VerifyOtpDto {
  readonly phoneNumber: string;
  readonly hash: string;
  readonly otp: number;
}

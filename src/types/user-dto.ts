type LoginRequestDto = {
  email: string;
  password: string;
};

type LoginResponseDto = {
  email: string;
  token: string;
};

export type {
  LoginRequestDto,
  LoginResponseDto,
};

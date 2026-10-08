import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {
  AuthorizationStatus,
} from '../../const';
import type {
  AuthorizationStatusValue,
} from '../../const';

type UserProcess = {
  authorizationStatus: AuthorizationStatusValue;
  userEmail: string;
};

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
};

const userProcess = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatusValue>) => {
      state.authorizationStatus = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
  },
});

const {
  setAuthorizationStatus,
  setUserEmail,
} = userProcess.actions;

export {
  setAuthorizationStatus,
  setUserEmail,
  userProcess,
};

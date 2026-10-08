import type {AxiosInstance} from 'axios';
import type {ThunkAction} from '@reduxjs/toolkit';
import type {Action} from 'redux';

import type {State} from '../store';

type AppThunkAction<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  State,
  AxiosInstance,
  Action
>;

export type {AppThunkAction};

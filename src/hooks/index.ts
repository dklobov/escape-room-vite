import {
  useDispatch,
  useSelector,
} from 'react-redux';
import type {
  TypedUseSelectorHook,
} from 'react-redux';

import type {
  AppDispatch,
  State,
} from '../store';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export {
  useAppDispatch,
  useAppSelector,
};

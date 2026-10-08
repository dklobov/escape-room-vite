import {
  ApiRoute,
  AuthorizationStatus,
} from '../const';
import {adaptBookingPlaceToClient} from '../adapters/booking';
import {
  adaptQuestPreviewToClient,
  adaptQuestToClient,
} from '../adapters/quest';
import {
  dropToken,
  saveToken,
} from '../services/token';
import type {AppThunkAction} from '../types/action';
import type {BookingPlaceDto} from '../types/booking-dto';
import type {QuestDto, QuestPreviewDto} from '../types/quest-dto';
import type {
  LoginRequestDto,
  LoginResponseDto,
} from '../types/user-dto';
import {
  setBookingPlaces,
  setBookingPlacesLoadingStatus,
} from './booking-process/booking-process';
import {
  setCurrentQuest,
  setQuestLoadingStatus,
  setQuests,
  setQuestsLoadingStatus,
} from './quests-process/quests-process';
import {
  setAuthorizationStatus,
  setUserEmail,
} from './user-process/user-process';

function fetchQuestsAction(): AppThunkAction {
  return async (dispatch, _getState, api) => {
    dispatch(setQuestsLoadingStatus(true));

    try {
      const {data} = await api.get<QuestPreviewDto[]>(ApiRoute.Quests);
      const quests = data.map((quest) => adaptQuestPreviewToClient(quest));

      dispatch(setQuests(quests));
    } catch {
      dispatch(setQuests([]));
    } finally {
      dispatch(setQuestsLoadingStatus(false));
    }
  };
}

function fetchQuestAction(id: string): AppThunkAction {
  return async (dispatch, _getState, api) => {
    dispatch(setQuestLoadingStatus(true));
    dispatch(setCurrentQuest(null));

    try {
      const {data} = await api.get<QuestDto>(`${ApiRoute.Quest}/${id}`);
      const quest = adaptQuestToClient(data);

      dispatch(setCurrentQuest(quest));
    } catch {
      dispatch(setCurrentQuest(null));
    } finally {
      dispatch(setQuestLoadingStatus(false));
    }
  };
}

function fetchBookingPlacesAction(id: string): AppThunkAction {
  return async (dispatch, _getState, api) => {
    dispatch(setBookingPlacesLoadingStatus(true));
    dispatch(setBookingPlaces([]));

    try {
      const {data} = await api.get<BookingPlaceDto[]>(`${ApiRoute.Quest}/${id}/${ApiRoute.Booking}`);
      const bookingPlaces = data.map((place) => adaptBookingPlaceToClient(place));

      dispatch(setBookingPlaces(bookingPlaces));
    } catch {
      dispatch(setBookingPlaces([]));
    } finally {
      dispatch(setBookingPlacesLoadingStatus(false));
    }
  };
}

function loginAction(credentials: LoginRequestDto): AppThunkAction {
  return async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<LoginResponseDto>(ApiRoute.Login, credentials);

      saveToken(data.token);
      dispatch(setUserEmail(data.email));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
    } catch {
      dropToken();
      dispatch(setUserEmail(''));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
    }
  };
}

export {
  fetchBookingPlacesAction,
  fetchQuestAction,
  fetchQuestsAction,
  loginAction,
};

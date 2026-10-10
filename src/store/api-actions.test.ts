import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import type {Action} from 'redux';
import type {ThunkDispatch} from 'redux-thunk';
import {describe, expect, it} from 'vitest';

import {ApiRoute} from '../const';
import {createApi} from '../services/api';
import type {State} from '.';
import {
  fetchBookingPlacesAction,
  fetchQuestAction,
  fetchQuestsAction,
  fetchReservationsAction,
} from './api-actions';
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
  setReservations,
  setReservationsLoadingStatus,
} from './reservations-process/reservations-process';
import type {
  BookingDto,
  BookingPlaceDto,
} from '../types/booking-dto';
import type {
  QuestDto,
  QuestPreviewDto,
} from '../types/quest-dto';

type AppDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;

const api = createApi();
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStoreCreator = configureMockStore<State, Action, AppDispatch>(middlewares);

describe('Api actions', () => {
  it('should dispatch setQuests when GET /quest returns data', async () => {
    const questPreviewDto: QuestPreviewDto = {
      id: 'quest-id',
      title: 'Маньяк',
      previewImg: 'preview.jpg',
      previewImgWebp: 'preview.webp',
      level: 'medium',
      type: 'horror',
      peopleMinMax: [3, 6],
    };

    mockApi.onGet(ApiRoute.Quests).reply(200, [questPreviewDto]);

    const store = mockStoreCreator();

    await store.dispatch(fetchQuestsAction());

    expect(store.getActions()).toEqual([
      setQuestsLoadingStatus(true),
      setQuests([
        {
          id: 'quest-id',
          title: 'Маньяк',
          type: 'horror',
          typeLabel: 'Ужасы',
          previewImg: 'preview.jpg',
          previewImgWebp: 'preview.webp',
          previewImgAlt: 'Изображение квеста Маньяк',
          level: 'medium',
          levelLabel: 'Средний',
          peopleMinCount: 3,
          peopleMaxCount: 6,
        },
      ]),
      setQuestsLoadingStatus(false),
    ]);
  });

  it('should dispatch setCurrentQuest when GET /quest/:id returns data', async () => {
    const questDto: QuestDto = {
      id: 'quest-id',
      title: 'Маньяк',
      description: 'Описание квеста',
      previewImg: 'preview.jpg',
      previewImgWebp: 'preview.webp',
      coverImg: 'cover.jpg',
      coverImgWebp: 'cover.webp',
      level: 'medium',
      type: 'horror',
      peopleMinMax: [3, 6],
    };

    mockApi.onGet(`${ApiRoute.Quest}/${questDto.id}`).reply(200, questDto);

    const store = mockStoreCreator();

    await store.dispatch(fetchQuestAction(questDto.id));

    expect(store.getActions()).toEqual([
      setQuestLoadingStatus(true),
      setCurrentQuest(null),
      setCurrentQuest({
        id: 'quest-id',
        title: 'Маньяк',
        type: 'horror',
        typeLabel: 'Ужасы',
        description: 'Описание квеста',
        previewImg: 'preview.jpg',
        previewImgWebp: 'preview.webp',
        previewImgAlt: 'Изображение квеста Маньяк',
        coverImg: 'cover.jpg',
        coverImgWebp: 'cover.webp',
        coverImgAlt: 'Обложка квеста Маньяк',
        level: 'medium',
        levelLabel: 'Средний',
        peopleMinCount: 3,
        peopleMaxCount: 6,
      }),
      setQuestLoadingStatus(false),
    ]);
  });

  it('should dispatch setBookingPlaces when GET /quest/:id/booking returns data', async () => {
    const questId = 'quest-id';
    const bookingPlaceDto: BookingPlaceDto = {
      id: 'place-id',
      location: {
        address: 'Набережная реки Карповки, 5П',
        coords: [59.96825, 30.31748],
      },
      slots: {
        today: [
          {
            time: '14:00',
            isAvailable: true,
          },
        ],
        tomorrow: [
          {
            time: '20:00',
            isAvailable: false,
          },
        ],
      },
    };

    mockApi
      .onGet(`${ApiRoute.Quest}/${questId}/${ApiRoute.Booking}`)
      .reply(200, [bookingPlaceDto]);

    const store = mockStoreCreator();

    await store.dispatch(fetchBookingPlacesAction(questId));

    expect(store.getActions()).toEqual([
      setBookingPlacesLoadingStatus(true),
      setBookingPlaces([]),
      setBookingPlaces([
        {
          id: 'place-id',
          title: 'Набережная реки Карповки, 5П',
          address: 'Набережная реки Карповки, 5П',
          location: {
            lat: 59.96825,
            lng: 30.31748,
          },
          slots: bookingPlaceDto.slots,
        },
      ]),
      setBookingPlacesLoadingStatus(false),
    ]);
  });
  it('should dispatch setReservations when GET /reservation returns data', async () => {
    const bookingDto: BookingDto = {
      id: 'booking-id',
      date: 'today',
      time: '14:00',
      contactPerson: 'Oliver',
      phone: '899911122233',
      withChildren: true,
      peopleCount: 3,
      placeId: 'place-id',
      location: {
        address: 'Набережная реки Карповки, 5П',
        coords: [59.96825, 30.31748],
      },
      quest: {
        id: 'quest-id',
        title: 'Склеп',
        previewImg: 'preview.jpg',
        previewImgWebp: 'preview.webp',
        level: 'hard',
        type: 'horror',
        peopleMinMax: [2, 5],
      },
    };

    mockApi.onGet(ApiRoute.Reservation).reply(200, [bookingDto]);

    const store = mockStoreCreator();

    await store.dispatch(fetchReservationsAction());

    expect(store.getActions()).toEqual([
      setReservationsLoadingStatus(true),
      setReservations([
        {
          id: 'booking-id',
          date: 'сегодня',
          time: '14:00',
          address: 'Набережная реки Карповки, 5П',
          quest: {
            id: 'quest-id',
            title: 'Склеп',
            type: 'horror',
            typeLabel: 'Ужасы',
            description: '',
            previewImg: 'preview.jpg',
            previewImgWebp: 'preview.webp',
            previewImgAlt: 'Квест Склеп',
            coverImg: '',
            coverImgWebp: '',
            coverImgAlt: 'Квест Склеп',
            level: 'hard',
            levelLabel: 'Сложный',
            peopleMinCount: 2,
            peopleMaxCount: 5,
          },
        },
      ]),
      setReservationsLoadingStatus(false),
    ]);
  });
});

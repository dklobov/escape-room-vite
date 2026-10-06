const AppRoute = {
  Main: '/',
  Login: '/login',
  Contacts: '/contacts',
  Quest: '/quest/:id',
  Booking: '/quest/:id/booking',
  MyQuests: '/my-quests',
  NotFound: '*',
} as const;

export {AppRoute};

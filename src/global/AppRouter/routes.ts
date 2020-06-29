export const APP_ROUTES = {
  ROOT: '/',
  SCANNER: '/scanner',
  CHOOSE_PERSONA: '/choose-persona/(saved|recommend|participant-joined|manager-joined)/(spot|persona)/:actionId',
  LOGIN: '/login',
  REGISTER: '/register',
  MY_SPOTS: '/my-spots',
  MY_PERSONAS: '/my-personas',
  SPOT_CREATION_STEP_1: '/creation/step/1/entity/spot',
  SPOT_CREATION_STEP_2: '/creation/step/2/entity/spot',
  SPOT_CREATION_STEP_3: '/creation/step/3/entity/spot',
  PERSONA_CREATION_STEP_1: '/creation/step/1/entity/persona',
  PERSONA_CREATION_STEP_2: '/creation/step/2/entity/persona',
  PERSONA_CREATION_STEP_3: '/creation/step/3/entity/persona',
  CONTACT: '/contact',
  RESET_PASSWORD: '/resetpassword',
  CHANGE_PASSWORD: '/changepassword',
  ACTION: '/action',
  INFORMATIVE_CLAUSE: '/informativeclause',
  PRIVACY_AND_COOKIES_POLICY: '/privacyandcookiespolicy',
  TERM_OF_USE: '/termofuse',
  PERSONA_CREATION_PAGE: '/persona-creation/page',
  EDIT_SPOT_UUID_STEP_1: (uuid: string) => `/edit/spot/${uuid}/step/1`,
  EDIT_SPOT_UUID_STEP_2: (uuid: string) => `/edit/spot/${uuid}/step/2`,
  EDIT_PERSONA_UUID_STEP_1: (uuid: string) => `/edit/persona/${uuid}/step/1`,
  EDIT_PERSONA_UUID_STEP_2: (uuid: string) => `/edit/persona/${uuid}/step/2`,
  SPOT_BOOK: '/spot-book',
  CONTACT_BOOK: '/contact-book',
  PERSONA_PREVIEW: (uuid: string) => `/persona/${uuid}`,
  SPOT_PREVIEW: (uuid: string) => `/spot/${uuid}`,
  SPOT_INVITATION: (uuid: string) => `/spot-invitation/${uuid}`,
  MY_PERSONA_PREVIEW: (uuid: string) => `/my-persona/${uuid}`,
  MY_SPOT_PREVIEW: (uuid: string) => `/my-spot/${uuid}`,
};

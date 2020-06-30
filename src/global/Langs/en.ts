/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

const enTranslations = {
  en: {
    translation: {
      TOPNAV_LOGIN: 'Login',
      TOPNAV_BACK: 'BACK',

      MENU_REDIRECT_MY_PERSONA: 'My persona',
      MENU_REDIRECT_MY_SPOT: 'My spots',
      MENU_REDIRECT_NEWSLETTER: 'My community',
      MENU_REDIRECT_GUIDING_SPOT: 'Ways of use',
      MENU_REDIRECT_ABOUT_US: 'About us',
      MENU_REDIRECT_LOGOUT: 'Logout',

      BOTNAV_SCANNER: 'Scanner',
      BOTNAV_SPOT_BOOK: 'Spot Book',
      BOTNAV_CONTACT_BOOK: 'Contact Book',

      SCANNER: 'Scanner',

      LOGIN_HEADING_1: 'Hey!',
      LOGIN_HEADING_2: 'Sign into your Account',
      LOGIN_EMAIL_INPUT: 'Email',
      LOGIN_FORGOT_PASSWORD: 'Password',
      LOGIN_PASSWORD_INPUT: 'Forgot your password?',
      LOGIN_RESET_PASSWORD: 'Reset now.',
      LOGIN_BUTTON: 'Login',
      LOGIN_TEXT_BETWEEN_BUTTON: 'Or login using Google account',
      LOGIN_GOOGLE: 'Google',
      LOGIN_NO_ACCOUNT: 'Don’t have account?',
      LOGIN_NO_ACCOUNT_REGISTER: 'Register Now',

      REGISTER_HEADING_1: 'Create Account',
      REGISTER_EMAIL_INPUT: 'Email',
      REGISTER_PASSWORD_INPUT: 'Password',
      REGISTER_PASSWORD_REPEAT: 'Repeat password',
      REGISTER_REGULATIONS: 'I read and agree to',
      REGISTER_TOS_CONFIRM: 'term of use',
      REGISTER_PRIVACY_POLICY: 'privacy and cookies policy',
      REGISTER_AND: 'and',
      REGISTER_INFORMATIVE_CLAUSE: 'informative clause',
      REGISTER_REGISTER_BUTTON: 'REGISTER NOW',
      REGISTER_TEXT_BETWEEN_BUTTONS: 'or register using Google account',
      REGISTER_GOOGLE_REGISTER_BUTTON: 'GOOGLE',
      REGISTER_ALREADY_HAVE_ACCOUNT: 'Already have account? ',
      REGISTER_ALREADY_HAVE_ACCOUNT_LOGIN: 'Login',

      SPOT_BOOK_NAVBAR: 'Search...',
      SPOT_BOOK_HEADING_1: 'Your saved spot',

      CONTACT_BOOK_NAVBAR: 'Search...',
      CONTACT_BOOK_HEADING_1: 'Your saved persona',

      MY_PERSONA_CARD_MENU_EDIT: 'Edit',
      MY_PERSONA_CARD_MENU_REMOVE: 'Remove',
      MY_PERSONA_DEFAULT_BUTTON: 'Default',
      MY_PERSONA_SET_AS_DEFAULT_BUTTON: 'Set As Default',
      MY_PERSONA_SHARE_QR: 'Share your QR',
      MY_PERSONA_REMOVING_LAST_PERSONA_NOTIFICATION:
        'At least one Persona must be created on the account. If you want to delete it, create a new one and delete it again',

      MY_SPOTS_CARD_MENU_EDIT: 'Edit',
      MY_SPOTS_CARD_MENU_REMOVE: 'Remove',
      MY_SPOTS_SHARE_QR: 'Share your QR',

      MY_PERSONA_UUID_VISIBILITY: 'Visibility',
      MY_PERSONA_UUID_NETWORK: 'Network',
      MY_PERSONA_UUID_ENTITY_TAB: 'In a',
      MY_PERSONA_UUID_VISIBILITY_TAB: "'Visibility'",
      MY_PERSONA_UUID_ENTITY_TAB_2: 'you can see who',
      MY_PERSONA_UUID_VISIBILITY_TAB_2: 'saved given persona',
      MY_PERSONA_UUID_NETWORK_TAB: "'Network'",
      MY_PERSONA_UUID_NETWORK_TAB_2: 'recommend given persona',

      MY_SPOT_UUID_VISIBILITY_TAB: 'saved given spot',
      MY_SPOT_UUID_NETWORK_TAB_2: 'recommend given spot',

      PERSONA_TEXT: 'persona',
      SPOT_TEXT: 'spot',

      CREATION_STEP_1_PERSONA_TOP_TAB_HEADING: `Let's create your persona!`,
      CREATION_STEP_1_PERSONA_TOP_TAB:
        'Persona is any set of data connected with your person. You can create many personas to fit different situations in your business, hobby or private life!',
      CREATION_STEP_1_PERSONA_TAB_1_TITLE: 'Business Card  XXI century',
      CREATION_STEP_1_PERSONA_TAB_1:
        'It is always up to date.\n' +
        'You can insert there not only contact details, but also\n' +
        'links to surveys, your social media, groups, products,\n' +
        'services, booking pages, blogs, tutorials, books,\n' +
        'articles, actually.. Anything you want! Just take a look at our build-in editor!',
      CREATION_STEP_1_PERSONA_TAB_2_TITLE: 'Share it easily',
      CREATION_STEP_1_PERSONA_TAB_2:
        'You can place your qr\n' +
        'code anywhere: on events, conferences, in b2b\n' +
        'relations. And also sign your articles, books, texts,\n' +
        'comments, photos and medias. Use your creativity and make your brand be visible everywhere.',
      CREATION_STEP_1_PERSONA_TAB_3_TITLE: 'Make your brand visible',
      CREATION_STEP_1_PERSONA_TAB_3:
        'You can place your qr\n' +
        'code anywhere: on events, conferences, in b2b\n' +
        'relations. And also sign your articles, books, texts,\n' +
        'comments, photos and medias. Use your creativity and make your brand be visible everywhere.',
      CREATION_STEP_1_PERSONA_TAB_4_TITLE: 'Use spots',
      CREATION_STEP_1_PERSONA_TAB_4:
        'Spots are places where you can left your persona. It can be events, webinars, coffee bars, offices and any place where people meets together. You can join as spot participant, show persona and brief message to your viewers..',
      CREATION_STEP_1_PERSONA_TAB_5_TITLE: 'Recommendations network',
      CREATION_STEP_1_PERSONA_TAB_5:
        'Encourage your friends,\n' +
        'partners and clients to recommend you. You are linked with your recommendators. Whenever they share persona you are visible there. Create you own recomendation net!',
      CREATION_STEP_1_PERSONA_NEXT_STEP: 'NEXT STEP',

      CREATION_STEP_2_HEADING: 'Edit your card',
      CREATION_STEP_2_INFO:
        'Cards are small preview of your agregated set of data. It consists from background image, avatar, name and brief message (eg. what or who you are looking for).',
      CREATION_STEP_2_INPUT_1_PLACEHOLDER: 'Your Name',
      CREATION_STEP_2_INPUT_2_PLACEHOLDER: 'Your brief message',
      CREATION_STEP_2_NEXT_STEP: 'NEXT STEP',

      CREATION_STEP_3_HEADING: 'Edit your page',
      CREATION_STEP_3_INFO:
        'Pages are fully predefined set of data you want to share with others. You can edit it however you want to.',
      CREATION_STEP_3_INPUT_PLACEHOLDER: 'Tap here to use editor...',
      CREATION_STEP_3_CREATE_BUTTON: 'Create',
      CREATION_STEP_3_CREATE_PERSONA: 'persona',
      CREATION_STEP_3_ADD_BLOCK_ELEMENT: 'Add element',
      CREATION_STEP_3_ELEMENT_1: 'Text',
      CREATION_STEP_3_ELEMENT_2: 'Heading 1',
      CREATION_STEP_3_ELEMENT_3: 'Heading 2',
      CREATION_STEP_3_ELEMENT_4: 'Quote',
      CREATION_STEP_3_ELEMENT_5: 'Code',
      CREATION_STEP_3_ELEMENT_6: 'Numbered List',
      CREATION_STEP_3_ELEMENT_7: 'Bulleted list',
      CREATION_STEP_3_ELEMENT_8: 'Image',
      CREATION_STEP_3_ELEMENT_9: 'URL',
      CREATION_STEP_3_ELEMENT_10: 'Upload assets',
      CREATION_STEP_3_ELEMENT_11: 'Manager List',
      CREATION_STEP_3_ELEMENT_12: 'Participant List',

      CREATION_STEP_1_SPOT_TOP_TAB_HEADING: `Let's create your spot!`,
      CREATION_STEP_1_SPOT_TOP_TAB: `Spot is any set of data, that is connected with anything, that is not a person, like company, event, conference, product, place, etc. Turn up the visibility!`,
      CREATION_STEP_1_SPOT_TAB_1_TITLE: 'Boosted business page',
      CREATION_STEP_1_SPOT_TAB_1:
        'It is always up to date. You can insert there not only contact details, but also links to surveys, your social media, groups, products, services, booking pages, blogs, tutorials, books, articles, actually.. Anything you want! Just take a look at our build-in editor!',
      CREATION_STEP_1_SPOT_TAB_2_TITLE: 'Spot managers',
      CREATION_STEP_1_SPOT_TAB_2:
        'You can add important personas to your spot. With that you promote their brands and increase your spot value. ',
      CREATION_STEP_1_SPOT_TAB_3_TITLE: 'Participant list',
      CREATION_STEP_1_SPOT_TAB_3:
        'You can allow any persona to be visible on your spot. It will help integrate people and give them posibility to share brief message with others.',
      CREATION_STEP_1_SPOT_TAB_4_TITLE: 'Make your brand visible',
      CREATION_STEP_1_SPOT_TAB_4:
        'By using qr codes you can encourage others to see your spot details. With that you can show them your services and products, redirect to social medias and give them access to anything they should know. It all depends on creative usage!',
      CREATION_STEP_1_SPOT_TAB_5_TITLE: 'Recommendations network',
      CREATION_STEP_1_SPOT_TAB_5:
        'Get a recommendation from your friends, partners and clients. You are linked with your recommendators. Whenever they share persona you are visible there. Create you own recommendation net!',
      CREATION_STEP_1_SPOT_LIMITATIONS_TAB:
        'You can use spots totally for free, but there are some limitations: 1. You can add max 3 managers, 2. To participant list can join max 20 people, 3.Your spot can be recommended by up to 5 people. If you would like to create a bigger spot, please contact us - we will gladly talk about cooperation!',
      CREATION_STEP_1_SPOT_NEXT_STEP: 'CREATE FREE SPOT',
      CREATION_STEP_1_SPOT_CONTACT_US: 'contact us',

      CREATION_STEP_2_SPOT_HEADING: 'Edit your spot',
      CREATION_STEP_2_SPOT_INFO:
        'A spot card is a brief description of your dataset for a given spot. Includes avatar, background image, name and short message. You can write anything you like in it: briefly describe the spot, write what the spot is about, ask about something, announce something, etc.',

      CREATION_STEP_3_SPOT_HEADING: 'Edit your spot',
      CREATION_STEP_3_SPOT_INFO:
        'Spot is a set of data related to your place / event / company that you want to share with others and thanks to which you can promote persona and guarantee them higher satisfaction. You can create your spot in any way and include any information, files, images, links and much more.',

      SPOT_INVITATION_TEXT: ' You got an invitation to a',
      SPOT_INVITATION_TEXT_2: 'If you will accept it then your default persona will be visible for others!',
      SPOT_INVITATION_BUTTON: 'Accept',

      SPOT_UUID_RECOMMEND_INFO:
        'Are you sure you want to recommend this spot? It will be shared with your persona at least for the next month.',
      SPOT_UUID_RECOMMEND_BUTTONS_YES: 'Yes',
      SPOT_UUID_RECOMMEND_BUTTONS_NO: 'No',

      SPOT_UUID_ENTITY_BUTTON_EDIT: 'Save',
      SPOT_UUID_ENTITY_BUTTON: 'SAVE',
      SPOT_UUID_ENTITY_SAVED_BUTTON: 'SAVED',

      PERSONA_UUID_RECOMMEND_INFO:
        'Are you sure you want to recommend this persona? It will be shared with your persona at least for the next month.',
      PERSONA_UUID_RECOMMEND_BUTTONS_YES: 'Yes',
      PERSONA_UUID_RECOMMEND_BUTTONS_NO: 'No',
      PERSONA_UUID_RECOMMEND_CAROUSEL: 'Recommend',

      CONTACT_TITLE: 'Contact Form',
      CONTACT_INPUT_1: 'Name',
      CONTACT_INPUT_2: 'Email',
      CONTACT_INPUT_3: 'Message',
      CONTACT_BUTTON: 'Send',

      RESET_PASSWORD_TITLE: 'Reset password',
      RESET_PASSWORD_INPUT_1: 'Email',
      RESET_PASSWORD_BUTTON: 'Send',

      CHANGE_PASSWORD_TITLE: 'Change your password',
      CHANGE_PASSWORD_INPUT_1: 'New password',
      CHANGE_PASSWORD_INPUT_2: 'Repeat new password',
      CHANGE_PASSWORD_BUTTON: 'Change',

      COOKIES_NOTIFICATION_TEXT: 'Witaj w PersonaShare!',
      COOKIES_NOTIFICATION_TEXT_1: 'Korzystając z serwisu akceptujesz nasz',
      COOKIES_NOTIFICATION_TEXT_2: 'Regulamin.',
      COOKIES_NOTIFICATION_TEXT_3:
        'Korzystamy ze znanych wszystkim ciasteczek. Korzystając z serwisu akceptujesz naszą.',
      COOKIES_NOTIFICATION_TEXT_4: 'Politykę Prywatności i ciasteczek.',
      COOKIES_UNDERSTAND: 'I UNDERSTAND',

      SEE_MORE: 'SEE MORE',
      PARTICIPANT_LIST_TEXT: 'Participant List',
    },
  },
};

export default enTranslations;

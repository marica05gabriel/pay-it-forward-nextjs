import { Chat, ChatContact, ChatMessage } from './types';

export const me: ChatContact = {
  id: '100',
  nickname: 'my-nickname',
  avatar: 'https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
};
export const chatContacts: Map<string, ChatContact> = new Map([
  [
    '0',
    {
      id: '0',
      nickname: 'Alice',
      avatar:
        'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
    },
  ],
  [
    '1',
    {
      id: '1',
      nickname: 'Martin',
      avatar:
        'https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
    },
  ],
  [
    '2',
    {
      id: '2',
      nickname: 'Charlie',
      avatar:
        'https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
    },
  ],
  [
    '3',
    {
      id: '3',
      nickname: 'David',
      avatar:
        'https://placehold.co/200x/c2ebff/0f0b14.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
    },
  ],
  [
    '4',
    {
      id: '4',
      nickname: 'Ella',
      avatar:
        'https://placehold.co/200x/e7c2ff/7315d1.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
    },
  ],
  [
    '5',
    {
      id: '5',
      nickname: 'Fiona',
      avatar:
        'https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
    },
  ],
  [
    '6',
    {
      id: '6',
      nickname: 'George',
      avatar:
        'https://placehold.co/200x/f83f3f/4f4f4f.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
    },
  ],
  [
    '7',
    {
      id: '7',
      nickname: 'Hannah',
      avatar:
        'https://placehold.co/200x/dddddd/999999.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
    },
  ],
  [
    '8',
    {
      id: '8',
      nickname: 'Ian',
      avatar:
        'https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
    },
  ],
  [
    '9',
    {
      id: '9',
      nickname: 'Jack',
      avatar:
        'https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
    },
  ],
]);

export const messagesWithAlice: ChatMessage[] = [
  { id: '0', message: "Hey Bob, how's it going?", type: 'incoming' },
  {
    id: '1',
    message: 'Hi Alice!',
    type: 'outgoing',
  },
  {
    id: '2',
    message: "I'm good, just finished a great book.",
    type: 'outgoing',
  },
  {
    id: '3',
    message: 'How about you?',
    type: 'outgoing',
  },
  {
    id: '4',
    message: 'That book sounds interesting!',
    type: 'incoming',
  },
  {
    id: '5',
    message: "What's it about?",
    type: 'incoming',
  },
  {
    id: '6',
    message:
      "It's about an astronaut stranded on Mars, trying to survive. Gripping stuff!",
    type: 'outgoing',
  },
  {
    id: '7',
    message: "I'm intrigued! Maybe I'll borrow it from you when you're done?",
    type: 'incoming',
  },
  {
    id: '8',
    message: "Of course! I'll drop it off at your place tomorrow.",
    type: 'outgoing',
  },
  { id: '9', message: "Thanks, you're the best!", type: 'incoming' },
  {
    id: '10',
    message: 'Anytime! Let me know how you like it. 😊',
    type: 'outgoing',
  },
  { id: '11', message: 'So, pizza next week, right?', type: 'incoming' },
  {
    id: '12',
    message: "Absolutely! Can't wait for our pizza date. 🍕",
    type: 'outgoing',
  },
  { id: '13', message: 'Hoorayy!!', type: 'incoming' },
];

export const chats: Map<string, Chat> = new Map([
  [
    '0',
    {
      id: '0',
      contactId: '0',
      messages: messagesWithAlice,
    },
  ],
  [
    '1',
    {
      id: '1',
      contactId: '1',
      messages: [
        {
          id: '0',
          type: 'incoming',
          message:
            'That pizza place was amazing! We should go again sometime. 🍕',
        },
      ],
    },
  ],
  [
    '2',
    {
      id: '2',
      contactId: '2',
      messages: [
        {
          id: '0',
          type: 'incoming',
          message:
            'Hey, do you have any recommendations for a good movie to watch?',
        },
      ],
    },
  ],
  [
    '3',
    {
      id: '3',
      contactId: '3',
      messages: [
        {
          id: '0',
          type: 'incoming',
          message:
            'I just finished reading a great book! It was so captivating',
        },
      ],
    },
  ],
  [
    '4',
    {
      id: '4',
      contactId: '4',
      messages: [
        {
          id: '0',
          type: 'incoming',
          message: "What's the plan for this weekend? Anything fun?",
        },
      ],
    },
  ],
  [
    '5',
    {
      id: '5',
      contactId: '5',
      messages: [
        {
          id: '0',
          type: 'incoming',
          message:
            "I heard there's a new exhibit at the art museum. Interested",
        },
      ],
    },
  ],
  [
    '6',
    {
      id: '6',
      contactId: '6',
      messages: [
        {
          id: '0',
          type: 'incoming',
          message: 'I tried that new cafe downtown. The coffee was fantastic',
        },
      ],
    },
  ],
  [
    '7',
    {
      id: '7',
      contactId: '7',
      messages: [
        {
          id: '0',
          type: 'incoming',
          message: "I'm planning a hiking trip next month. Want to join",
        },
      ],
    },
  ],
  [
    '8',
    {
      id: '8',
      contactId: '8',
      messages: [
        {
          id: '0',
          type: 'incoming',
          message: "Let's catch up soon. It's been too long!",
        },
      ],
    },
  ],
  [
    '9',
    {
      id: '9',
      contactId: '9',
      messages: [
        {
          id: '0',
          type: 'incoming',
          message:
            "Remember that hilarious joke you told me? I can't stop laughing!",
        },
      ],
    },
  ],
]);

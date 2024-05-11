import { ChatContactData, ChatMessage } from './types';

export const contactDataList: ChatContactData[] = [
  {
    nickname: 'Alice',
    lastMessage: 'Hoorayy!!',
    avatar: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
  },
  {
    nickname: 'Martin',
    lastMessage:
      'That pizza place was amazing! We should go again sometime. 🍕',

    avatar: 'https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
  },
  {
    nickname: 'Charlie',
    lastMessage:
      'Hey, do you have any recommendations for a good movie to watch?',

    avatar: 'https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
  },
  {
    nickname: 'David',
    lastMessage: 'I just finished reading a great book! It was so captivating',
    avatar: 'https://placehold.co/200x/c2ebff/0f0b14.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
  },
  {
    nickname: 'Ella',
    lastMessage: "What's the plan for this weekend? Anything fun?",

    avatar: 'https://placehold.co/200x/e7c2ff/7315d1.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
  },
  {
    nickname: 'Fiona',
    lastMessage: "I heard there's a new exhibit at the art museum. Interested",

    avatar: 'https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
  },
  {
    nickname: 'George',
    lastMessage: 'I tried that new cafe downtown. The coffee was fantastic',

    avatar: 'https://placehold.co/200x/f83f3f/4f4f4f.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
  },
  {
    nickname: 'Hannah',
    lastMessage: "I'm planning a hiking trip next month. Want to join",

    avatar: 'https://placehold.co/200x/dddddd/999999.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
  },
  {
    nickname: 'Ian',
    lastMessage: "Let's catch up soon. It's been too long!",
    avatar: 'https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
  },
  {
    nickname: 'Jack',
    lastMessage:
      "Remember that hilarious joke you told me? I can't stop laughing!",
    avatar: 'https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
  },
];

export const chatMessagesList: ChatMessage[] = [
  { message: "Hey Bob, how's it going?", type: 'incoming' },
  {
    message: 'Hi Alice!',
    type: 'outgoing',
  },
  {
    message: "I'm good, just finished a great book.",
    type: 'outgoing',
  },
  {
    message: 'How about you?',
    type: 'outgoing',
  },
  {
    message: 'That book sounds interesting!',
    type: 'incoming',
  },
  {
    message: "What's it about?",
    type: 'incoming',
  },
  {
    message:
      "It's about an astronaut stranded on Mars, trying to survive. Gripping stuff!",
    type: 'outgoing',
  },
  {
    message: "I'm intrigued! Maybe I'll borrow it from you when you're done?",
    type: 'incoming',
  },
  {
    message: "Of course! I'll drop it off at your place tomorrow.",
    type: 'outgoing',
  },
  { message: "Thanks, you're the best!", type: 'incoming' },
  { message: 'Anytime! Let me know how you like it. 😊', type: 'outgoing' },
  { message: 'So, pizza next week, right?', type: 'incoming' },
  {
    message: "Absolutely! Can't wait for our pizza date. 🍕",
    type: 'outgoing',
  },
  { message: 'Hoorayy!!', type: 'incoming' },
];

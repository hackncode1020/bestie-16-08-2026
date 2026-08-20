export interface BirthdayConfig {
  bestFriendName: string;
  myName: string;
  birthdayDate: string;
  secretPin: string;
  hint: string;
  photos: Array<{
    id: string;
    url: string;
    caption: string;
    date?: string;
    rotation?: number;
    tapeColor?: 'blue' | 'navy' | 'striped';
  }>;
  music: string;
  customLetterParagraphs: string[];
}

export const initialBirthdayConfig: BirthdayConfig = {
  bestFriendName: "Aaradhya",
  myName: "Dhruvi",
  birthdayDate: "August 15",
  secretPin: "1234",
  hint: "Think of the simplest secret code we always use (1234) 😉",
  photos: [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      caption: "That day we laughed until our stomachs hurt 💙",
      date: "Golden Hour Vibes",
      rotation: -3,
      tapeColor: "blue"
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
      caption: "Spontaneous ice cream runs & endless gossip 🍦",
      date: "Random Tuesday Magic",
      rotation: 2.5,
      tapeColor: "navy"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
      caption: "We had no idea we'd remember this forever ✨",
      date: "Unplanned Adventures",
      rotation: -1.5,
      tapeColor: "striped"
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
      caption: "Pure chaotic bestie energy 📸😂",
      date: "Our Signature Chaos",
      rotation: 3,
      tapeColor: "blue"
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      caption: "Proof that we can look cute when we try 🦋",
      date: "Dressed Up & Silly",
      rotation: -2,
      tapeColor: "navy"
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=800&q=80",
      caption: "One of my absolute favorite memories with you 💙",
      date: "Core Memory Unlocked",
      rotation: 1.5,
      tapeColor: "striped"
    }
  ],
  music: "/music/birthday.mp3",
  customLetterParagraphs: [
    "To my absolute favorite human in the whole universe,",
    "I still wonder how I got so lucky to have someone like you in my corner. Through all the 2 AM panic texts, the uncontrollably loud restaurant laughing fits, and the days when everything felt heavy—you've always been my constant sunshine.",
    "You understand my silence just as well as my endless nonsense. You never judge my weirdest moments (because honestly, you're usually encouraging them), and you always know exactly how to make me feel seen and loved.",
    "Thank you for being my uncertified therapist, my emergency partner-in-crime, my forever hype-woman, and the sister I got to choose.",
    "On your special day, I wish you a year filled with breathtaking surprises, dreamy sunsets, coffee dates, genuine peace, and dreams coming true. May your smile never lose its sparkle.",
    "No matter where life takes us or how chaotic things get, I will always be right here, cheering for you the loudest."
  ]
};

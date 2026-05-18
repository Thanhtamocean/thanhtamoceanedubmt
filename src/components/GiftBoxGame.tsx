import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Star, X, Gift, Brain, ArrowLeft, CheckCircle2, XCircle, ArrowRight, Volume2, VolumeX } from 'lucide-react';

// --- Tùy Chọn Quà ---
type Prize = { id: string; nameVn: string; nameEn: string; emoji: string; color: string; bg: string; };
const PRIZES: Prize[] = [
  { id: 'bear', nameVn: 'Gấu Bông Đáng Yêu', nameEn: 'Teddy Bear', emoji: '🧸', color: 'text-amber-600', bg: 'bg-amber-100 border-amber-300' },
  { id: 'pencil', nameVn: 'Bộ Bút Chì Màu', nameEn: 'Colored Pencils', emoji: '🖍️', color: 'text-pink-600', bg: 'bg-pink-100 border-pink-300' },
  { id: 'lego', nameVn: 'Bộ Xếp Hình Lego', nameEn: 'Lego Set', emoji: '🧱', color: 'text-red-600', bg: 'bg-red-100 border-red-300' },
  { id: 'backpack', nameVn: 'Balo Cực Ngầu', nameEn: 'Cool Backpack', emoji: '🎒', color: 'text-blue-600', bg: 'bg-blue-100 border-blue-300' },
  { id: 'candy', nameVn: 'Kẹo Ngọt', nameEn: 'Sweet Candy', emoji: '🍬', color: 'text-purple-600', bg: 'bg-purple-100 border-purple-300' },
  { id: 'book', nameVn: 'Truyện Tranh Hay', nameEn: 'Comic Book', emoji: '📚', color: 'text-emerald-600', bg: 'bg-emerald-100 border-emerald-300' },
];
const BOX_COLORS = [
  'from-pink-400 to-pink-600', 'from-yellow-400 to-amber-500', 'from-green-400 to-emerald-600',
  'from-blue-400 to-blue-600', 'from-purple-400 to-purple-600', 'from-rose-400 to-red-500',
];

// --- Câu Hỏi Đố Vui ---
type QuizQuestion = {
  question: string;
  options: { id: string, text?: string, emoji: string, isCorrect: boolean }[];
  explanation: string;
};
type QuizTopic = { id: string; name: string; emoji: string; color: string; questions: QuizQuestion[]; };

const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: 'animals', name: 'Động Vật', emoji: '🦁', color: 'from-orange-400 to-red-500',
    questions: [
      {
        question: '"Tiger" là con gì ta?',
        options: [{ id: '1', emoji: '🦁', isCorrect: false }, { id: '2', emoji: '🐯', isCorrect: true }, { id: '3', emoji: '🐆', isCorrect: false }, { id: '4', emoji: '🐱', isCorrect: false }],
        explanation: 'Tiger chính là bạn Hổ ngộ nghĩnh đó!'
      },
      {
        question: '"Monkey" là con gì rứa ta?',
        options: [{ id: '1', emoji: '🐵', isCorrect: true }, { id: '2', emoji: '🐶', isCorrect: false }, { id: '3', emoji: '🐻', isCorrect: false }, { id: '4', emoji: '🐼', isCorrect: false }],
        explanation: 'Monkey là bạn Khỉ thích leo trèo!'
      },
      {
        question: 'Bạn Cáo đuôi dài trong tiếng Anh là gì?',
        options: [{ id: '1', text: 'Dog', emoji: '🐶', isCorrect: false }, { id: '2', text: 'Fox', emoji: '🦊', isCorrect: true }, { id: '3', text: 'Cat', emoji: '🐱', isCorrect: false }, { id: '4', text: 'Wolf', emoji: '🐺', isCorrect: false }],
        explanation: 'Bạn Cáo là Fox đó bé ơi!'
      },
      {
        question: '"Elephant" là con gì to lớn?',
        options: [{ id: '1', emoji: '🦏', isCorrect: false }, { id: '2', emoji: '🦛', isCorrect: false }, { id: '3', emoji: '🐘', isCorrect: true }, { id: '4', emoji: '🦒', isCorrect: false }],
        explanation: 'Elephant là bạn Voi có cái vòi dài!'
      },
      {
        question: 'Con Chó thân thiết tiếng Anh gọi là?',
        options: [{ id: '1', emoji: '🐱', isCorrect: false }, { id: '2', emoji: '🐶', isCorrect: true }, { id: '3', emoji: '🐭', isCorrect: false }, { id: '4', emoji: '🐰', isCorrect: false }],
        explanation: 'Dog là con Chó sủa gâu gâu đó!'
      }
    ]
  },
  {
    id: 'fruits', name: 'Trái Cây', emoji: '🍎', color: 'from-green-400 to-emerald-600',
    questions: [
      {
        question: '"Apple" là quả gì nhỉ?',
        options: [{ id: '1', emoji: '🍓', isCorrect: false }, { id: '2', emoji: '🍎', isCorrect: true }, { id: '3', emoji: '🍒', isCorrect: false }, { id: '4', emoji: '🍅', isCorrect: false }],
        explanation: 'Apple là quả Táo đỏ mọng!'
      },
      {
        question: 'Quả Chuối vàng ươm tiếng Anh gọi là?',
        options: [{ id: '1', text: 'Banana', emoji: '🍌', isCorrect: true }, { id: '2', text: 'Mango', emoji: '🥭', isCorrect: false }, { id: '3', text: 'Lemon', emoji: '🍋', isCorrect: false }, { id: '4', text: 'Orange', emoji: '🍊', isCorrect: false }],
        explanation: 'Banana chính là quả Chuối ngọt lịm đó!'
      },
      {
        question: '"Watermelon" là quả gì to thật to?',
        options: [{ id: '1', emoji: '🍈', isCorrect: false }, { id: '2', emoji: '🍉', isCorrect: true }, { id: '3', emoji: '🥝', isCorrect: false }, { id: '4', emoji: '🥥', isCorrect: false }],
        explanation: 'Watermelon là quả Dưa hấu mát lạnh!'
      },
      {
        question: 'Quả Nho ngọt thành chùm tiếng Anh đọc sao?',
        options: [{ id: '1', text: 'Grape', emoji: '🍇', isCorrect: true }, { id: '2', text: 'Plum', emoji: '🍑', isCorrect: false }, { id: '3', text: 'Berry', emoji: '🫐', isCorrect: false }, { id: '4', text: 'Pear', emoji: '🍐', isCorrect: false }],
        explanation: 'Grape là quả Nho thành chùm!'
      },
      {
        question: '"Strawberry" là quả gì đỏ tươi thế?',
        options: [{ id: '1', emoji: '🍎', isCorrect: false }, { id: '2', emoji: '🍒', isCorrect: false }, { id: '3', emoji: '🍓', isCorrect: true }, { id: '4', emoji: '🍉', isCorrect: false }],
        explanation: 'Strawberry là quả Dâu Tây ngọt ngào!'
      }
    ]
  },
  {
    id: 'colors', name: 'Màu Sắc', emoji: '🎨', color: 'from-pink-400 to-rose-600',
    questions: [
      {
        question: '"Red" là màu gì ta?',
        options: [{ id: '1', emoji: '🔴', text: 'Màu Đỏ', isCorrect: true }, { id: '2', emoji: '🔵', text: 'Màu Xanh', isCorrect: false }, { id: '3', emoji: '🟡', text: 'Màu Vàng', isCorrect: false }, { id: '4', emoji: '🟢', text: 'Màu Lục', isCorrect: false }],
        explanation: 'Red là Màu Đỏ rực rỡ như hoàng hôn!'
      },
      {
        question: '"Blue" là màu gì bé ơi?',
        options: [{ id: '1', emoji: '🔴', isCorrect: false }, { id: '2', emoji: '🔵', isCorrect: true }, { id: '3', emoji: '🟡', isCorrect: false }, { id: '4', emoji: '🟣', isCorrect: false }],
        explanation: 'Blue là Màu Xanh Nước Biển đó!'
      },
      {
        question: 'Từ "Yellow" chỉ màu của bông hoa gì?',
        options: [{ id: '1', emoji: '🌻', text: 'Hoa Hướng Dương', isCorrect: true }, { id: '2', emoji: '🌺', text: 'Hoa Râm Bụt', isCorrect: false }, { id: '3', emoji: '🌹', text: 'Hoa Hồng Đỏ', isCorrect: false }, { id: '4', emoji: '🌷', text: 'Hoa Tulip Hồng', isCorrect: false }],
        explanation: 'Yellow là Màu Vàng xinh xắn!'
      },
      {
        question: 'Màu Xanh Lá Cây tiếng Anh đọc là gì?',
        options: [{ id: '1', emoji: '🟩', text: 'Black', isCorrect: false }, { id: '2', emoji: '🟩', text: 'Green', isCorrect: true }, { id: '3', emoji: '🟩', text: 'White', isCorrect: false }, { id: '4', emoji: '🟩', text: 'Pink', isCorrect: false }],
        explanation: 'Green là Màu Xanh Lá tươi mát!'
      },
      {
        question: '"Pink" là màu gì đó bé bé xinh xinh?',
        options: [{ id: '1', emoji: '🌸', text: 'Màu Hồng', isCorrect: true }, { id: '2', emoji: '🌼', text: 'Màu Vàng', isCorrect: false }, { id: '3', emoji: '🌻', text: 'Màu Cam', isCorrect: false }, { id: '4', emoji: '🌺', text: 'Màu Đỏ', isCorrect: false }],
        explanation: 'Pink là Màu Hồng siêu cấp đáng yêu!'
      }
    ]
  },
  {
    id: 'numbers', name: 'Số Đếm', emoji: '🔢', color: 'from-blue-400 to-cyan-500',
    questions: [
      {
        question: '"One" là số mấy?',
        options: [{ id: '1', emoji: '1️⃣', isCorrect: true }, { id: '2', emoji: '2️⃣', isCorrect: false }, { id: '3', emoji: '3️⃣', isCorrect: false }, { id: '4', emoji: '4️⃣', isCorrect: false }],
        explanation: 'One là Số 1 đầu tiên luôn!'
      },
      {
        question: 'Số 3 tiếng Anh đọc là gì?',
        options: [{ id: '1', emoji: '3️⃣', text: 'Two', isCorrect: false }, { id: '2', emoji: '3️⃣', text: 'Four', isCorrect: false }, { id: '3', emoji: '3️⃣', text: 'Three', isCorrect: true }, { id: '4', emoji: '3️⃣', text: 'Five', isCorrect: false }],
        explanation: 'Số 3 đọc là Three nha bé!'
      },
      {
        question: '"Five" là có mấy cái kẹo?',
        options: [{ id: '1', emoji: '🍬🍬', isCorrect: false }, { id: '2', emoji: '🍬🍬🍬', isCorrect: false }, { id: '3', emoji: '🍬🍬🍬🍬', isCorrect: false }, { id: '4', emoji: '🍬🍬🍬🍬🍬', isCorrect: true }],
        explanation: 'Five là Số 5 (5 cái kẹo)!'
      },
      {
        question: 'Số 10 đếm trong tiếng Anh là?',
        options: [{ id: '1', emoji: '🔟', text: 'Nine', isCorrect: false }, { id: '2', emoji: '🔟', text: 'Ten', isCorrect: true }, { id: '3', emoji: '🔟', text: 'Eight', isCorrect: false }, { id: '4', emoji: '🔟', text: 'Six', isCorrect: false }],
        explanation: 'Số 10 là Ten chục đó!'
      },
      {
        question: '"Two" là ngón tay dơ lên hình số mấy?',
        options: [{ id: '1', emoji: '1️⃣', isCorrect: false }, { id: '2', emoji: '3️⃣', isCorrect: false }, { id: '3', emoji: '2️⃣', isCorrect: true }, { id: '4', emoji: '4️⃣', isCorrect: false }],
        explanation: 'Two là Số 2, giống chữ V chiến thắng đó!'
      }
    ]
  },
  {
    id: 'items', name: 'Đồ Vật', emoji: '🎒', color: 'from-indigo-400 to-purple-600',
    questions: [
      {
        question: '"Book" là đồ vật gì?',
        options: [{ id: '1', emoji: '📖', isCorrect: true }, { id: '2', emoji: '✏️', isCorrect: false }, { id: '3', emoji: '🎒', isCorrect: false }, { id: '4', emoji: '📏', isCorrect: false }],
        explanation: 'Book là quyển Sách để bé đọc đó!'
      },
      {
        question: 'Cây Bút Chì tiếng Anh gọi là?',
        options: [{ id: '1', text: 'Pen', emoji: '🖊️', isCorrect: false }, { id: '2', text: 'Pencil', emoji: '✏️', isCorrect: true }, { id: '3', text: 'Eraser', emoji: '🧽', isCorrect: false }, { id: '4', text: 'Bag', emoji: '🎒', isCorrect: false }],
        explanation: 'Bút chì là Pencil đó nha bé!'
      },
      {
        question: '"Bag" dùng để làm gì?',
        options: [{ id: '1', text: 'Uống nước', emoji: '🥤', isCorrect: false }, { id: '2', text: 'Đựng đồ', emoji: '🎒', isCorrect: true }, { id: '3', text: 'Viết chữ', emoji: '✏️', isCorrect: false }, { id: '4', text: 'Tẩy xóa', emoji: '🧽', isCorrect: false }],
        explanation: 'Bag là Cái Cặp, Balo để bé đi học!'
      },
      {
        question: 'Chiếc Ghế bé ngồi tiếng Anh là gì?',
        options: [{ id: '1', text: 'Table', emoji: '🪑', isCorrect: false }, { id: '2', text: 'Chair', emoji: '🪑', isCorrect: true }, { id: '3', text: 'Bed', emoji: '🛏️', isCorrect: false }, { id: '4', text: 'Door', emoji: '🚪', isCorrect: false }],
        explanation: 'Cái Ghế ngồi đọc là Chair!'
      },
      {
        question: '"Ruler" dùng để làm gì nhỉ?',
        options: [{ id: '1', text: 'Kẻ Đo', emoji: '📏', isCorrect: true }, { id: '2', text: 'Tô Màu', emoji: '🖍️', isCorrect: false }, { id: '3', text: 'Cắt Giấy', emoji: '✂️', isCorrect: false }, { id: '4', text: 'Dán Keo', emoji: '🧴', isCorrect: false }],
        explanation: 'Ruler là Cây Thước Kẻ thẳng tắp!'
      }
    ]
  },
  {
    id: 'family', name: 'Gia Đình', emoji: '👨‍👩‍👧‍👦', color: 'from-amber-400 to-orange-500',
    questions: [
      {
        question: '"Father" là ai trong nhà thế nhỉ?',
        options: [{ id: '1', emoji: '👨', text: 'Bố (Ba)', isCorrect: true }, { id: '2', emoji: '👩', text: 'Mẹ (Má)', isCorrect: false }, { id: '3', emoji: '👴', text: 'Ông Nội', isCorrect: false }, { id: '4', emoji: '👶', text: 'Em Bé', isCorrect: false }],
        explanation: 'Father là Người Bố siêu nhân của bé!'
      },
      {
        question: '"Mother" là người yêu thương bé nhất, đó là ai?',
        options: [{ id: '1', emoji: '👨', text: 'Bố', isCorrect: false }, { id: '2', emoji: '👩', text: 'Mẹ', isCorrect: true }, { id: '3', emoji: '👵', text: 'Bà', isCorrect: false }, { id: '4', emoji: '👦', text: 'Anh Trai', isCorrect: false }],
        explanation: 'Mother là người Mẹ dịu dàng đó nha!'
      },
      {
        question: 'Ông của bé tiếng Anh gọi là gì?',
        options: [{ id: '1', text: 'Grandfather', emoji: '👴', isCorrect: true }, { id: '2', text: 'Uncle', emoji: '👨', isCorrect: false }, { id: '3', text: 'Brother', emoji: '👦', isCorrect: false }, { id: '4', text: 'Father', emoji: '👨', isCorrect: false }],
        explanation: 'Grandfather là Ông Nội hoặc Ông Ngoại của bé!'
      },
      {
        question: '"Sister" là ai nè?',
        options: [{ id: '1', text: 'Chị/Em gái', emoji: '👧', isCorrect: true }, { id: '2', text: 'Anh/Em trai', emoji: '👦', isCorrect: false }, { id: '3', text: 'Chú bác', emoji: '👨', isCorrect: false }, { id: '4', text: 'Bà', emoji: '👵', isCorrect: false }],
        explanation: 'Sister là Chị Gái hoặc Em Gái đó nha!'
      },
      {
        question: 'Anh hoặc em trai của bé đọc là gì?',
        options: [{ id: '1', text: 'Sister', emoji: '👧', isCorrect: false }, { id: '2', text: 'Brother', emoji: '👦', isCorrect: true }, { id: '3', text: 'Father', emoji: '👨', isCorrect: false }, { id: '4', text: 'Mother', emoji: '👩', isCorrect: false }],
        explanation: 'Brother là Anh Trai hoặc Em Trai của bé!'
      }
    ]
  }
];

type GameMode = 'menu' | 'gift_stage' | 'quiz_topics' | 'quiz_play';
type GiftStage = 'idle' | 'suspense' | 'revealed';

// --- Background Component ---
const BubblesBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {Array.from({ length: 15 }).map((_, i) => {
      const size = Math.random() * 40 + 10;
      const left = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 10 + 10;

      return (
        <motion.div
          key={`bubble-${i}`}
          className="absolute bottom-0 rounded-full bg-white/20 backdrop-blur-sm"
          style={{ width: size, height: size, left: `${left}%` }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.8, 0] }}
          transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
        />
      );
    })}
  </div>
);

let audioCtx: AudioContext | null = null;
const getAudioCtx = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
};

const playSound = (type: 'suspense' | 'tada' | 'correct' | 'wrong' | 'pop') => {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    
    const t = ctx.currentTime;

    const createNote = (freq: number, start: number, duration: number, vol = 0.1, type: OscillatorType = 'sine') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(vol, start + duration * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };

    if (type === 'pop') {
      createNote(400, t, 0.1, 0.1, 'sine');
      createNote(800, t + 0.05, 0.1, 0.1, 'sine');
    }
    else if (type === 'tada') {
      createNote(523.25, t, 0.15, 0.2, 'triangle'); // C5
      createNote(659.25, t + 0.15, 0.15, 0.2, 'triangle'); // E5
      createNote(783.99, t + 0.3, 0.15, 0.2, 'triangle'); // G5
      createNote(1046.50, t + 0.45, 0.6, 0.2, 'triangle'); // C6
    }
    else if (type === 'correct') {
      createNote(587.33, t, 0.1, 0.1, 'square'); // D5
      createNote(880.00, t + 0.1, 0.3, 0.1, 'square'); // A5
    }
    else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.5);
      
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.linearRampToValueAtTime(0.1, t + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.5);
    }
    else if (type === 'suspense') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      
      osc.frequency.setValueAtTime(80, t);
      osc.frequency.linearRampToValueAtTime(120, t + 2.5);
      
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.2);
      gain.gain.linearRampToValueAtTime(0.2, t + 2.5);
      gain.gain.linearRampToValueAtTime(0, t + 2.8);
      
      const lfo = ctx.createOscillator();
      lfo.type = 'square';
      lfo.frequency.value = 15;
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.5;
      lfo.connect(lfoGain.gain);
      
      osc.connect(lfoGain);
      lfoGain.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(t);
      lfo.start(t);
      osc.stop(t + 2.8);
      lfo.stop(t + 2.8);
    }
  } catch (e) {
    console.error("Audio play failed:", e);
  }
};

export default function GiftBoxGame({ onClose }: { onClose: () => void }) {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  
  // Audio state
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasStartedAudio, setHasStartedAudio] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      if (!isMuted && hasStartedAudio) {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, hasStartedAudio]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!hasStartedAudio) {
      setHasStartedAudio(true);
    }
  };

  const startInteraction = () => {
    if (!hasStartedAudio) {
      setHasStartedAudio(true);
      if (audioRef.current && !isMuted) {
         audioRef.current.play().catch(() => {});
      }
    }
  };

  // Gift Stage State
  const [giftStage, setGiftStage] = useState<GiftStage>('idle');
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);
  const [prize, setPrize] = useState<Prize | null>(null);

  // Quiz Stage State
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizPhase, setQuizPhase] = useState<'question' | 'feedback' | 'completed'>('question');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const fireConfetti = () => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1050 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  // --- Gift Logic ---
  const handleBoxClick = (index: number) => {
    if (giftStage !== 'idle') return;
    playSound('suspense');
    const randomPrize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
    setSelectedBoxIndex(index);
    setGiftStage('suspense');
    setPrize(randomPrize);
    setTimeout(() => {
      setGiftStage('revealed');
      playSound('tada');
      fireConfetti();
    }, 2800);
  };

  // --- Quiz Logic ---
  const handleSelectTopic = (topic: QuizTopic) => {
    playSound('pop');
    setSelectedTopic(topic);
    setCurrentQuestionIndex(0);
    setQuizPhase('question');
    setSelectedOptionId(null);
    setGameMode('quiz_play');
  };

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (quizPhase !== 'question') return;
    setSelectedOptionId(optionId);
    setQuizPhase('feedback');
    if (isCorrect) {
      playSound('correct');
      fireConfetti();
    } else {
      playSound('wrong');
    }
  };

  const handeNextQuestion = () => {
    playSound('pop');
    if (!selectedTopic) return;
    if (currentQuestionIndex < selectedTopic.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuizPhase('question');
      setSelectedOptionId(null);
    } else {
      setQuizPhase('completed');
      playSound('tada');
      fireConfetti();
    }
  };

  return (
    <div 
      onClick={startInteraction}
      className="fixed inset-0 z-[200] font-sans overflow-y-auto overflow-x-hidden bg-gradient-to-b from-cyan-300 via-blue-400 to-blue-700 pb-12"
    >
      <div className="min-h-[125vh] md:min-h-[130vh] flex flex-col items-center justify-start relative pt-8 md:pt-12 px-4 w-full transform origin-top scale-[0.85] md:scale-75">
        <BubblesBackground />
        
        {/* Floating Elements (Background) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-[5%] left-[2%] md:left-[5%] text-5xl md:text-7xl drop-shadow-2xl pointer-events-auto cursor-pointer" whileHover={{ scale: 1.2, rotate: 15 }} whileTap={{ scale: 0.8 }}>🐰</motion.div>
           <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-[20%] left-[4%] md:left-[8%] text-5xl md:text-7xl drop-shadow-2xl pointer-events-auto cursor-pointer" whileHover={{ scale: 1.2, rotate: -15 }} whileTap={{ scale: 0.8 }}>🦄</motion.div>
           <motion.div animate={{ y: [0, -15, 0], rotate: [0, 8, -8, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-[8%] right-[2%] md:right-[5%] text-5xl md:text-7xl drop-shadow-2xl pointer-events-auto cursor-pointer" whileHover={{ scale: 1.2, rotate: 15 }} whileTap={{ scale: 0.8 }}>🦁</motion.div>
           <motion.div animate={{ y: [0, 25, 0], rotate: [0, -5, 5, 0] }} transition={{ duration: 4.5, repeat: Infinity }} className="absolute bottom-[18%] right-[4%] md:right-[8%] text-5xl md:text-7xl drop-shadow-2xl pointer-events-auto cursor-pointer" whileHover={{ scale: 1.2, rotate: -15 }} whileTap={{ scale: 0.8 }}>🦊</motion.div>
           <motion.div animate={{ x: [0, 20, 0], y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-[25%] left-[2%] text-5xl drop-shadow-md pointer-events-auto cursor-pointer opacity-70" whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.7 }}>🎈</motion.div>
           <motion.div animate={{ x: [0, -20, 0], y: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-[35%] right-[3%] text-6xl drop-shadow-md pointer-events-auto cursor-pointer opacity-70" whileHover={{ scale: 1.3, rotate: 180 }} whileTap={{ scale: 0.7 }}>🌟</motion.div>
        </div>
        
        {/* Navigation & Controls */}
        <div className="flex items-center justify-between w-full max-w-5xl z-50 mb-4 px-2 pt-2 md:pt-0">
          {gameMode !== 'menu' ? (
             <button 
               onClick={() => {
                 playSound('pop');
                 if (gameMode === 'quiz_play') setGameMode('quiz_topics');
                 else setGameMode('menu');
               }}
               className="p-2 md:p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all shadow-lg flex items-center gap-2 font-bold"
             >
               <ArrowLeft size={24} />
               <span className="hidden md:inline">Quay lại</span>
             </button>
          ) : <div></div>}

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleMute}
              className="p-2 md:p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all shadow-lg"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <button 
              onClick={() => { playSound('pop'); onClose(); }}
              className="p-2 md:p-3 bg-white/20 hover:bg-red-500/80 backdrop-blur-md rounded-full text-white transition-all shadow-lg hover:rotate-90"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Background Music */}
        <audio 
          ref={audioRef} 
          loop 
          autoPlay
        >
          {/* Fun cheerful background music for kids */}
          <source src="https://upload.wikimedia.org/wikipedia/commons/3/39/Monkeys_Spinning_Monkeys.ogg" type="audio/ogg" />
        </audio>

        {/* 1) MAIN MENU MODE */}
        {gameMode === 'menu' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full flex flex-col items-center flex-1 justify-center space-y-8"
          >
            <div className="bg-white/20 backdrop-blur-md border border-white/40 shadow-2xl rounded-3xl px-6 py-6 md:px-12 md:py-8 max-w-3xl w-full text-center">
               <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-4">
                 Sân Chơi Tiếng Anh 🚀
               </h1>
               <p className="text-xl text-cyan-50 font-medium font-bold">Cùng Ocean Edu khám phá nào bé ơi!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-8 px-4">
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => { playSound('pop'); setGameMode('gift_stage'); setGiftStage('idle'); }}
                className="bg-gradient-to-br from-yellow-300 to-amber-500 rounded-[2rem] p-8 md:p-10 shadow-2xl border-4 border-yellow-200 flex flex-col items-center justify-center gap-4 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}>
                  <Gift size={80} className="text-amber-800" fill="currentColor" />
                </motion.div>
                <h3 className="text-3xl font-black text-amber-900 uppercase drop-shadow-sm">Mở Hộp Quà</h3>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => { playSound('pop'); setGameMode('quiz_topics'); }}
                className="bg-gradient-to-br from-purple-400 to-fuchsia-500 rounded-[2rem] p-8 md:p-10 shadow-2xl border-4 border-purple-200 flex flex-col items-center justify-center gap-4 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Brain size={80} className="text-purple-100" />
                </motion.div>
                <h3 className="text-3xl font-black text-white uppercase drop-shadow-md">Đố Vui</h3>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* 2) GIFT BOX GAME MODE */}
        {gameMode === 'gift_stage' && (
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl flex-1 mt-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-10 drop-shadow-xl text-center">Bé chọn hộp quà nào?</h2>
            <AnimatePresence mode="wait">
              {giftStage === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 w-full justify-items-center"
                >
                  {BOX_COLORS.map((bgGradient, index) => (
                    <motion.button
                      key={index} onClick={() => handleBoxClick(index)}
                      whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }} whileTap={{ scale: 0.95 }}
                      initial={{ y: 20, opacity: 0 }} animate={{ y: [0, -10, 0], opacity: 1 }}
                      transition={{ y: { duration: 2, repeat: Infinity, delay: index * 0.15 }, opacity: { duration: 0.5, delay: index * 0.1 } }}
                      className={`group relative w-32 h-32 md:w-48 md:h-48 rounded-2xl md:rounded-3xl bg-gradient-to-br ${bgGradient} shadow-2xl border-4 border-white/50 flex flex-col items-center justify-center overflow-hidden transition-all`}
                    >
                      <div className="absolute top-0 bottom-0 left-1/2 w-4 md:w-6 bg-yellow-300 opacity-90 -translate-x-1/2 shadow-sm" />
                      <div className="absolute left-0 right-0 top-1/2 h-4 md:h-6 bg-yellow-300 opacity-90 -translate-y-1/2 shadow-sm" />
                      <div className="relative bg-white/90 rounded-full p-2 shadow-lg z-10 group-hover:animate-spin-slow">
                        <Sparkles className="w-8 h-8 text-yellow-500" />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {giftStage === 'suspense' && selectedBoxIndex !== null && (
                <motion.div key="suspense" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                  className="flex flex-col items-center justify-center min-h-[300px]"
                >
                  <motion.div
                    animate={{ x: [0, -10, 10, -15, 15, -10, 10, 0], y: [0, 5, -5, 10, -10, 5, -5, 0], rotate: [0, -5, 5, -10, 10, -5, 5, 0], scale: [1, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4] }}
                    transition={{ duration: 2.8, ease: "easeInOut" }}
                    className={`relative w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br ${BOX_COLORS[selectedBoxIndex]} shadow-[0_0_60px_rgba(255,255,255,0.8)] border-4 border-white flex items-center justify-center`}
                  >
                     <div className="absolute top-0 bottom-0 left-1/2 w-6 md:w-8 bg-yellow-300 opacity-95 -translate-x-1/2" />
                     <div className="absolute left-0 right-0 top-1/2 h-6 md:h-8 bg-yellow-300 opacity-95 -translate-y-1/2" />
                     <div className="relative bg-white rounded-full p-4 shadow-xl z-10 animate-spin"><Sparkles className="w-12 h-12 text-yellow-500" /></div>
                  </motion.div>
                </motion.div>
              )}

              {giftStage === 'revealed' && prize && (
                <motion.div key="revealed" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
                  className="flex flex-col items-center w-full max-w-xl px-2"
                >
                  <div className={`w-full rounded-[2rem] md:rounded-[3rem] ${prize.bg} border-4 md:border-8 ${prize.color.replace('text-', 'border-')} shadow-2xl flex flex-col items-center p-8 md:p-12 text-center`}>
                    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.3 }}
                      className="text-8xl md:text-[140px] drop-shadow-2xl mb-6 hover:scale-110 transition-transform cursor-pointer"
                    >
                      {prize.emoji}
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                      <h3 className={`text-4xl md:text-5xl font-black ${prize.color} mb-4 uppercase`}>{prize.nameEn}</h3>
                      <h4 className="text-2xl md:text-3xl font-bold text-gray-700 bg-white/70 px-6 py-2 rounded-full">{prize.nameVn}</h4>
                    </motion.div>
                  </div>
                  <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} onClick={() => { playSound('pop'); setGiftStage('idle'); }}
                    className="mt-8 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-xl shadow-xl hover:bg-blue-50 transition-all flex items-center gap-3"
                  >
                    <RotateCcw className="w-6 h-6" /> Chơi Lại Nào
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* 3) QUIZ TOPICS MODE */}
        {gameMode === 'quiz_topics' && (
          <div className="relative z-10 flex flex-col items-center w-full max-w-3xl flex-1 mt-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 md:mb-12 drop-shadow-xl text-center">Bé muốn chơi chủ đề nào? 🤓</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
              {QUIZ_TOPICS.map((topic, i) => (
                <motion.button 
                  key={topic.id} onClick={() => handleSelectTopic(topic)}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className={`bg-gradient-to-br ${topic.color} rounded-3xl p-6 flex flex-col items-center shadow-lg border-4 border-white/30 hover:border-white/80 transition-colors`}
                >
                   <span className="text-5xl md:text-6xl mb-4 drop-shadow-md">{topic.emoji}</span>
                   <span className="text-xl md:text-2xl font-black text-white drop-shadow-sm uppercase text-center">{topic.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* 4) QUIZ PLAY MODE */}
        {gameMode === 'quiz_play' && selectedTopic && (
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-2 min-h-[500px]">
            <div className="flex items-center gap-4 mb-6">
               <span className="text-4xl">{selectedTopic.emoji}</span>
               <div className="flex gap-2">
                 {selectedTopic.questions.map((_, idx) => (
                   <div key={idx} className={`w-4 h-4 rounded-full ${idx === currentQuestionIndex ? 'bg-white scale-125' : idx < currentQuestionIndex ? 'bg-green-400' : 'bg-white/30'} transition-all`} />
                 ))}
               </div>
            </div>

            <AnimatePresence mode="wait">
              {quizPhase !== 'completed' ? (
                <motion.div key={`question-view-${currentQuestionIndex}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="w-full">
                  <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl text-center mb-6 border-b-8 border-slate-200">
                     <h3 className="text-2xl md:text-4xl font-extrabold text-slate-800 leading-tight">
                       {selectedTopic.questions[currentQuestionIndex].question}
                     </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {selectedTopic.questions[currentQuestionIndex].options.map((opt) => {
                       const isSelected = selectedOptionId === opt.id;
                       let btnClass = "bg-white hover:bg-cyan-50 border-cyan-100 text-slate-700";
                       
                       if (quizPhase === 'feedback') {
                          if (opt.isCorrect) btnClass = "bg-green-500 border-green-600 text-white shadow-[0_0_30px_rgba(34,197,94,0.5)]";
                          else if (isSelected && !opt.isCorrect) btnClass = "bg-red-500 border-red-600 text-white";
                          else btnClass = "bg-slate-100 border-slate-200 opacity-50";
                       }

                       return (
                         <motion.button
                           key={opt.id} disabled={quizPhase === 'feedback'}
                           onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                           whileHover={quizPhase === 'question' ? { scale: 1.05 } : {}}
                           whileTap={quizPhase === 'question' ? { scale: 0.95 } : {}}
                           className={`rounded-[2rem] p-4 md:p-6 flex flex-col items-center justify-center border-b-[6px] md:border-b-8 transition-colors ${btnClass}`}
                         >
                            <span className="text-5xl md:text-6xl mb-2 drop-shadow-sm">{opt.emoji}</span>
                            {opt.text && <span className="font-bold text-lg md:text-xl">{opt.text}</span>}
                         </motion.button>
                       )
                    })}
                  </div>

                  {quizPhase === 'feedback' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl text-center border-4 border-white">
                       {selectedTopic.questions[currentQuestionIndex].options.find(o => o.id === selectedOptionId)?.isCorrect ? (
                         <div className="text-green-600 font-black text-2xl md:text-3xl flex items-center justify-center gap-2 mb-3"><CheckCircle2 className="w-10 h-10"/> Chúc mừng nhen! 🎉</div>
                       ) : (
                         <div className="text-red-500 font-black text-2xl md:text-3xl flex items-center justify-center gap-2 mb-3"><XCircle className="w-10 h-10"/> Ôi Sai Mất Rồi! 🐾</div>
                       )}
                       <p className="text-xl md:text-2xl text-slate-700 font-bold mb-6">{selectedTopic.questions[currentQuestionIndex].explanation}</p>
                       <button onClick={handeNextQuestion} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/30 text-white px-8 py-4 rounded-full font-black text-xl flex items-center justify-center gap-2 mx-auto w-full md:w-auto">
                         {currentQuestionIndex < selectedTopic.questions.length - 1 ? 'Câu Tiếp Theo' : 'Hoàn Thành'} <ArrowRight />
                       </button>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div key="completed" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3rem] p-10 text-center shadow-2xl w-full">
                   <div className="text-8xl mb-6">🏆</div>
                   <h2 className="text-4xl font-black text-amber-500 mb-4">Cao Thủ Tiếng Anh!</h2>
                   <p className="text-xl text-slate-600 font-bold mb-8">Bé đã trả lời xong các câu hỏi về {selectedTopic.name} rồi đó!</p>
                   <button onClick={() => { playSound('pop'); setGameMode('quiz_topics'); }} className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-xl shadow-blue-500/30 text-white px-8 py-4 rounded-full font-black text-xl w-full">
                     Chơi Chủ Đề Khác 💪
                   </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  CheckCircle2, 
  ChevronRight, 
  Users, 
  Globe2, 
  Calendar, 
  Clock,
  ArrowRight,
  Menu,
  X,
  MessageCircle
} from 'lucide-react';
import { useForm } from 'react-hook-form';

import GiftBoxGame from './components/GiftBoxGame';

interface FormData {
  parentName: string;
  studentName: string;
  school: string;
  studentDOB: string;
  phone: string;
}

const ASSETS = {
  hero: "https://accdaklak.vn/wp-content/uploads/2026/05/687953345_122307047492236479_243836941533152379_n.jpg",
  scholarship: "https://accdaklak.vn/wp-content/uploads/2026/05/689014427_122306925098236479_4279548025498114390_n.jpg",
  programs: "https://accdaklak.vn/wp-content/uploads/2026/05/690934453_122307039884236479_6159533812860998021_n.jpg",
  milestone: "https://accdaklak.vn/wp-content/uploads/2026/05/699946867_122307935690236479_2808770806360987543_n.jpg",
  graduation: "https://accdaklak.vn/wp-content/uploads/2026/05/699946867_122307935690236479_2808770806360987543_n.jpg",
  certificate: "https://ocean.edu.vn/images/banners/20251224/134110396392727609.jpg"
};

const PROGRAM_AGES = [
  {
    name: "Discovery English",
    age: "3-6 tuổi",
    description: "Khơi gợi niềm đam mê ngôn ngữ từ sớm thông qua các hoạt động vui nhộn.",
    icon: <Users className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-600"
  },
  {
    name: "Challenge English",
    age: "6-11 tuổi",
    description: "Phát triển tư vấn và kỹ năng giao tiếp tự tin trong môi trường chuẩn quốc tế.",
    icon: <Globe2 className="w-6 h-6" />,
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    name: "Focus English",
    age: "11-16 tuổi",
    description: "Xây dựng nền tảng vững chắc để chinh phục các kỳ thi quốc tế.",
    icon: <Calendar className="w-6 h-6" />,
    color: "bg-emerald-100 text-emerald-600"
  }
];

const REASONS = [
  {
    id: "01",
    title: "Đánh giá lộ trình rõ ràng",
    desc: "Tư vấn viên liên hệ để xác nhận độ tuổi, trình độ và khung giờ học phù hợp cho con."
  },
  {
    id: "02",
    title: "Môi trường quốc tế",
    desc: "Trải nghiệm lớp học tiếng Anh theo tinh thần giao tiếp, tương tác và thực hành liên tục."
  },
  {
    id: "03",
    title: "Phù hợp nhiều độ tuổi",
    desc: "Chương trình được thiết kế chuyên biệt cho từng giai đoạn phát triển của trẻ."
  },
  {
    id: "04",
    title: "Đăng ký thật nhanh",
    desc: "Phụ huynh chỉ cần để lại thông tin cơ bản, đội ngũ Ocean Edu sẽ gọi lại tư vấn."
  }
];

const STEPS = [
  {
    num: "1",
    title: "Điền thông tin",
    desc: "Họ tên, trường, ngày sinh và số điện thoại phụ huynh."
  },
  {
    num: "2",
    title: "Ocean Edu liên hệ",
    desc: "Tư vấn khung giờ, chương trình và cơ sở phù hợp."
  },
  {
    num: "3",
    title: "Bắt đầu trải nghiệm",
    desc: "Tham gia lớp học hè để làm quen môi trường chuẩn quốc tế."
  }
];

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw8bzjN0pgVbVGeUhlOACrapFK88oqhHuA0RPyhjav0skp_iQWS1WV8acf1JTVIa4j94Q/exec"; // TODO: Paste your Google Apps Script Web App URL here after deploying

export default function App() {
  const [showGame, setShowGame] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      if (SCRIPT_URL) {
        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(data)
        });
      } else {
        console.log("Form Data (No SCRIPT_URL configured):", data);
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const [notification, setNotification] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotification(true);
      setTimeout(() => setNotification(false), 3000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-ocean-light">
      <AnimatePresence>
        {showGame && <GiftBoxGame onClose={() => setShowGame(false)} />}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="bg-white border-b border-ocean-light shadow-sm relative z-50">
        <div className="container mx-auto px-4 md:px-8 py-3 md:py-4 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <img 
              src="https://ocean.edu.vn/Content/images/v2/logo.png?w=300" 
              alt="Ocean Edu Logo" 
              className="h-8 md:h-12 w-auto"
            />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={() => setShowGame(true)}
              className="bg-ocean-yellow animate-bounce hover:bg-orange-600 text-white font-black px-3 py-2 rounded-lg shadow-lg shadow-orange-500/20 transition-all uppercase tracking-wider text-[10px] flex items-center gap-1"
            >
              🎁 Box
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative w-10 h-10 flex items-center justify-center cursor-pointer" onClick={() => window.location.href = 'tel:0367434009'}>
              <div className="bg-blue-100 p-2 rounded-full text-ocean-blue hover:scale-110 transition-transform absolute w-full h-full flex items-center justify-center shadow-sm">
                <Phone size={18} fill="currentColor" />
              </div>
              <AnimatePresence>
                {notification && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-[50px] right-0 bg-ocean-yellow text-ocean-dark px-3 py-2 rounded-lg text-xs font-black shadow-xl border border-orange-200 z-[60] min-w-max pointer-events-none"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    HOTLINE TƯ VẤN MIỄN PHÍ!
                    <div className="absolute -top-1.5 right-3 w-3 h-3 bg-ocean-yellow rotate-45 border-l border-t border-orange-200"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="text-xs text-slate-500 hidden lg:block font-bold">
              27 Nguyễn Tất Thành, Tầng 4 Tòa nhà VIB
            </div>
            <button 
              onClick={() => setShowGame(true)}
              className="bg-ocean-yellow hover:bg-orange-600 text-white font-black px-6 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all uppercase tracking-wider text-xs flex items-center gap-2"
            >
              Hộp Quà May Mắn
            </button>
            <button 
              onClick={scrollToForm}
              className="bg-ocean-blue hover:bg-ocean-blue/90 text-white font-black px-6 py-2.5 rounded-xl shadow-lg shadow-ocean-blue/20 transition-all uppercase tracking-wider text-xs"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-ocean-light">
        <div className="container mx-auto px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              MÙA HÈ RỰC RỠ 2026
            </span>
            <h1 className="text-4xl md:text-[56px] leading-[1.1] font-display font-black text-ocean-dark mb-6">
              Khởi động mùa hè <br />
              <span className="text-ocean-yellow">Tiếng Anh tự tin</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
              Con được làm quen môi trường lớp học quốc tế, tương tác nhiều hơn và hình thành sự tự tin khi sử dụng tiếng Anh tự nhiên.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={scrollToForm}
                className="bg-ocean-blue hover:bg-ocean-blue/90 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-ocean-blue/30 transition-all flex items-center justify-center gap-3 uppercase tracking-wider text-sm"
              >
                Trải nghiệm 1 tháng miễn phí
                <ChevronRight size={18} />
              </button>
              <a 
                href="https://zalo.me/0367434009" 
                target="_blank"
                className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:border-ocean-blue transition-all flex items-center justify-center gap-2 shadow-sm text-sm uppercase tracking-wider"
              >
                Nhận tư vấn ngay
              </a>
            </div>

            {/* Featured Cards inside Hero */}
            <div className="grid grid-cols-2 gap-4 max-w-xl">
              {REASONS.map((reason, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm transition-all hover:shadow-md">
                  <div className="text-ocean-blue font-black text-xl mb-1">{reason.id}</div>
                  <h3 className="font-black text-ocean-dark text-xs mb-1 uppercase tracking-tight">{reason.title}</h3>
                  <p className="text-[10px] text-slate-500 leading-tight uppercase font-bold tracking-tighter">{reason.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex flex-col gap-6"
          >
            <div className="relative z-10 rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src={ASSETS.hero} 
                alt="Ocean Edu Summer" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
            
            <div className="bg-white p-4 rounded-3xl shadow-xl flex items-center gap-4 z-20 self-start md:self-auto w-full max-w-sm mx-auto">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Đội ngũ</div>
                <div className="text-sm md:text-base font-black text-ocean-dark">100% GV Nước Ngoài</div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-ocean-yellow rounded-[40px] -z-10 opacity-20"></div>
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-ocean-blue rounded-full -z-10 opacity-10 animate-float hidden md:block"></div>
          </motion.div>
        </div>
      </section>

      {/* Steps Visual Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="bg-ocean-dark py-12 relative overflow-hidden"
      >
        <div className="container mx-auto px-8 flex flex-col md:flex-row items-center gap-10 text-white relative z-10">
          <div className="text-sm font-black opacity-70 uppercase tracking-widest min-w-fit border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-10">
            3 Bước Nhận Ưu Đãi
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-ocean-yellow flex items-center justify-center text-xl font-black shrink-0 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                  {step.num}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black uppercase tracking-wider">{step.title}</span>
                  <span className="text-[11px] text-white/50 leading-tight">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0" stroke="white" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      </motion.section>

      {/* Programs (Ages) Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="py-16 md:py-20 bg-white relative"
      >
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-black text-ocean-dark mb-4">Lộ trình học chuẩn Quốc tế</h2>
              <p className="text-slate-500 text-lg">Mỗi độ tuổi đều có những nhu cầu và mục tiêu học tập khác nhau. Tại Ocean Edu, chúng tôi thấu hiểu và đáp ứng hoàn hảo.</p>
            </div>
            <div className="bg-ocean-light p-6 rounded-3xl border border-sky-100 hidden lg:block">
              <div className="text-3xl font-black text-ocean-blue">100%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cam kết chuẩn đầu ra</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <img 
                src={ASSETS.programs} 
                alt="Programs Overview" 
                className="w-full h-auto rounded-[32px] shadow-lg object-contain"
              />
            </div>
            <div className="order-1 lg:order-2 flex flex-col gap-6">
            {PROGRAM_AGES.map((prog, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-ocean-light border border-sky-100 p-8 rounded-[32px] hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center gap-6"
              >
                <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-white bg-ocean-blue transition-all group-hover:bg-ocean-yellow`}>
                  {prog.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-ocean-dark mb-2">{prog.name}</h3>
                  <span className="inline-block px-3 py-1 bg-white text-ocean-blue rounded-full text-[10px] font-black mb-2 border border-blue-100 uppercase tracking-widest group-hover:border-ocean-yellow group-hover:text-ocean-yellow transition-colors">{prog.age}</span>
                  <p className="text-slate-600 leading-relaxed text-sm">{prog.description}</p>
                </div>
                
                {/* Decorative ghost number */}
                <div className="absolute -bottom-6 -right-6 text-9xl font-black text-ocean-blue/5 pointer-events-none group-hover:text-ocean-yellow/10 transition-colors">
                  {idx + 1}
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="py-16 md:py-20 bg-slate-50"
      >
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-black text-ocean-dark mb-4">
                Học bổng & Bằng cấp
              </h2>
              <p className="text-slate-500 text-lg">Hàng ngàn học viên đã và đang đồng hành cùng hệ thống Ocean Edu toàn quốc với chất lượng đào tạo hàng đầu.</p>
            </div>
            <div className="hidden md:block">
              <div className="px-6 py-2 bg-ocean-yellow text-ocean-dark rounded-full text-sm font-black uppercase tracking-widest shadow-xl shadow-orange-500/10">
                Ghi nhận thành tựu
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="group relative overflow-hidden rounded-[32px] shadow-sm bg-white p-3 md:p-4 border border-slate-100 hover:shadow-xl transition-all">
              <img 
                src={ASSETS.certificate} 
                alt="Chứng chỉ Quốc tế" 
                className="w-full h-auto object-contain rounded-[20px] md:rounded-[24px] group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
              <div className="mt-6 mb-3 px-3 text-center">
                <span className="px-3 py-1 bg-sky-100 text-ocean-blue text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">Thành Tựu</span>
                <h3 className="text-ocean-dark text-xl font-display font-black leading-tight">Chất lượng chuẩn<br/>Quốc tế</h3>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[32px] shadow-sm bg-white p-3 md:p-4 border border-slate-100 hover:shadow-xl transition-all">
              <img 
                src={ASSETS.graduation} 
                alt="Lễ tốt nghiệp" 
                className="w-full h-auto object-contain rounded-[20px] md:rounded-[24px] group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
              <div className="mt-6 mb-3 px-3 text-center">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">Học Viên</span>
                <h3 className="text-ocean-dark text-xl font-display font-black leading-tight">Hành trình trải nghiệm<br/>tuyệt vời</h3>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-1 group relative overflow-hidden rounded-[32px] shadow-sm bg-white p-3 md:p-4 border border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
              <img 
                src={ASSETS.scholarship} 
                alt="Học bổng" 
                className="w-full h-auto object-contain rounded-[20px] md:rounded-[24px] group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
              <div className="mt-6 mb-3 px-3 text-center">
                <span className="px-3 py-1 bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">Ưu Đãi Tuyệt Vời</span>
                <h3 className="text-ocean-dark text-xl font-display font-black leading-tight">Chương trình học bổng<br/>năm học 2026</h3>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Registration Form Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        id="register-form" className="py-16 md:py-20 bg-ocean-light relative"
      >
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="bg-white rounded-[48px] shadow-2xl shadow-sky-900/10 overflow-hidden flex flex-col md:flex-row border border-sky-100">
            <div className="md:w-[45%] bg-ocean-dark p-10 md:p-14 text-white flex flex-col relative overflow-hidden">
              {/* Abstract decorative layer */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-ocean-blue rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                <span className="text-ocean-yellow text-[10px] font-black uppercase tracking-[0.2em] mb-4">Summer Special 2026</span>
                <h2 className="text-3xl md:text-4xl font-display font-black mb-8 leading-tight text-white">Suất trải nghiệm hè miễn phí có giới hạn</h2>
                <p className="text-slate-400 mb-10 leading-relaxed text-sm">
                  Thông tin phụ huynh gửi qua form sẽ được dùng để tư vấn chương trình học và xác nhận lịch trải nghiệm. Hoàn toàn bảo mật.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-ocean-yellow group-hover:bg-ocean-yellow group-hover:text-ocean-dark transition-all">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wide">Không cần thanh toán khi đăng ký</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-ocean-yellow group-hover:bg-ocean-yellow group-hover:text-ocean-dark transition-all">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wide">Hoàn toàn miễn phí 1 tháng học</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-ocean-yellow group-hover:bg-ocean-yellow group-hover:text-ocean-dark transition-all">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wide">Số lượng giới hạn 15 suất/tuần</span>
                  </div>
                </div>

                <div className="mt-auto pt-10 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Hệ thống đang hoạt động</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-[55%] p-10 md:p-14 bg-white">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="mb-10">
                      <h3 className="text-2xl font-black text-ocean-dark mb-2">Đăng ký tham gia</h3>
                      <div className="h-1 w-12 bg-ocean-yellow rounded-full"></div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Họ & Tên phụ huynh</label>
                          <input 
                            {...register("parentName", { required: true })}
                            className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border ${errors.parentName ? 'border-red-300' : 'border-slate-100'} focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-ocean-blue transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300`}
                            placeholder="Nguyễn Văn A"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Số điện thoại liên hệ</label>
                        <input 
                          {...register("phone", { required: true, pattern: /^[0-9]+$/ })}
                          className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border ${errors.phone ? 'border-red-300' : 'border-slate-100'} focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-ocean-blue transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300`}
                          placeholder="0xxx xxx xxx"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Họ & Tên học sinh</label>
                        <input 
                          {...register("studentName", { required: true })}
                          className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border ${errors.studentName ? 'border-red-300' : 'border-slate-100'} focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-ocean-blue transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300`}
                          placeholder="Nguyễn Văn B"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Trường học</label>
                          <input 
                            {...register("school", { required: true })}
                            className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border ${errors.school ? 'border-red-300' : 'border-slate-100'} focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-ocean-blue transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300`}
                            placeholder="Vd: TH Tô Hiệu"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Năm sinh</label>
                          <input 
                            type="date"
                            {...register("studentDOB", { required: true })}
                            className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border ${errors.studentDOB ? 'border-red-300' : 'border-slate-100'} focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-ocean-blue transition-all outline-none font-bold text-slate-700`}
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full ${isSubmitting ? 'bg-orange-300' : 'bg-ocean-yellow hover:bg-ocean-yellow/90 hover:translate-y-[-2px]'} text-ocean-dark py-5 rounded-2xl font-black text-lg shadow-xl shadow-orange-500/10 active:translate-y-[1px] transition-all flex items-center justify-center gap-3 uppercase tracking-widest`}
                      >
                        {isSubmitting ? "Đang gửi..." : "Xác nhận đăng ký học thử"}
                        {!isSubmitting && <ArrowRight size={20} />}
                      </button>
                      <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Bằng việc đăng ký, bạn đồng ý với các điều khoản bảo mật của Ocean Edu</p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-[32px] flex items-center justify-center mb-8 border border-green-100">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-ocean-dark mb-4">Gửi thông tin thành công!</h3>
                    <p className="text-slate-500 text-base mb-10 max-w-sm leading-relaxed">
                      Cảm ơn Phụ huynh đã tin tưởng. Tư vấn viên của Ocean Edu sẽ liên hệ trong ít phút nữa để xác nhận lịch học trải nghiệm cho con.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="px-8 py-3 rounded-xl border border-slate-200 text-slate-400 font-bold hover:bg-slate-50 transition-all text-xs uppercase tracking-widest"
                    >
                      Quay lại form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-ocean-dark text-white pt-16 pb-8">
        <div className="container mx-auto px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-full lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <img 
                src="https://ocean.edu.vn/Content/images/v2/logo.png?w=300" 
                alt="Ocean Edu Footer Logo" 
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 text-sm">
              Hệ thống Anh ngữ quốc tế Ocean Edu với hơn 150 chi nhánh trên toàn quốc, mang đến môi trường giáo dục chuẩn quốc tế ngay tại Đắk Lắk.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/Oceanedubmtcotam" target="_blank" className="w-12 h-12 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center hover:bg-ocean-blue hover:scale-110 transition-all text-white">
                <Facebook size={20} />
              </a>
              <a href="https://zalo.me/0367434009" target="_blank" className="w-12 h-12 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-500 hover:scale-110 transition-all">
                <span className="font-black text-white text-xs">ZALO</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-ocean-yellow uppercase tracking-[0.3em] mb-8">Địa chỉ liên hệ</h4>
            <div className="flex gap-4">
              <MapPin size={20} className="text-ocean-blue shrink-0" />
              <p className="text-slate-400 text-sm leading-relaxed">27 Nguyễn Tất Thành, tầng 4 tòa nhà VIB, TP. Buôn Ma Thuột, Đắk Lắk</p>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-ocean-yellow uppercase tracking-[0.3em] mb-8">Hotline hỗ trợ</h4>
            <div className="space-y-4">
              <a href="tel:0367434009" className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-ocean-blue group-hover:bg-ocean-blue group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <span className="text-2xl font-display font-black text-white group-hover:text-ocean-yellow transition-colors tracking-tighter">0367.434.009</span>
              </a>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] pl-14">Available 24/7</p>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-ocean-yellow uppercase tracking-[0.3em] mb-8">Email tương tác</h4>
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-ocean-blue group-hover:bg-ocean-blue group-hover:text-white transition-all">
                <Mail size={18} />
              </div>
              <a href="mailto:tam.bmt@ocean.edu.vn" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">tam.bmt@ocean.edu.vn</a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-8 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
          <p>© 2026 Ocean Edu Buôn Ma Thuột. Engineered for success.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>

      {/* Floating Hotline (Refined) */}
      {!showGame && (
        <div className="md:hidden fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-4">
          <div className="relative">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="tel:0367434009"
              className="w-14 h-14 bg-ocean-yellow text-ocean-dark rounded-full flex items-center justify-center shadow-lg relative z-[100]"
            >
              <Phone size={24} strokeWidth={3} />
            </motion.a>
            <AnimatePresence>
              {notification && (
                <motion.div 
                  initial={{ opacity: 0, x: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.95 }}
                  className="absolute top-1/2 right-[calc(100%+16px)] -translate-y-1/2 bg-ocean-yellow text-ocean-dark px-3 py-2 rounded-lg text-xs font-black shadow-xl border border-orange-200 z-[100] min-w-max pointer-events-none"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  TƯ VẤN MIỄN PHÍ
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-ocean-yellow rotate-45 border-r border-t border-orange-200"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://zalo.me/0367434009"
            target="_blank"
            className="w-14 h-14 bg-white border border-blue-100 rounded-full flex items-center justify-center shadow-lg p-3 z-[100]"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" className="w-[85%] h-[85%] object-contain" />
          </motion.a>
        </div>
      )}
    </div>
  );
}

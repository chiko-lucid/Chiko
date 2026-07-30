import { ArtistProfile, FAQItem, PortfolioItem, ProcessStep, ReviewItem, ServiceItem } from '../types';

import heroArtworkImg from '../assets/images/hero_artwork_1785400284201.jpg';
import vtuberArtworkImg from '../assets/images/vtuber_artwork_1785400296343.jpg';
import gameKeyArtImg from '../assets/images/game_key_art_1785400308674.jpg'; // wait, let's double check the exact filename for game_key_art

export const initialArtistProfile: ArtistProfile = {
  name: '치코 (Chiko)',
  role: 'Character Illustrator & Live2D Designer',
  subtitle: '감정과 서사를 담은 캐릭터를 그립니다.',
  bioLines: [
    '안녕하세요! 캐릭터 디자인과 일러스트레이션을 전적으로 진행하는 프리랜서 일러스트레이터 치코(Chiko)입니다.',
    '트렌디한 색감, 몰입감 넘치는 매력적인 캐릭터성, 섬세한 빛과 그림자 레이어링을 가장 중요하게 생각합니다.',
    '게임 키비주얼, 버튜버 모형 파츠 분리, 굿즈 아트, SNS 홍보 일러스트 등 다양한 매체의 성공적인 서브컬쳐 프로젝트 경험을 보유하고 있습니다.'
  ],
  experienceYears: 5,
  completedCommissions: 120,
  repeatClientRate: 30,
  satisfactionRate: 98,
  status: 'AVAILABLE',
  responseTime: '24시간 이내',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  skills: [
    { name: 'Photoshop', level: 'Master', category: 'Tool' },
    { name: 'Clip Studio Paint', level: 'Master', category: 'Tool' },
    { name: 'Illustrator', level: 'Advanced', category: 'Tool' },
    { name: 'Live2D PSD (파츠분리)', level: 'Expert', category: 'Speciality' },
    { name: 'Spine 2D Ready', level: 'Intermediate', category: 'Speciality' },
    { name: 'Character Concept Design', level: 'Master', category: 'Design' }
  ],
  commercialScopes: [
    '게임 키비주얼 & 카드 일러스트',
    '버추얼 유튜버 (VTuber) 파츠 분리',
    '굿즈 & 패키지 디자인 일러스트',
    '웹소설 표지 & 삽화',
    'SNS 마케팅 & 홍보용 캐릭터'
  ],
  socialLinks: {
    twitter: 'https://x.com',
    pixiv: 'https://pixiv.net',
    instagram: 'https://instagram.com',
    artstation: 'https://artstation.com',
    behance: 'https://behance.net',
    youtube: 'https://youtube.com',
    twitch: 'https://twitch.tv',
    github: 'https://github.com',
    openKakao: 'https://open.kakao.com',
    email: 'chiko.illust@example.com',
    googleForm: 'https://forms.google.com',
    discord: 'Chiko_Illust#0001'
  }
};

export const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 'work-1',
    title: 'Cyber Fantasy Heroine - 루나리스',
    category: 'Commercial',
    imageUrl: heroArtworkImg,
    images: [
      heroArtworkImg,
      vtuberArtworkImg,
      gameKeyArtImg
    ],
    isBestWork: true,
    tags: ['게임 키비주얼', '대표작', '사이버펑크'],
    year: '2025',
    client: 'A Studio (모바일 RPG)',
    tools: ['Clip Studio Paint', 'Photoshop'],
    duration: '3주',
    purpose: '신작 서브컬쳐 RPG 메인 타이틀 키비주얼',
    description: '미래형 판타지 세계관의 영웅 캐릭터 루나리스의 메인 카드 및 키비주얼 일러스트. 섬세한 사이버네틱 리본 레이어와 차분하면서도 발광하는 광원 효과를 연출하였습니다.'
  },
  {
    id: 'work-2',
    title: 'Starlight VTuber Model Sheet - 시엘',
    category: 'Live2D',
    imageUrl: vtuberArtworkImg,
    images: [
      vtuberArtworkImg,
      heroArtworkImg
    ],
    isBestWork: true,
    tags: ['Live2D', '버튜버', '파츠분리'],
    year: '2025',
    client: '개인 스트리머 C 님',
    tools: ['Photoshop', 'Live2D Cubism'],
    duration: '4주',
    purpose: '버추얼 라이브 방송용 PSD 파츠 분리 일러스트',
    description: '고딕 로리타 감성의 버추얼 스트리머 시엘의 가동용 원화. 헤어, 눈동자, 제스처, 드레스 장식 등 총 180여 개의 정교한 모션 레이어 분리를 완료하였습니다.'
  },
  {
    id: 'work-3',
    title: 'Celestial Mage - 별빛 소환사',
    category: 'Original',
    imageUrl: gameKeyArtImg,
    images: [
      gameKeyArtImg,
      heroArtworkImg,
      vtuberArtworkImg
    ],
    isBestWork: true,
    tags: ['오리지널', '판타지', '메인키아트'],
    year: '2025',
    client: '개인 아트북 프로젝트',
    tools: ['Clip Studio Paint'],
    duration: '2.5주',
    purpose: '개인 일러스트집 메인 인쇄 및 포스터 연출',
    description: '마법진에서 만개하는 별빛 꽃송이와 신비로운 마법사의 역동적인 순간을 담아낸 오리지널 아트워크. 극적인 카메라 앵글과 입체적 입자 효과가 특징입니다.'
  },
  {
    id: 'work-4',
    title: 'Chibi Cat Cafe - SD 컬렉션',
    category: 'Character Design',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    isBestWork: true,
    tags: ['SD 일러스트', '굿즈', '귀여운'],
    year: '2024',
    client: '고양이 카페 B 브랜드',
    tools: ['Clip Studio Paint'],
    duration: '1.5주',
    purpose: '카페 마스코트 아크릴 키링 및 스티커 팩 제작',
    description: '아기자기하고 실용적인 굿즈 스티커 및 텀블러 인쇄용 2등신 SD 캐릭터 시리즈. 파스텔 톤 컬러링으로 포근한 감성을 살렸습니다.'
  },
  {
    id: 'work-5',
    title: 'Neo Tokyo Knight - 팬아트',
    category: 'Fan Art',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    isBestWork: true,
    tags: ['팬아트', '네온', '일러스트'],
    year: '2024',
    client: '개인 팬아트',
    tools: ['Photoshop'],
    duration: '2주',
    purpose: 'SNS 헌정 아트웍 및 장패드 인쇄',
    description: '좋아하는 캐릭터의 사이버펑크 버전 2차 창작 아트워크. 강렬한 네온 보라와 민트 색상 대비를 강조하였습니다.'
  },
  {
    id: 'work-6',
    title: 'Spring Blossom Festival - 패키지 배너',
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    isBestWork: true,
    tags: ['상업일러스트', '광고', '봄시즌'],
    year: '2025',
    client: 'D 화장품 브랜드',
    tools: ['Photoshop', 'Illustrator'],
    duration: '2주',
    purpose: '봄 시즌 컬래버레이션 화장품 패키지 일러스트',
    description: '봄날 벚꽃 휘날리는 화사한 햇살 아래 소녀 캐릭터가 들어간 코스메틱 한정판 상자 및 온라인 메인 배너 이미지입니다.'
  },
  {
    id: 'work-7',
    title: 'Crystal Dragon Princess - 소설 표지',
    category: 'Original',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    isBestWork: false,
    tags: ['웹소설 표지', '판타지', '드레스'],
    year: '2024',
    client: 'E 출판사',
    tools: ['Clip Studio Paint'],
    duration: '3주',
    purpose: '웹소설 웹진 메인 표지 타이틀 아트',
    description: '크리스탈 장식과 용의 비늘 질감이 조화를 이루는 왕녀 캐릭터의 단독 표지 일러스트. 모바일 화면 타이포그래피 레이아웃과의 결합을 고려하여 구성되었습니다.'
  },
  {
    id: 'work-8',
    title: 'Gothic Lolita Maid - 캐릭터 시트',
    category: 'Character Design',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    isBestWork: false,
    tags: ['캐릭터디자인', '설정화', '시트'],
    year: '2024',
    client: '개인 의뢰',
    tools: ['Clip Studio Paint'],
    duration: '2주',
    purpose: '3D 모델링 제작용 전/후면 삼면도 캐릭터 시트',
    description: '고딕 메이드복 콘셉트의 전면, 후면, 측면 디테일 컷 및 표정 variation 5종을 한눈에 볼 수 있도록 정돈한 캐주얼 디자인 시트입니다.'
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: 'serv-1',
    number: '01',
    title: '캐릭터 일러스트',
    subtitle: 'Character Illustration',
    tags: ['게임 키비주얼', '버튜버 원화', '오리지널 캐릭터'],
    description: '감정 선이 느껴지는 고품질 인물 일러스트입니다. 배경 요소 포함 여부 및 구도에 맞춰 몰입도 높은 매력적인 작품을 제작합니다.',
    estimatedTime: '2 ~ 4주 소요',
    recommendedFor: ['모바일/PC 게임 메인 일러스트', '버추얼 스트리머 메인 비주얼', '앨범 자켓 및 기념 포스터'],
    startingPrice: '협의 가능 (문의 권장)'
  },
  {
    id: 'serv-2',
    number: '02',
    title: 'SD 일러스트',
    subtitle: 'Chibi & Cute Illustration',
    tags: ['굿즈용', '스티커 팩', '이모티콘'],
    description: '귀엽고 한눈에 들어오는 2~3등신 SD 캐릭터를 제작합니다. 실물 굿즈 제작 시 선명하게 표현되는 가독성 높은 라인과 깔끔한 채색 기법을 적용합니다.',
    estimatedTime: '1 ~ 2주 소요',
    recommendedFor: ['아크릴 키링/장패드/스티커 제작', '방송용 굿즈 및 구독콘', '트위치/유튜브 이모티콘'],
    startingPrice: '합리적 가격 구성'
  },
  {
    id: 'serv-3',
    number: '03',
    title: '디자인 & 키비주얼',
    subtitle: 'Graphics & Visual Design',
    tags: ['굿즈 패키지', 'SNS 배너', '타이틀 디자인'],
    description: '캐릭터 일러스트와 어울리는 그래픽 레이아웃, 웹 배너, 타이틀 로고, 소장용 굿즈 프레임 디자인을 종합적으로 디자인합니다.',
    estimatedTime: '1 ~ 2주 소요',
    recommendedFor: ['SNS 홍보용 이미지 템플릿', '이벤트/공모전 종합 메인 배너', '굿즈 박스 및 단상자 레이아웃'],
    startingPrice: '프로젝트 스케일별 맞춤'
  },
  {
    id: 'serv-4',
    number: '04',
    title: '상업 / 외주 일러스트',
    subtitle: 'Commercial Project',
    tags: ['게임 외주', '기업 서브컬쳐', '출판/광고'],
    description: '기업체 및 개발사를 위한 상업적 저작권 양도/이용권 일러스트입니다. 기한 준수, 정확한 Layer 관리, 빠른 피드백 반영을 보장합니다.',
    estimatedTime: '3 ~ 5주 (일정 맞춤 가능)',
    recommendedFor: ['게임 개발사 마케팅 일러스트', '출판사 소설 표지 및 삽화', '기업 프로젝트 캐릭터 홍보'],
    startingPrice: '견적서 및 계약서 발행'
  }
];

export const initialProcessSteps: ProcessStep[] = [
  {
    step: 1,
    title: '문의 및 상담',
    description: '의뢰 목적, 구도, 캐릭터 설정 자료, 희망 기한 및 예산을 바탕으로 세부 상담을 진행합니다.',
    duration: '1일',
    iconName: 'MessageSquareText'
  },
  {
    step: 2,
    title: '견적 산출 및 안내',
    description: '작업 난이도 및 상업적 사용 유무를 고려하여 명확한 작업 견적서와 세부 일정표를 산출하여 안내합니다.',
    duration: '1~2일',
    iconName: 'Calculator'
  },
  {
    step: 3,
    title: '입금 및 작업 확정',
    description: '결제 확인 후 공식 작업 일정에 등록하며, 명확한 가이드라인 체크리스트를 공유합니다.',
    duration: '1일',
    iconName: 'CreditCard'
  },
  {
    step: 4,
    title: '러프 스케치 및 컨펌',
    description: '구도, 인물 동작, 전체적인 컬러 톤을 확인할 수 있는 러프안을 전달드리며 이 단계에서 큰 수정이 이루어집니다.',
    duration: '5~7일',
    iconName: 'Palette'
  },
  {
    step: 5,
    title: '선화 / 채색 피드백',
    description: '디테일한 묘사 및 펜선, 1차 채색을 진행하며 색감 및 정교한 부분의 최종 2차 피드백을 수렴합니다.',
    duration: '5~7일',
    iconName: 'Sparkles'
  },
  {
    step: 6,
    title: '완성본 검수',
    description: '최종 디테일 보정, 빛 연출, 특수효과 레이어를 가미한 완성본 프리뷰를 전달합니다.',
    duration: '2~3일',
    iconName: 'CheckCircle2'
  },
  {
    step: 7,
    title: '최종 파일 납품',
    description: '고해상도 PNG, JPG 및 요청 시 레이어 분리 PSD (Live2D 파츠 포함)를 안전하게 배포합니다.',
    duration: '1일',
    iconName: 'Send'
  }
];

export const initialReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    clientName: '홍길동 디렉터',
    projectTitle: 'A 모바일 RPG 신작 개발사',
    rating: 5,
    comment: '수정 피드백 대응이 매우 빠르고 전문적이었습니다. 특히 캐릭터 특유의 조명 연출과 섬세한 인상 표현에 모든 팀원들이 대만족했습니다!',
    date: '2025. 05'
  },
  {
    id: 'rev-2',
    clientName: '시엘 PD 님',
    projectTitle: 'VTuber 프로젝트',
    rating: 5,
    comment: 'Live2D 모션 작가님께서 파츠 분리가 너무 깔끔해서 리깅 작업하기 정말 편했다고 극찬하셨어요! 다음 신의상 때도 꼭 다시 의뢰드릴게요.',
    date: '2025. 04'
  },
  {
    id: 'rev-3',
    clientName: '박서준 팀장',
    projectTitle: 'C 서브컬쳐 굿즈 브랜드',
    rating: 5,
    comment: '마감 기한보다 빠르게 전달해주셨을 뿐만 아니라, 아크릴 인쇄 시 색상이 튀지 않도록 CMYK 가이드까지 신경 써주셔서 신뢰도가 대단히 높았습니다.',
    date: '2025. 02'
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    category: '저작권 및 상업이용',
    question: '상업적 이용(방송용, 굿즈 판매, 게임 마케팅)이 가능한가요?',
    answer: '네, 가능합니다! 의뢰 신청 시 [상업용/방송용] 항목을 선택해주시면 해당 상업적 이용 권드가 포함된 견적을 안내해 드리며, 필요 시 정식 상업 이용 계약서 발급이 가능합니다.'
  },
  {
    id: 'faq-2',
    category: '피드백 및 수정',
    question: '작업 과정에서 피드백과 수정은 몇 번까지 가능한가요?',
    answer: '기본적으로 러프 단계에서 2회, 완성 전 채색 피드백 1회로 총 3회의 수정 피드백이 기본 제공됩니다. 작가의 단순 착오로 인한 수정은 제한 없이 무료 수정해 드립니다.'
  },
  {
    id: 'faq-3',
    category: '환불 및 취소',
    question: '환불 및 취소 규정은 어떻게 되나요?',
    answer: '작업 시작 전(러프 전달 전)에는 100% 전액 환불이 가능합니다. 러프 진행 후 취소 시 50% 환불, 완성 단계 진입 후에는 작업 특성상 환불이 불가하오니 신중한 의뢰 부탁드립니다.'
  },
  {
    id: 'faq-4',
    category: '파일 형태',
    question: 'PSD 레이어 분리 파일이나 고해상도 원본 제공이 가능한가요?',
    answer: '기본 납품은 300DPI 고해상도 PNG / JPG 파일입니다. Live2D 가동용 파츠 분리 PSD 또는 인쇄용 레이어 분리 원본 PSD가 필요하신 경우 옵션 선택을 통해 수령 가능합니다.'
  },
  {
    id: 'faq-5',
    category: '작업 기간',
    question: '평균 작업 기간과 당일/급송 제작도 가능한가요?',
    answer: '일반 일러스트의 경우 평균 2~3주가 소요됩니다. 급송 일정이 필요한 경우(1주일 이내) 일정에 따라 일정 비율의 작업 추가금이 발생할 수 있으니 사전 문의 부탁드립니다.'
  }
];

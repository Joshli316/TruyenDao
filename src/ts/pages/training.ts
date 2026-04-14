import { t, getLang } from '../i18n';
import { getRouteParam } from '../main';
import { renderFooter } from '../shared/footer';

/* =========================================
   Types
   ========================================= */

type BiStr = { en: string; vi: string };

interface QuizQuestion {
  question: BiStr;
  options: BiStr[];
  correctIndex: number;
}

interface ContentSection {
  heading: BiStr;
  body: BiStr;
}

interface TrainingModule {
  id: string;
  number: number;
  title: BiStr;
  description: BiStr;
  sections: ContentSection[];
  quiz: QuizQuestion[];
}

/* =========================================
   Constants
   ========================================= */

const STORAGE_KEY = 'truyendao-training-progress';

function loc(obj: BiStr): string {
  const lang = getLang();
  return obj[lang] || obj.en;
}

function loadProgress(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {};
}

function saveProgress(progress: Record<string, boolean>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/* =========================================
   Module Data
   ========================================= */

const MODULES: TrainingModule[] = [
  {
    id: 'vietnam-christian-story',
    number: 1,
    title: {
      en: "Understanding Vietnam's Christian Story",
      vi: 'Hiểu câu chuyện Kitô giáo Việt Nam'
    },
    description: {
      en: 'Condensed history from first contact to today — key facts, the chữ Quốc ngữ story, and the 8-10% context.',
      vi: 'Lịch sử cô đọng từ lần tiếp xúc đầu tiên đến nay — các sự kiện quan trọng, câu chuyện chữ Quốc ngữ, và bối cảnh 8-10%.'
    },
    sections: [
      {
        heading: {
          en: 'First Contact: 1533 and the Portuguese',
          vi: 'Tiếp xúc đầu tiên: 1533 và người Bồ Đào Nha'
        },
        body: {
          en: 'Christianity arrived in Vietnam in 1533 when Portuguese merchants and missionaries reached the coast. Unlike many Asian missions stories, this one is nearly 500 years old — predating the founding of the United States by over 200 years. The early Jesuit missionaries, including Francisco de Pina and Alexandre de Rhodes, did not merely preach — they learned Vietnamese with extraordinary dedication, eventually creating the romanized writing system that would become the national script.',
          vi: 'Kitô giáo đến Việt Nam năm 1533 khi các thương nhân và nhà truyền giáo Bồ Đào Nha đến bờ biển. Khác với nhiều câu chuyện truyền giáo ở châu Á, câu chuyện này đã gần 500 năm — có trước khi Hoa Kỳ lập quốc hơn 200 năm. Các nhà truyền giáo Dòng Tên đầu tiên, bao gồm Francisco de Pina và Alexandre de Rhodes, không chỉ rao giảng — họ học tiếng Việt với sự tận tụy phi thường, cuối cùng tạo ra hệ thống chữ viết Latin hóa trở thành quốc tự.'
        }
      },
      {
        heading: {
          en: 'The Chữ Quốc Ngữ Legacy',
          vi: 'Di sản chữ Quốc ngữ'
        },
        body: {
          en: 'Jesuit missionaries invented chữ Quốc ngữ — the romanized Vietnamese alphabet used by over 100 million people today. Alexandre de Rhodes published the first Vietnamese-Portuguese-Latin dictionary in 1651. Originally created to help missionaries learn Vietnamese and print catechisms, the script was later adopted by French colonial administrators and eventually by the Vietnamese government itself. Today, every Vietnamese person writes using a script created by Christian missionaries — yet most do not know this origin.',
          vi: 'Các nhà truyền giáo Dòng Tên đã sáng tạo chữ Quốc ngữ — bảng chữ cái Việt Nam Latin hóa được hơn 100 triệu người sử dụng ngày nay. Alexandre de Rhodes xuất bản từ điển Việt-Bồ-La đầu tiên năm 1651. Ban đầu được tạo ra để giúp các nhà truyền giáo học tiếng Việt và in kinh sách, chữ viết sau đó được chính quyền thuộc địa Pháp áp dụng và cuối cùng bởi chính phủ Việt Nam. Ngày nay, mọi người Việt Nam viết bằng chữ do các nhà truyền giáo Kitô giáo tạo ra — nhưng phần lớn không biết nguồn gốc này.'
        }
      },
      {
        heading: {
          en: 'Persecution and Growth',
          vi: 'Bách hại và phát triển'
        },
        body: {
          en: 'Vietnamese Christianity was forged in persecution. Emperors Minh Mạng, Thiệu Trị, and Tự Đức carried out systematic campaigns that killed tens of thousands of Vietnamese Christians. In 1988, Pope John Paul II canonized 117 Vietnamese Martyrs — the largest single-country canonization in Catholic history. This heritage of suffering and resilience shapes Vietnamese Christian identity to this day.',
          vi: 'Kitô giáo Việt Nam được tôi luyện trong bách hại. Các vua Minh Mạng, Thiệu Trị, và Tự Đức thực hiện các chiến dịch có hệ thống giết hại hàng chục nghìn tín hữu Việt Nam. Năm 1988, Giáo hoàng Gioan Phaolô II phong thánh cho 117 Thánh Tử Đạo Việt Nam — lần phong thánh đông nhất cho một quốc gia trong lịch sử Công giáo. Di sản đau khổ và kiên cường này định hình bản sắc Kitô giáo Việt Nam cho đến ngày nay.'
        }
      },
      {
        heading: {
          en: 'The 8-10% Context Today',
          vi: 'Bối cảnh 8-10% ngày nay'
        },
        body: {
          en: 'Today, 8-10% of Vietnam\'s population (approximately 8-10 million people) are Christian — about 7% Catholic and 1-3% Protestant. This makes Vietnam the most Christian country in mainland Southeast Asia after the Philippines. The church operates under a system of "controlled accommodation" — the government permits religious activity but requires registration, monitors leadership, and restricts proselytizing. Understanding this controlled environment is essential for anyone working with Vietnamese students.',
          vi: 'Ngày nay, 8-10% dân số Việt Nam (khoảng 8-10 triệu người) theo Kitô giáo — khoảng 7% Công giáo và 1-3% Tin Lành. Điều này khiến Việt Nam trở thành quốc gia có đông Kitô hữu nhất ở Đông Nam Á lục địa sau Philippines. Giáo hội hoạt động dưới hệ thống "hòa hợp có kiểm soát" — chính phủ cho phép hoạt động tôn giáo nhưng yêu cầu đăng ký, giám sát lãnh đạo, và hạn chế truyền đạo. Hiểu môi trường kiểm soát này là thiết yếu cho bất kỳ ai làm việc với sinh viên Việt Nam.'
        }
      }
    ],
    quiz: [
      {
        question: {
          en: 'What percentage of Vietnam is Christian?',
          vi: 'Bao nhiêu phần trăm dân số Việt Nam theo Kitô giáo?'
        },
        options: [
          { en: '8-10%', vi: '8-10%' },
          { en: '1-2%', vi: '1-2%' },
          { en: '15-20%', vi: '15-20%' },
          { en: '30%+', vi: '30%+' }
        ],
        correctIndex: 0
      },
      {
        question: {
          en: 'Who invented chữ Quốc ngữ?',
          vi: 'Ai đã sáng tạo ra chữ Quốc ngữ?'
        },
        options: [
          { en: 'Jesuit missionaries', vi: 'Các nhà truyền giáo Dòng Tên' },
          { en: 'French colonial officials', vi: 'Quan chức thuộc địa Pháp' },
          { en: 'Vietnamese scholars', vi: 'Học giả Việt Nam' },
          { en: 'Chinese monks', vi: 'Tu sĩ Trung Quốc' }
        ],
        correctIndex: 0
      },
      {
        question: {
          en: 'How many Vietnamese Martyrs were canonized in 1988?',
          vi: 'Bao nhiêu Thánh Tử Đạo Việt Nam được phong thánh năm 1988?'
        },
        options: [
          { en: '117', vi: '117' },
          { en: '26', vi: '26' },
          { en: '52', vi: '52' },
          { en: '200+', vi: '200+' }
        ],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'ancestor-worship',
    number: 2,
    title: {
      en: 'The Ancestor Worship Question',
      vi: 'Câu hỏi thờ cúng tổ tiên'
    },
    description: {
      en: 'The biggest cultural barrier — what it is, why it matters, how Vietnamese Christians navigate it, and what NOT to say.',
      vi: 'Rào cản văn hóa lớn nhất — nó là gì, tại sao quan trọng, cách Kitô hữu Việt Nam đối diện, và điều KHÔNG NÊN nói.'
    },
    sections: [
      {
        heading: {
          en: 'What Is Ancestor Veneration?',
          vi: 'Thờ cúng tổ tiên là gì?'
        },
        body: {
          en: 'Ancestor veneration (thờ cúng tổ tiên) is the most deeply rooted cultural practice in Vietnamese life. It is not merely a religious act — it is a social obligation, a family identity, and a moral duty. Most Vietnamese homes have an ancestral altar where families offer incense, food, and prayers to deceased relatives. Refusing to participate can be seen as rejecting your family, not just rejecting a religion. For a Vietnamese person considering Christianity, the question "Can I still honor my ancestors?" is often the single biggest barrier.',
          vi: 'Thờ cúng tổ tiên là tập tục văn hóa ăn sâu nhất trong đời sống Việt Nam. Đây không chỉ là hành vi tôn giáo — mà là nghĩa vụ xã hội, bản sắc gia đình, và bổn phận đạo đức. Hầu hết nhà người Việt có bàn thờ tổ tiên nơi gia đình dâng hương, thức ăn, và lời cầu nguyện cho người đã khuất. Từ chối tham gia có thể bị coi là từ bỏ gia đình, không chỉ từ bỏ tôn giáo. Với người Việt xem xét theo Kitô giáo, câu hỏi "Tôi có thể tiếp tục tôn kính tổ tiên không?" thường là rào cản lớn nhất.'
        }
      },
      {
        heading: {
          en: 'The Historical Rites Controversy',
          vi: 'Cuộc tranh luận nghi lễ trong lịch sử'
        },
        body: {
          en: 'This is not a new question. The "Chinese Rites Controversy" of the 17th-18th centuries divided the Catholic Church over whether Asian converts could honor ancestors. Early Jesuits like Matteo Ricci argued that ancestor rites were civil, not religious — and converts should be allowed to continue. The Vatican eventually banned the practice in 1742, creating a rift that slowed conversion across East Asia for centuries. This same tension — between cultural accommodation and theological purity — continues in Vietnamese churches today.',
          vi: 'Đây không phải câu hỏi mới. "Cuộc tranh luận Nghi lễ Trung Hoa" thế kỷ 17-18 chia rẽ Giáo hội Công giáo về việc liệu người cải đạo châu Á có thể tôn kính tổ tiên hay không. Các nhà truyền giáo Dòng Tên đầu tiên như Matteo Ricci lập luận nghi lễ tổ tiên mang tính dân sự, không phải tôn giáo — và người cải đạo nên được phép tiếp tục. Vatican cuối cùng cấm tập tục này năm 1742, tạo ra rạn nứt làm chậm sự cải đạo khắp Đông Á trong nhiều thế kỷ. Cùng sự căng thẳng giữa hòa hợp văn hóa và thuần khiết thần học — tiếp tục trong các nhà thờ Việt Nam ngày nay.'
        }
      },
      {
        heading: {
          en: 'How Vietnamese Christians Navigate It',
          vi: 'Cách Kitô hữu Việt Nam đối diện'
        },
        body: {
          en: 'Vietnamese Christians have developed several approaches: (1) Reframing — replacing the ancestral altar with a memorial table that displays photos and flowers without incense or food offerings; (2) Selective participation — attending family gatherings but not bowing to the altar or offering incense; (3) Active remembrance — organizing Christian memorial services on death anniversaries (ngày giỗ) that honor the deceased through prayers and shared meals; (4) Gradual education — slowly introducing family members to the Christian perspective rather than confronting practices head-on.',
          vi: 'Kitô hữu Việt Nam đã phát triển nhiều cách tiếp cận: (1) Tái định nghĩa — thay bàn thờ tổ tiên bằng bàn tưởng niệm trưng ảnh và hoa mà không có hương hay đồ cúng; (2) Tham gia có chọn lọc — dự họp mặt gia đình nhưng không lạy bàn thờ hay thắp hương; (3) Tưởng nhớ chủ động — tổ chức lễ tưởng niệm Kitô giáo vào ngày giỗ để tôn vinh người đã khuất qua lời cầu nguyện và bữa cơm chung; (4) Giáo dục dần dần — từ từ giới thiệu quan điểm Kitô giáo cho thành viên gia đình thay vì đối đầu trực tiếp.'
        }
      },
      {
        heading: {
          en: 'What NOT to Say',
          vi: 'Điều KHÔNG NÊN nói'
        },
        body: {
          en: 'Never tell a Vietnamese person that ancestor veneration is "idol worship" or "demonic." This dismisses their deepest family bonds and immediately closes the conversation. Do not compare it to pagan practices or suggest they must choose between their family and God. Instead, acknowledge the beauty of honoring elders, affirm the biblical command to honor parents, and explore how Christian faith can deepen — not destroy — family bonds. The goal is not to strip away culture but to transform it from within.',
          vi: 'Đừng bao giờ nói với người Việt rằng thờ cúng tổ tiên là "thờ thần tượng" hay "ma quỷ." Điều này phủ nhận mối liên kết gia đình sâu sắc nhất của họ và ngay lập tức đóng lại cuộc trò chuyện. Đừng so sánh với tập tục ngoại đạo hay gợi ý họ phải chọn giữa gia đình và Chúa. Thay vào đó, công nhận vẻ đẹp của việc tôn kính bậc trưởng bối, khẳng định mệnh lệnh Kinh Thánh phải hiếu kính cha mẹ, và khám phá cách đức tin Kitô giáo có thể làm sâu thêm — chứ không phá hủy — mối liên kết gia đình. Mục tiêu không phải bóc tách văn hóa mà biến đổi từ bên trong.'
        }
      }
    ],
    quiz: [
      {
        question: {
          en: 'What is the primary cultural barrier to conversion in Vietnam?',
          vi: 'Rào cản văn hóa chính cho việc cải đạo tại Việt Nam là gì?'
        },
        options: [
          { en: 'Ancestor veneration', vi: 'Thờ cúng tổ tiên' },
          { en: 'Language', vi: 'Ngôn ngữ' },
          { en: 'Government policy', vi: 'Chính sách chính phủ' },
          { en: 'Economic factors', vi: 'Yếu tố kinh tế' }
        ],
        correctIndex: 0
      },
      {
        question: {
          en: 'The Rites Controversy was about:',
          vi: 'Cuộc tranh luận Nghi lễ liên quan đến:'
        },
        options: [
          { en: 'Whether converts could honor ancestors', vi: 'Liệu người cải đạo có thể tôn kính tổ tiên' },
          { en: 'Bible translation', vi: 'Dịch Kinh Thánh' },
          { en: 'Church architecture', vi: 'Kiến trúc nhà thờ' },
          { en: 'Mission funding', vi: 'Tài trợ truyền giáo' }
        ],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'returnee-preparation',
    number: 3,
    title: {
      en: 'Preparing a Vietnamese Student to Return',
      vi: 'Chuẩn bị cho sinh viên Việt Nam trở về'
    },
    description: {
      en: 'The returnee pipeline: 6 months before, 1 month before, at departure, and 3 months after.',
      vi: 'Quy trình cho người trở về: 6 tháng trước, 1 tháng trước, khi khởi hành, và 3 tháng sau.'
    },
    sections: [
      {
        heading: {
          en: '6 Months Before Return: Building the Foundation',
          vi: '6 tháng trước khi trở về: Xây dựng nền tảng'
        },
        body: {
          en: 'The six-month mark is when preparation must begin — not at the airport. Key actions: (1) Connect the student with Vietnamese Christians who have already returned and maintained their faith; (2) Begin discussions about the ancestor worship question — this WILL come up with family; (3) Research churches in their home city together, including both registered and house churches; (4) Help them develop a personal devotional rhythm that does not depend on a weekly English-language service; (5) Start shifting their Bible reading to Vietnamese if they have been using English exclusively.',
          vi: 'Mốc sáu tháng là khi việc chuẩn bị phải bắt đầu — không phải ở sân bay. Các hành động chính: (1) Kết nối sinh viên với Kitô hữu Việt Nam đã trở về và duy trì đức tin; (2) Bắt đầu thảo luận về câu hỏi thờ cúng tổ tiên — điều này SẼ xảy ra với gia đình; (3) Cùng nhau tìm hiểu nhà thờ tại thành phố quê nhà, bao gồm cả nhà thờ đã đăng ký và nhà thờ tại gia; (4) Giúp họ phát triển nhịp sinh hoạt thuộc linh cá nhân không phụ thuộc vào buổi nhóm tiếng Anh hàng tuần; (5) Bắt đầu chuyển đổi việc đọc Kinh Thánh sang tiếng Việt nếu họ chỉ dùng tiếng Anh.'
        }
      },
      {
        heading: {
          en: '1 Month Before Return: Practical Handoff',
          vi: '1 tháng trước khi trở về: Bàn giao thực tế'
        },
        body: {
          en: 'With one month remaining, shift from spiritual formation to practical logistics: (1) Finalize a list of 2-3 churches to visit in their city — ideally with a contact person at each; (2) Set up a regular communication channel (messaging app, video call schedule) between the student and a ministry partner; (3) Prepare them for reverse culture shock — many returnees feel more "foreign" at home than they did abroad; (4) Have an honest conversation about faith attrition — 60-80% of returnees lose active faith practice within 2 years; (5) Create a "first 30 days" plan with specific action items for their first month back.',
          vi: 'Với một tháng còn lại, chuyển từ hình thành thuộc linh sang hậu cần thực tế: (1) Hoàn thiện danh sách 2-3 nhà thờ để thăm tại thành phố — lý tưởng là có người liên lạc tại mỗi nơi; (2) Thiết lập kênh liên lạc thường xuyên (ứng dụng nhắn tin, lịch gọi video) giữa sinh viên và đối tác mục vụ; (3) Chuẩn bị cho cú sốc văn hóa ngược — nhiều người trở về cảm thấy "xa lạ" ở nhà hơn khi ở nước ngoài; (4) Trò chuyện thành thật về tỷ lệ mất đức tin — 60-80% người trở về mất thực hành đức tin tích cực trong 2 năm; (5) Tạo kế hoạch "30 ngày đầu tiên" với các mục hành động cụ thể cho tháng đầu tiên trở về.'
        }
      },
      {
        heading: {
          en: 'At Departure: The Sending',
          vi: 'Khi khởi hành: Lễ tiễn'
        },
        body: {
          en: 'The departure moment matters more than most volunteers realize. Consider: (1) A commissioning prayer with their small group or fellowship — this gives spiritual gravity to the transition; (2) A physical care package with Vietnamese-language devotionals, a study Bible, and any resources from their time in your ministry; (3) A letter from their mentor or small group — something they can re-read on hard days; (4) Exchange contact information with their family if appropriate — this can open doors for follow-up that the student alone cannot.',
          vi: 'Khoảnh khắc chia tay quan trọng hơn hầu hết tình nguyện viên nhận ra. Cân nhắc: (1) Lời cầu nguyện ủy thác với nhóm nhỏ hoặc hội thánh — tạo sức nặng thuộc linh cho sự chuyển tiếp; (2) Gói quà với sách tĩnh nguyện tiếng Việt, Kinh Thánh nghiên cứu, và tài liệu từ thời gian phục vụ; (3) Thư từ người cố vấn hoặc nhóm nhỏ — điều họ có thể đọc lại trong những ngày khó khăn; (4) Trao đổi thông tin liên lạc với gia đình nếu phù hợp — điều này có thể mở cánh cửa cho việc theo dõi mà sinh viên một mình không thể.'
        }
      },
      {
        heading: {
          en: '3 Months After: The Critical Window',
          vi: '3 tháng sau: Giai đoạn then chốt'
        },
        body: {
          en: 'The first three months back in Vietnam are when most faith attrition happens. Your role shifts to remote support: (1) Weekly check-ins for the first month, then biweekly — consistency matters more than length; (2) Ask specifically "Have you found a church yet?" and "Have you gone more than once?" — vague spiritual questions get vague answers; (3) Be prepared for discouraging updates — family pressure, no suitable church, loneliness; (4) Connect them with other returnees in their city if possible — peer support is the strongest retention factor; (5) Celebrate small wins — attending one service, having one spiritual conversation with a family member.',
          vi: 'Ba tháng đầu tiên trở lại Việt Nam là khi phần lớn sự mất đức tin xảy ra. Vai trò của bạn chuyển sang hỗ trợ từ xa: (1) Kiểm tra hàng tuần trong tháng đầu, sau đó hai tuần một lần — sự nhất quán quan trọng hơn thời lượng; (2) Hỏi cụ thể "Bạn đã tìm được nhà thờ chưa?" và "Bạn đã đi hơn một lần chưa?" — câu hỏi thuộc linh mơ hồ nhận được câu trả lời mơ hồ; (3) Chuẩn bị cho tin tức không vui — áp lực gia đình, không có nhà thờ phù hợp, cô đơn; (4) Kết nối họ với người trở về khác trong thành phố nếu có thể — hỗ trợ đồng trang lứa là yếu tố giữ đức tin mạnh nhất; (5) Ăn mừng chiến thắng nhỏ — dự một buổi nhóm, có một cuộc trò chuyện thuộc linh với thành viên gia đình.'
        }
      }
    ],
    quiz: [
      {
        question: {
          en: 'What is the estimated faith attrition rate for Vietnamese returnees?',
          vi: 'Tỷ lệ mất đức tin ước tính cho người Việt Nam trở về là bao nhiêu?'
        },
        options: [
          { en: '60-80%', vi: '60-80%' },
          { en: '10-20%', vi: '10-20%' },
          { en: '30-40%', vi: '30-40%' },
          { en: '90%+', vi: '90%+' }
        ],
        correctIndex: 0
      },
      {
        question: {
          en: 'When should returnee preparation begin?',
          vi: 'Khi nào nên bắt đầu chuẩn bị cho người trở về?'
        },
        options: [
          { en: '6 months before return', vi: '6 tháng trước khi trở về' },
          { en: 'At the airport', vi: 'Tại sân bay' },
          { en: '1 week before', vi: '1 tuần trước' },
          { en: 'After arrival', vi: 'Sau khi đến nơi' }
        ],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'registered-unregistered-churches',
    number: 4,
    title: {
      en: 'Registered vs. Unregistered Churches',
      vi: 'Nhà thờ đã đăng ký và chưa đăng ký'
    },
    description: {
      en: 'Vietnam-specific church navigation — what registration means, why some churches don\'t register, and how to advise students.',
      vi: 'Hướng dẫn nhà thờ đặc thù Việt Nam — đăng ký nghĩa là gì, tại sao một số nhà thờ không đăng ký, và cách tư vấn sinh viên.'
    },
    sections: [
      {
        heading: {
          en: 'What Registration Means in Vietnam',
          vi: 'Đăng ký có nghĩa gì tại Việt Nam'
        },
        body: {
          en: 'In Vietnam, religious organizations must register with the government to operate legally. Registration means the church is recognized by the state, can own property, conduct public worship, and train clergy — but it also means government oversight of leadership appointments, sermon content, and outreach activities. The Catholic Church and the Evangelical Church of Vietnam (South) are the two largest registered bodies. Registration is not optional — it is the law under the 2016 Law on Belief and Religion.',
          vi: 'Tại Việt Nam, các tổ chức tôn giáo phải đăng ký với chính phủ để hoạt động hợp pháp. Đăng ký nghĩa là nhà thờ được nhà nước công nhận, có thể sở hữu tài sản, tiến hành thờ phượng công khai, và đào tạo giáo sĩ — nhưng cũng có nghĩa là chính phủ giám sát việc bổ nhiệm lãnh đạo, nội dung bài giảng, và hoạt động truyền giáo. Giáo hội Công giáo và Hội Thánh Tin Lành Việt Nam (Miền Nam) là hai tổ chức đã đăng ký lớn nhất. Đăng ký không phải tùy chọn — đó là luật theo Luật Tín ngưỡng, Tôn giáo 2016.'
        }
      },
      {
        heading: {
          en: 'Why Some Churches Don\'t Register',
          vi: 'Tại sao một số nhà thờ không đăng ký'
        },
        body: {
          en: 'Some churches choose not to register for principled reasons: (1) Theological conviction — they believe the church should not be under government authority; (2) Ethnic minority communities (especially Hmong and Montagnard) in remote areas where registration is practically impossible or where local officials refuse to process applications; (3) House churches that prefer small, relational gatherings over institutional structures; (4) Some groups that have been denied registration due to government suspicion. Unregistered does not mean underground or illegal in practice — many operate openly, tolerated but technically outside the law.',
          vi: 'Một số nhà thờ chọn không đăng ký vì lý do nguyên tắc: (1) Xác tín thần học — họ tin nhà thờ không nên ở dưới quyền chính phủ; (2) Cộng đồng dân tộc thiểu số (đặc biệt H\'Mông và Montagnard) ở vùng sâu vùng xa nơi đăng ký gần như không thể hoặc quan chức địa phương từ chối xử lý đơn; (3) Nhà thờ tại gia ưu tiên nhóm nhỏ, quan hệ hơn cấu trúc thể chế; (4) Một số nhóm bị từ chối đăng ký do chính phủ nghi ngờ. Chưa đăng ký không có nghĩa là hoạt động ngầm hay bất hợp pháp trên thực tế — nhiều nhà thờ hoạt động công khai, được dung túng nhưng về mặt kỹ thuật nằm ngoài luật.'
        }
      },
      {
        heading: {
          en: 'Practical Differences for Returnees',
          vi: 'Khác biệt thực tế cho người trở về'
        },
        body: {
          en: 'For a returnee, the choice between registered and unregistered churches involves trade-offs: Registered churches offer stability, public worship spaces, and established programs — but may feel more formal and less community-oriented. Unregistered house churches often provide tighter community, more passionate worship, and deeper discipleship — but carry some legal risk and may be harder to find. Many returnees attend both: a registered church for Sunday worship and a house church small group during the week.',
          vi: 'Với người trở về, việc chọn giữa nhà thờ đã đăng ký và chưa đăng ký liên quan đến sự đánh đổi: Nhà thờ đã đăng ký cung cấp sự ổn định, không gian thờ phượng công khai, và chương trình thiết lập — nhưng có thể cảm thấy trang trọng hơn và ít hướng cộng đồng hơn. Nhà thờ tại gia chưa đăng ký thường cung cấp cộng đồng gắn bó hơn, thờ phượng nhiệt thành hơn, và môn đệ hóa sâu hơn — nhưng mang một số rủi ro pháp lý và có thể khó tìm hơn. Nhiều người trở về tham dự cả hai: nhà thờ đã đăng ký cho thờ phượng Chủ nhật và nhóm nhỏ nhà thờ tại gia trong tuần.'
        }
      },
      {
        heading: {
          en: 'How to Advise Students',
          vi: 'Cách tư vấn sinh viên'
        },
        body: {
          en: 'When advising a Vietnamese student about church choices: (1) Do NOT tell them to avoid registered churches — this shows ignorance of the context; (2) Do NOT push them toward unregistered churches for "authenticity" — this puts them at unnecessary risk; (3) DO help them understand both options and make their own informed choice; (4) DO emphasize that any church community is better than isolation; (5) DO connect them with Vietnamese Christians who can give on-the-ground guidance; (6) Remember that in different cities, the dynamics vary greatly — what works in Ho Chi Minh City may not work in the Central Highlands.',
          vi: 'Khi tư vấn sinh viên Việt Nam về lựa chọn nhà thờ: (1) ĐỪNG bảo họ tránh nhà thờ đã đăng ký — điều này cho thấy thiếu hiểu biết bối cảnh; (2) ĐỪNG đẩy họ đến nhà thờ chưa đăng ký vì "tính xác thực" — điều này đặt họ vào rủi ro không cần thiết; (3) HÃY giúp họ hiểu cả hai lựa chọn và tự đưa ra quyết định sáng suốt; (4) HÃY nhấn mạnh bất kỳ cộng đồng nhà thờ nào cũng tốt hơn sự cô lập; (5) HÃY kết nối họ với Kitô hữu Việt Nam có thể cho hướng dẫn tại chỗ; (6) Nhớ rằng ở các thành phố khác nhau, động lực rất khác — điều hiệu quả ở Thành phố Hồ Chí Minh có thể không hiệu quả ở Tây Nguyên.'
        }
      }
    ],
    quiz: [
      {
        question: {
          en: 'What does church "registration" mean in Vietnam?',
          vi: '"Đăng ký" nhà thờ có nghĩa gì tại Việt Nam?'
        },
        options: [
          { en: 'Government recognition and oversight', vi: 'Công nhận và giám sát của chính phủ' },
          { en: 'Tax exemption', vi: 'Miễn thuế' },
          { en: 'Building permit', vi: 'Giấy phép xây dựng' },
          { en: 'International affiliation', vi: 'Liên kết quốc tế' }
        ],
        correctIndex: 0
      }
    ]
  },
  {
    id: 'hmong-montagnard',
    number: 5,
    title: {
      en: 'The Hmong and Montagnard Story',
      vi: 'Câu chuyện H\'Mông và Montagnard'
    },
    description: {
      en: 'Ethnic minority context — Central Highlands conversions, ongoing persecution, and how to support.',
      vi: 'Bối cảnh dân tộc thiểu số — cải đạo ở Tây Nguyên, bách hại đang diễn ra, và cách hỗ trợ.'
    },
    sections: [
      {
        heading: {
          en: 'Who Are the Hmong and Montagnard?',
          vi: 'Người H\'Mông và Montagnard là ai?'
        },
        body: {
          en: 'Vietnam is not ethnically homogeneous. The Kinh (ethnic Vietnamese) make up about 85% of the population, but 53 officially recognized ethnic minorities live primarily in the mountainous regions. The Hmong (H\'Mông) inhabit the northern highlands, while the Montagnard (Degar) peoples — including the Jarai, Rade, Bahnar, and Koho — live in the Central Highlands. These communities have distinct languages, cultures, and histories of marginalization by the Kinh-dominated government.',
          vi: 'Việt Nam không đồng nhất về sắc tộc. Người Kinh chiếm khoảng 85% dân số, nhưng 53 dân tộc thiểu số được công nhận sống chủ yếu ở vùng miền núi. Người H\'Mông sinh sống ở vùng cao phía Bắc, trong khi các dân tộc Montagnard (Degar) — bao gồm Jarai, Rade, Bahnar, và Koho — sống ở Tây Nguyên. Các cộng đồng này có ngôn ngữ, văn hóa, và lịch sử bị thiệt thòi riêng biệt bởi chính phủ do người Kinh thống trị.'
        }
      },
      {
        heading: {
          en: 'The Massive Conversion Movement',
          vi: 'Phong trào cải đạo quy mô lớn'
        },
        body: {
          en: 'Starting in the 1980s-1990s, Christianity spread rapidly among Hmong and Montagnard communities — one of the largest conversion movements in modern Asian history. Estimates suggest 300,000-400,000 Hmong Christians and over 500,000 Montagnard Christians. Several factors drove this movement: (1) Radio broadcasts in local languages (especially FEBC); (2) Christianity offered dignity and identity to marginalized peoples; (3) Conversion provided community networks and mutual support; (4) The faith spread primarily through family and clan networks, not foreign missionaries.',
          vi: 'Bắt đầu từ thập niên 1980-1990, Kitô giáo lan rộng nhanh chóng trong cộng đồng H\'Mông và Montagnard — một trong những phong trào cải đạo lớn nhất trong lịch sử châu Á hiện đại. Ước tính có 300.000-400.000 Kitô hữu H\'Mông và hơn 500.000 Kitô hữu Montagnard. Nhiều yếu tố thúc đẩy phong trào: (1) Phát thanh bằng ngôn ngữ địa phương (đặc biệt FEBC); (2) Kitô giáo mang lại phẩm giá và bản sắc cho dân tộc bị thiệt thòi; (3) Cải đạo tạo mạng lưới cộng đồng và hỗ trợ lẫn nhau; (4) Đức tin lan truyền chủ yếu qua mạng lưới gia đình và dòng tộc, không phải nhà truyền giáo nước ngoài.'
        }
      },
      {
        heading: {
          en: 'Ongoing Persecution',
          vi: 'Bách hại đang diễn ra'
        },
        body: {
          en: 'The government views ethnic minority Christianity with deep suspicion, seeing it as linked to separatist movements and foreign influence. Documented persecution includes: forced renunciations of faith, destruction of churches and homes, land confiscation, denial of identity cards and government services, physical violence, and forced relocation. The severity varies by province and local officials — some areas are relatively tolerant while others maintain harsh crackdowns. International human rights organizations consistently document these abuses, but change has been slow.',
          vi: 'Chính phủ nhìn Kitô giáo dân tộc thiểu số với sự nghi ngờ sâu sắc, coi đó liên quan đến phong trào ly khai và ảnh hưởng nước ngoài. Bách hại được ghi nhận bao gồm: ép buộc từ bỏ đức tin, phá hủy nhà thờ và nhà ở, tịch thu đất đai, từ chối cấp chứng minh nhân dân và dịch vụ chính phủ, bạo lực thể xác, và tái định cư cưỡng bức. Mức độ nghiêm trọng khác nhau tùy tỉnh và quan chức địa phương — một số khu vực tương đối khoan dung trong khi nơi khác duy trì đàn áp khắc nghiệt. Các tổ chức nhân quyền quốc tế liên tục ghi nhận các vi phạm này, nhưng thay đổi rất chậm.'
        }
      },
      {
        heading: {
          en: 'How to Support',
          vi: 'Cách hỗ trợ'
        },
        body: {
          en: 'If you encounter Hmong or Montagnard Vietnamese students: (1) Recognize that their experience of Christianity in Vietnam is fundamentally different from Kinh Vietnamese Christians — do not treat them as one homogeneous group; (2) Be aware that they or their families may have faced persecution; asking them to share publicly about church in Vietnam could put relatives at risk; (3) Connect them with ethnic minority Christian fellowships if available — language and cultural affinity matter; (4) Understand that "returning home" for a Montagnard Christian may mean returning to active persecution, not just cultural adjustment; (5) Advocacy matters — supporting human rights organizations that document religious persecution in Vietnam can have real impact.',
          vi: 'Nếu bạn gặp sinh viên Việt Nam người H\'Mông hoặc Montagnard: (1) Nhận ra rằng trải nghiệm Kitô giáo của họ tại Việt Nam khác biệt cơ bản so với Kitô hữu người Kinh — đừng đối xử như một nhóm đồng nhất; (2) Nhận thức rằng họ hoặc gia đình có thể đã đối mặt bách hại; yêu cầu họ chia sẻ công khai về nhà thờ tại Việt Nam có thể đặt người thân vào rủi ro; (3) Kết nối họ với các hội thánh Kitô hữu dân tộc thiểu số nếu có — ngôn ngữ và tương đồng văn hóa quan trọng; (4) Hiểu rằng "trở về nhà" đối với Kitô hữu Montagnard có thể nghĩa là trở về với bách hại tích cực, không chỉ điều chỉnh văn hóa; (5) Vận động rất quan trọng — hỗ trợ các tổ chức nhân quyền ghi nhận bách hại tôn giáo tại Việt Nam có thể tạo tác động thực sự.'
        }
      }
    ],
    quiz: [
      {
        question: {
          en: 'Which ethnic groups in the Central Highlands have seen massive conversion?',
          vi: 'Dân tộc nào ở Tây Nguyên đã có cải đạo quy mô lớn?'
        },
        options: [
          { en: 'Hmong and Montagnard/Degar', vi: 'H\'Mông và Montagnard/Degar' },
          { en: 'Kinh and Cham', vi: 'Kinh và Chăm' },
          { en: 'Thai and Muong', vi: 'Thái và Mường' },
          { en: 'Khmer and Chinese', vi: 'Khmer và Hoa' }
        ],
        correctIndex: 0
      }
    ]
  }
];

/* =========================================
   Module Listing Page
   ========================================= */

export function renderTraining(): void {
  const app = document.getElementById('app');
  if (!app) return;

  const lang = getLang();
  const progress = loadProgress();

  const pageTitle: BiStr = {
    en: 'Volunteer Training',
    vi: 'Đào tạo tình nguyện viên'
  };
  const pageSubtitle: BiStr = {
    en: '5 modules for anyone serving Vietnamese students and returnees. Complete all modules to build cultural competency.',
    vi: '5 mô-đun dành cho mọi người phục vụ sinh viên và người trở về Việt Nam. Hoàn thành tất cả để xây dựng năng lực văn hóa.'
  };
  const completedCount = MODULES.filter(m => progress[m.id]).length;
  const progressLabel: BiStr = {
    en: `${completedCount} of ${MODULES.length} completed`,
    vi: `${completedCount} / ${MODULES.length} đã hoàn thành`
  };
  const startLabel: BiStr = { en: 'Start', vi: 'Bắt đầu' };
  const completedLabel: BiStr = { en: 'Completed', vi: 'Đã hoàn thành' };
  const reviewLabel: BiStr = { en: 'Review', vi: 'Xem lại' };
  const backLabel: BiStr = { en: '\u2190 Back to Tools', vi: '\u2190 Về Công cụ' };

  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl));">
      <a href="#/tools" class="back-link" style="display: inline-block; margin-bottom: var(--space-lg); color: var(--text-secondary); text-decoration: none; font-size: 14px;">${loc(backLabel)}</a>
      <div class="section-eyebrow">${loc({ en: 'Training', vi: 'Đào tạo' })}</div>
      <h1>${loc(pageTitle)}</h1>
      <p class="section-subtitle">${loc(pageSubtitle)}</p>
      <div class="gold-divider"></div>

      <div class="training-progress-bar" style="margin-bottom: var(--space-xl);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm);">
          <span style="font-family: var(--font-mono); font-size: 12px; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 0.05em;">${loc(progressLabel)}</span>
        </div>
        <div style="height: 4px; background: var(--border-default); border-radius: var(--radius-full); overflow: hidden;">
          <div style="height: 100%; width: ${(completedCount / MODULES.length) * 100}%; background: var(--success); border-radius: var(--radius-full); transition: width 0.3s ease;"></div>
        </div>
      </div>

      <div class="report-grid">
        ${MODULES.map(mod => {
          const isComplete = !!progress[mod.id];
          return `
            <a href="#/tools/training/${mod.id}" class="lacquer-card" style="text-decoration: none; display: flex; flex-direction: column; gap: var(--space-sm);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="card-number">${loc({ en: 'Module', vi: 'Mô-đun' })} ${mod.number}</div>
                ${isComplete ? `<span style="font-family: var(--font-mono); font-size: 11px; color: var(--success); display: flex; align-items: center; gap: 4px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ${loc(completedLabel)}
                </span>` : ''}
              </div>
              <div class="card-title">${loc(mod.title)}</div>
              <div class="card-desc">${loc(mod.description)}</div>
              <div style="margin-top: auto; padding-top: var(--space-md);">
                <span style="display: inline-block; padding: 6px 16px; border-radius: var(--radius-sm); font-size: 13px; font-family: var(--font-body); ${isComplete
                  ? 'background: rgba(122, 155, 110, 0.12); color: var(--success);'
                  : 'background: var(--accent-cinnabar-subtle); color: var(--accent-cinnabar-hover);'
                }">${isComplete ? loc(reviewLabel) : loc(startLabel)}</span>
              </div>
            </a>
          `;
        }).join('')}
      </div>
    </div>

    ${renderFooter()}
  `;
}

/* =========================================
   Individual Module Page
   ========================================= */

export function renderTrainingModule(): void {
  const app = document.getElementById('app');
  if (!app) return;

  const moduleId = getRouteParam('moduleId');
  const mod = MODULES.find(m => m.id === moduleId);

  if (!mod) {
    app.innerHTML = `
      <div class="section" style="padding-top: calc(64px + var(--space-2xl)); text-align: center;">
        <h1>${loc({ en: 'Module not found', vi: 'Không tìm thấy mô-đun' })}</h1>
        <a href="#/tools/training" style="color: var(--accent-gold);">${loc({ en: '\u2190 Back to Training', vi: '\u2190 Về Đào tạo' })}</a>
      </div>
    `;
    return;
  }

  const lang = getLang();
  const progress = loadProgress();
  const isComplete = !!progress[mod.id];

  const backLabel: BiStr = { en: '\u2190 Back to Training', vi: '\u2190 Về Đào tạo' };
  const quizTitle: BiStr = { en: 'Knowledge Check', vi: 'Kiểm tra kiến thức' };
  const checkAnswers: BiStr = { en: 'Check Answers', vi: 'Kiểm tra đáp án' };
  const markComplete: BiStr = { en: 'Mark Complete', vi: 'Đánh dấu hoàn thành' };
  const markedComplete: BiStr = { en: 'Completed', vi: 'Đã hoàn thành' };
  const correctLabel: BiStr = { en: 'Correct!', vi: 'Đúng!' };
  const incorrectLabel: BiStr = { en: 'Incorrect', vi: 'Sai' };
  const selectAnswer: BiStr = { en: 'Please select an answer for all questions.', vi: 'Vui lòng chọn đáp án cho tất cả câu hỏi.' };

  app.innerHTML = `
    <div class="section" style="padding-top: calc(64px + var(--space-2xl)); max-width: 800px; margin: 0 auto;">
      <a href="#/tools/training" class="back-link" style="display: inline-block; margin-bottom: var(--space-lg); color: var(--text-secondary); text-decoration: none; font-size: 14px;">${loc(backLabel)}</a>

      <div class="section-eyebrow">${loc({ en: 'Module', vi: 'Mô-đun' })} ${mod.number}</div>
      <h1 style="font-family: var(--font-display); font-size: 32px; color: var(--text-primary); margin-bottom: var(--space-md);">${loc(mod.title)}</h1>
      <div class="gold-divider"></div>

      <div class="training-content" style="margin-top: var(--space-xl);">
        ${mod.sections.map(section => `
          <div class="training-section" style="margin-bottom: var(--space-xl);">
            <h2 style="font-family: var(--font-display); font-size: 22px; color: var(--accent-gold); margin-bottom: var(--space-md); line-height: 1.3;">${loc(section.heading)}</h2>
            <p style="font-size: 16px; color: var(--text-secondary); line-height: 1.8;">${loc(section.body)}</p>
          </div>
        `).join('')}
      </div>

      <div class="training-quiz" style="margin-top: var(--space-2xl); padding: var(--space-lg); background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-md);">
        <h2 style="font-family: var(--font-display); font-size: 22px; color: var(--accent-gold); margin-bottom: var(--space-lg);">${loc(quizTitle)}</h2>

        <form id="training-quiz-form">
          ${mod.quiz.map((q, qi) => `
            <div class="quiz-question" data-question="${qi}" style="margin-bottom: var(--space-xl); padding-bottom: var(--space-lg); ${qi < mod.quiz.length - 1 ? 'border-bottom: 1px solid var(--border-subtle);' : ''}">
              <p style="font-size: 16px; color: var(--text-primary); font-weight: 600; margin-bottom: var(--space-md);">${qi + 1}. ${loc(q.question)}</p>
              <div class="quiz-options" style="display: flex; flex-direction: column; gap: var(--space-sm);">
                ${q.options.map((opt, oi) => `
                  <label class="quiz-option" data-question="${qi}" data-option="${oi}" style="display: flex; align-items: center; gap: var(--space-sm); padding: 10px var(--space-md); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); cursor: pointer; transition: border-color 0.2s, background 0.2s; font-size: 15px; color: var(--text-secondary);">
                    <input type="radio" name="q${qi}" value="${oi}" style="accent-color: var(--accent-cinnabar); width: 16px; height: 16px; flex-shrink: 0;">
                    <span>${loc(opt)}</span>
                  </label>
                `).join('')}
              </div>
              <div class="quiz-feedback" id="feedback-${qi}" style="margin-top: var(--space-sm); font-size: 14px; font-weight: 600; display: none;"></div>
            </div>
          `).join('')}

          <div id="quiz-message" style="margin-bottom: var(--space-md); font-size: 14px; color: var(--error); display: none;"></div>

          <div style="display: flex; gap: var(--space-md); flex-wrap: wrap;">
            <button type="submit" id="check-answers-btn" style="padding: 10px 24px; background: var(--accent-cinnabar); color: var(--text-primary); border: none; border-radius: var(--radius-sm); font-size: 15px; font-family: var(--font-body); cursor: pointer; transition: background 0.2s;">
              ${loc(checkAnswers)}
            </button>
            <button type="button" id="mark-complete-btn" style="padding: 10px 24px; background: ${isComplete ? 'var(--success)' : 'var(--bg-elevated)'}; color: var(--text-primary); border: 1px solid ${isComplete ? 'var(--success)' : 'var(--border-default)'}; border-radius: var(--radius-sm); font-size: 15px; font-family: var(--font-body); cursor: pointer; transition: background 0.2s; display: flex; align-items: center; gap: 6px;">
              ${isComplete ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
              ${isComplete ? loc(markedComplete) : loc(markComplete)}
            </button>
          </div>
        </form>
      </div>

      <div style="margin-top: var(--space-xl); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-md);">
        ${mod.number > 1 ? `<a href="#/tools/training/${MODULES[mod.number - 2].id}" style="color: var(--text-secondary); text-decoration: none; font-size: 14px;">${loc({ en: '\u2190 Previous module', vi: '\u2190 Mô-đun trước' })}</a>` : '<span></span>'}
        ${mod.number < MODULES.length ? `<a href="#/tools/training/${MODULES[mod.number].id}" style="color: var(--accent-gold); text-decoration: none; font-size: 14px;">${loc({ en: 'Next module \u2192', vi: 'Mô-đun tiếp \u2192' })}</a>` : '<span></span>'}
      </div>
    </div>

    ${renderFooter()}
  `;

  // Attach quiz logic
  const form = document.getElementById('training-quiz-form') as HTMLFormElement;
  const checkBtn = document.getElementById('check-answers-btn') as HTMLButtonElement;
  const completeBtn = document.getElementById('mark-complete-btn') as HTMLButtonElement;
  const quizMessage = document.getElementById('quiz-message') as HTMLDivElement;

  // Hover states for quiz options
  document.querySelectorAll('.quiz-option').forEach(label => {
    label.addEventListener('mouseenter', () => {
      (label as HTMLElement).style.borderColor = 'var(--border-strong)';
      (label as HTMLElement).style.background = 'var(--bg-elevated)';
    });
    label.addEventListener('mouseleave', () => {
      const el = label as HTMLElement;
      // Only reset if not showing quiz results
      if (!el.dataset.checked) {
        el.style.borderColor = 'var(--border-subtle)';
        el.style.background = 'transparent';
      }
    });
  });

  // Check answers
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Verify all questions answered
    let allAnswered = true;
    for (let i = 0; i < mod.quiz.length; i++) {
      const selected = form.querySelector(`input[name="q${i}"]:checked`) as HTMLInputElement;
      if (!selected) {
        allAnswered = false;
        break;
      }
    }

    if (!allAnswered) {
      quizMessage.textContent = loc(selectAnswer);
      quizMessage.style.display = 'block';
      return;
    }

    quizMessage.style.display = 'none';

    // Grade each question
    mod.quiz.forEach((q, qi) => {
      const selected = form.querySelector(`input[name="q${qi}"]:checked`) as HTMLInputElement;
      const selectedIndex = parseInt(selected.value, 10);
      const isCorrect = selectedIndex === q.correctIndex;
      const feedback = document.getElementById(`feedback-${qi}`)!;

      feedback.style.display = 'block';
      if (isCorrect) {
        feedback.textContent = loc(correctLabel);
        feedback.style.color = 'var(--success)';
      } else {
        feedback.textContent = `${loc(incorrectLabel)} — ${loc(q.options[q.correctIndex])}`;
        feedback.style.color = 'var(--error)';
      }

      // Highlight options
      document.querySelectorAll(`.quiz-option[data-question="${qi}"]`).forEach(label => {
        const el = label as HTMLElement;
        const optIndex = parseInt(el.dataset.option || '0', 10);
        el.dataset.checked = 'true';

        if (optIndex === q.correctIndex) {
          el.style.borderColor = 'var(--success)';
          el.style.background = 'rgba(122, 155, 110, 0.1)';
          el.style.color = 'var(--success)';
        } else if (optIndex === selectedIndex && !isCorrect) {
          el.style.borderColor = 'var(--error)';
          el.style.background = 'rgba(155, 35, 53, 0.1)';
          el.style.color = 'var(--error)';
        }
      });
    });

    // Disable further changes
    form.querySelectorAll('input[type="radio"]').forEach(r => {
      (r as HTMLInputElement).disabled = true;
    });
    checkBtn.disabled = true;
    checkBtn.style.opacity = '0.5';
    checkBtn.style.cursor = 'default';
  });

  // Mark complete
  completeBtn.addEventListener('click', () => {
    const currentProgress = loadProgress();
    const nowComplete = !currentProgress[mod.id];
    currentProgress[mod.id] = nowComplete;
    saveProgress(currentProgress);

    if (nowComplete) {
      completeBtn.style.background = 'var(--success)';
      completeBtn.style.borderColor = 'var(--success)';
      completeBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> ${loc(markedComplete)}`;
    } else {
      completeBtn.style.background = 'var(--bg-elevated)';
      completeBtn.style.borderColor = 'var(--border-default)';
      completeBtn.innerHTML = loc(markComplete);
    }
  });

  // Hover states for buttons
  checkBtn.addEventListener('mouseenter', () => {
    if (!checkBtn.disabled) checkBtn.style.background = 'var(--accent-cinnabar-hover)';
  });
  checkBtn.addEventListener('mouseleave', () => {
    if (!checkBtn.disabled) checkBtn.style.background = 'var(--accent-cinnabar)';
  });
}

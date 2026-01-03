import { PrismaClient, JobType, JobCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const jobs = [
    // TECHNOLOGY - FULL_TIME
    {
      title: 'Frontend Developer',
      description: `Job Title: Frontend Developer\n\nCompany: Tech Innovators\nLocation: Kigali\n\nAbout the Role:\nWe are seeking a talented Frontend Developer to join our dynamic team. You will be responsible for designing, developing, and maintaining user interfaces for our web applications.\n\nKey Responsibilities:\n- Collaborate with designers and backend developers\n- Create seamless and visually appealing user experiences\n- Implement modern JavaScript frameworks and best practices\n\nRequirements:\n- Proven experience in frontend development\n- Proficiency in JavaScript, HTML, CSS\n- Experience with React, Angular, or Vue\n\nBenefits:\n- Competitive salary\n- Health insurance\n- Professional growth opportunities\n\nHow to Apply:\nApply online at https://techinnovators.com/apply`,
      company: 'Tech Innovators',
      location: 'Kigali',
      salary: '1200',
      applicationMethod: { url: 'https://techinnovators.com/apply' },
      jobType: JobType.FULL_TIME,
      category: JobCategory.TECHNOLOGY,
      createdAt: now,
      updatedAt: now,
    },
    // TECHNOLOGY - PART_TIME
    {
      title: 'UI/UX Designer',
      description: `Job Title: UI/UX Designer\n\nCompany: DesignHub\nLocation: Kigali\n\nAbout the Role:\nWe are looking for a creative UI/UX Designer to craft intuitive and engaging user experiences for our digital products.\n\nKey Responsibilities:\n- Conduct user research and usability testing\n- Create wireframes, prototypes, and high-fidelity designs\n- Collaborate with developers to implement designs\n\nRequirements:\n- Experience in UI/UX design\n- Proficiency with Figma, Sketch, or Adobe XD\n- Strong portfolio of design projects\n\nBenefits:\n- Flexible work hours\n- Creative work environment\n- Health benefits\n\nHow to Apply:\nApply online at https://designhub.com/apply`,
      company: 'DesignHub',
      location: 'Kigali',
      salary: '1300',
      applicationMethod: { url: 'https://designhub.com/apply' },
      jobType: JobType.PART_TIME,
      category: JobCategory.TECHNOLOGY,
      createdAt: now,
      updatedAt: now,
    },
    // HEALTHCARE - CONTRACT
    {
      title: 'Nurse',
      description: `Job Title: Nurse\n\nCompany: HealthCare Plus\nLocation: Kigali\n\nAbout the Role:\nWe are seeking a dedicated Nurse to provide compassionate patient care and support.\n\nKey Responsibilities:\n- Administer medications and monitor patient progress\n- Collaborate with doctors and healthcare professionals\n- Maintain patient records and ensure comfort\n\nRequirements:\n- Registered Nurse qualification\n- Excellent communication skills\n- Experience in a hospital or clinic setting\n\nBenefits:\n- Health insurance\n- Ongoing training\n- Supportive team environment\n\nHow to Apply:\nApply online at https://healthcareplus.com/apply`,
      company: 'HealthCare Plus',
      location: 'Kigali',
      salary: '1100',
      applicationMethod: { url: 'https://healthcareplus.com/apply' },
      jobType: JobType.CONTRACT,
      category: JobCategory.HEALTHCARE,
      createdAt: now,
      updatedAt: now,
    },
    // FINANCE - FULL_TIME
    {
      title: 'Accountant',
      description: `Job Title: Accountant\n\nCompany: Finance Experts\nLocation: Huye\n\nAbout the Role:\nFinance Experts is seeking an Accountant to manage our financial operations and reporting.\n\nKey Responsibilities:\n- Oversee financial transactions and prepare statements\n- Manage budgets and ensure regulatory compliance\n- Support financial planning and analysis\n\nRequirements:\n- Degree in Accounting or Finance\n- Experience with accounting software\n- Strong analytical skills\n\nBenefits:\n- Competitive salary\n- Health and wellness programs\n- Career advancement\n\nHow to Apply:\nApply online at https://financeexperts.com/apply`,
      company: 'Finance Experts',
      location: 'Huye',
      salary: '1700',
      applicationMethod: { url: 'https://financeexperts.com/apply' },
      jobType: JobType.FULL_TIME,
      category: JobCategory.FINANCE,
      createdAt: now,
      updatedAt: now,
    },
    // EDUCATION - INTERNSHIP
    {
      title: 'Teaching Intern',
      description: `Job Title: Teaching Intern\n\nCompany: EduWorld\nLocation: Musanze\n\nAbout the Role:\nJoin EduWorld as a Teaching Intern and gain hands-on experience in education.\n\nKey Responsibilities:\n- Assist lead teachers in lesson planning and delivery\n- Support classroom management\n- Help create a positive learning environment\n\nRequirements:\n- Interest in education\n- Good communication skills\n- Willingness to learn\n\nBenefits:\n- Internship stipend\n- Mentorship from experienced teachers\n- Certificate upon completion\n\nHow to Apply:\nApply online at https://eduworld.com/apply`,
      company: 'EduWorld',
      location: 'Musanze',
      salary: '500',
      applicationMethod: { url: 'https://eduworld.com/apply' },
      jobType: JobType.INTERNSHIP,
      category: JobCategory.EDUCATION,
      createdAt: now,
      updatedAt: now,
    },
    // MARKETING - REMOTE
    {
      title: 'Digital Marketer',
      description: `Job Title: Digital Marketer\n\nCompany: MarketGurus\nLocation: Remote\n\nAbout the Role:\nMarketGurus is hiring a Digital Marketer to drive our online presence and campaigns.\n\nKey Responsibilities:\n- Develop and execute digital marketing campaigns\n- Manage social media accounts\n- Analyze and report on campaign performance\n\nRequirements:\n- Experience in digital marketing\n- Knowledge of SEO and analytics tools\n- Creative and analytical mindset\n\nBenefits:\n- Remote work\n- Performance bonuses\n- Training opportunities\n\nHow to Apply:\nApply online at https://marketgurus.com/apply`,
      company: 'MarketGurus',
      location: 'Remote',
      salary: '1400',
      applicationMethod: { url: 'https://marketgurus.com/apply' },
      jobType: JobType.REMOTE,
      category: JobCategory.MARKETING,
      createdAt: now,
      updatedAt: now,
    },
    // SALES - HYBRID
    {
      title: 'Sales Representative',
      description: `Job Title: Sales Representative\n\nCompany: SalesForce\nLocation: Kigali/Remote\n\nAbout the Role:\nSalesForce is seeking a Sales Representative to expand our client base and drive sales.\n\nKey Responsibilities:\n- Identify and approach potential clients\n- Present products and negotiate contracts\n- Build and maintain customer relationships\n\nRequirements:\n- Experience in sales or customer service\n- Excellent communication and negotiation skills\n- Goal-oriented attitude\n\nBenefits:\n- Hybrid work model\n- Commission and bonuses\n- Career growth\n\nHow to Apply:\nApply online at https://salesforce.com/apply`,
      company: 'SalesForce',
      location: 'Kigali/Remote',
      salary: '1600',
      applicationMethod: { url: 'https://salesforce.com/apply' },
      jobType: JobType.HYBRID,
      category: JobCategory.SALES,
      createdAt: now,
      updatedAt: now,
    },
    // OTHER - PART_TIME
    {
      title: 'Content Writer',
      description: `Job Title: Content Writer\n\nCompany: WriteRight\nLocation: Nyagatare\n\nAbout the Role:\nWriteRight is looking for a Content Writer to create engaging written content for our platforms.\n\nKey Responsibilities:\n- Research industry topics\n- Write articles, blog posts, and marketing copy\n- Collaborate with editors and marketing teams\n\nRequirements:\n- Excellent writing and research skills\n- Experience in content creation\n- Familiarity with SEO best practices\n\nBenefits:\n- Flexible hours\n- Remote work options\n- Supportive team\n\nHow to Apply:\nApply online at https://writeright.com/apply`,
      company: 'WriteRight',
      location: 'Nyagatare',
      salary: '900',
      applicationMethod: { url: 'https://writeright.com/apply' },
      jobType: JobType.PART_TIME,
      category: JobCategory.OTHER,
      createdAt: now,
      updatedAt: now,
    },
    // TECHNOLOGY - CONTRACT
    {
      title: 'QA Tester',
      description: `Job Title: QA Tester\n\nCompany: QualityFirst\nLocation: Kigali\n\nAbout the Role:\nQualityFirst is seeking a QA Tester to ensure the quality and reliability of our software products.\n\nKey Responsibilities:\n- Design and execute test plans\n- Identify and document bugs\n- Collaborate with developers to resolve issues\n\nRequirements:\n- Experience in software testing\n- Attention to detail\n- Familiarity with testing tools\n\nBenefits:\n- Health insurance\n- Professional development\n- Friendly work environment\n\nHow to Apply:\nApply online at https://qualityfirst.com/apply`,
      company: 'QualityFirst',
      location: 'Kigali',
      salary: '1000',
      applicationMethod: { url: 'https://qualityfirst.com/apply' },
      jobType: JobType.CONTRACT,
      category: JobCategory.TECHNOLOGY,
      createdAt: now,
      updatedAt: now,
    },
    // TECHNOLOGY - REMOTE
    {
      title: 'Remote Backend Developer',
      description: `Job Title: Remote Backend Developer\n\nCompany: RemoteTech\nLocation: Remote\n\nAbout the Role:\nRemoteTech is hiring a Backend Developer to build and maintain scalable backend systems and APIs.\n\nKey Responsibilities:\n- Design, develop, and maintain backend systems\n- Ensure high performance, security, and reliability\n- Collaborate with a distributed team\n\nRequirements:\n- Experience in backend development\n- Proficiency in Node.js or similar\n- Strong problem-solving skills\n\nBenefits:\n- Fully remote\n- Flexible schedule\n- Competitive salary\n\nHow to Apply:\nApply online at https://remotetech.com/apply`,
      company: 'RemoteTech',
      location: 'Remote',
      salary: '1800',
      applicationMethod: { url: 'https://remotetech.com/apply' },
      jobType: JobType.REMOTE,
      category: JobCategory.TECHNOLOGY,
      createdAt: now,
      updatedAt: now,
    },
  ];

  for (const job of jobs) {
    await prisma.job.create({ data: job });
  }

  console.log('Seeded 10 jobs!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

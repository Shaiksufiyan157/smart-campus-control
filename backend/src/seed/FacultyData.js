import Faculty from "../models/faculty.model.js";
const FacultyData = [
  {
    "name": "Dr. Suvarna Nandyal",
    "email": "suvarnanandyal@pdaengg.com",
    "department": "Computer Science & Engineering",
    "facultyId": "CSE001",
    "qualification": [
      {
        "degree": "Ph.D. in Computer Science & Engg",
        "institution": "Jawaharlal Nehru Technological University, Hyderabad",
        "year_of_passing": 2013,
        
      },
      {
        "degree": "M.Tech (CSE)",
        "institution": "Visvesvaraya Technological University, Belgaum",
        "year_of_passing": 2003,
        
      },
      {
        "degree": "B.E. (CSE)",
        "institution": "Gulbarga University, Gulbarga",
        "year_of_passing": 1993,
        
      }
    ],
    "subjects": [
      "Cloud Computing",
      "Deep Learning",
      "Managing Big Data",
      "IoT",
      "Artificial Intelligence and Machine Learning",
      "Python Programming",
      "Java Programming"
    ],
    "achievements": [
      "Director, IQAC (Internal Quality Assurance Cell)",
      "Granted multiple patents including 'Automated system for theft detection' and 'Pandemic Prevention System'",
      "Published over 120 research papers",
      "Received Best Paper Award at International Conference on Computational Intelligence & Data Science"
    ]
  },
  {
    "name": "Dr. Amareshwari Patil",
    "email": "amreshwaripatil@pdaengg.com",
    "department": "Computer Science & Engineering",
    "facultyId": "CSE002",
    "qualification": [
      {
        "degree": "Ph.D in Cloud Computing",
        "institution": "VTU Belagavi",
        "year_of_passing": 2023,
        
      },
      {
        "degree": "M.Tech in Computer Science & Engineering",
        "institution": "VTU Belagavi",
        "year_of_passing": 2008,
        
      },
      {
        "degree": "B.E in Information Science & Engineering",
        "institution": "VTU Belagavi",
        "year_of_passing": 2003,
        
      }
    ],
    "subjects": [
      "C programming for problem solving",
      "Cloud Computing",
      "Machine Learning",
      "Software Engineering",
      "Object oriented programming",
      "Data Communication",
      "Internet of things"
    ],
    "achievements": [
      "Received Young Achiever Award 2020 for Best Journal",
      "Applied for patent on 'Dappaer irrigation system using solar panel'",
      "IEEE Committee member and session chair person"
    ]
  },
  {
    "name": "Dr. Sujata Terdal",
    "email": "sujataterdal@pdaengg.com",
    "department": "Computer Science and Engineering",
    "facultyId": "CSE003",
    "qualification": [
      {
        "degree": "Ph.D in Computer Science & Engineering",
        "institution": "Jawaharlal Nehru Technological University",
        "year_of_passing": 2014,
        
      },
      {
        "degree": "M.Tech in Computer Science & Engineering",
        "institution": "Visvesariah Technical University Belagavi",
        "year_of_passing": 2001,
        
      },
      {
        "degree": "B.E in Computer Science & Engineering",
        "institution": "Gulbarga University, Gulbarga",
        "year_of_passing": 1990,
        
      }
    ],
    "subjects": [
      "Machine Learning",
      "Data Science",
      "Cryptography and Network Security",
      "Wireless Mobile Networks",
      "Web Technology",
      "Operating Systems",
      "Mobile Application Development"
    ],
    "achievements": [
      "Head of Department and Programme Coordinator",
      "Dean Student Affairs",
      "Published 39 papers in International Journals",
      "Resource Person for FDP on Cyber Security and Forensics"
    ]
  },
  {
    "name": "Dr. Shailaja S",
    "email": "shailajas@pdaengg.com",
    "department": "Computer Science and Engineering",
    "facultyId": "CSE004",
    "qualification": [
      {
        "degree": "Ph.D in Computer Science and Engineering",
        "institution": "VTU Belagavi",
        "year_of_passing": 2020,
        
      },
      {
        "degree": "M.Tech in Computer Science and Engineering",
        "institution": "VTU Belagavi",
        "year_of_passing": 2009,
        
      },
      {
        "degree": "B.E in Computer Science and Engineering",
        "institution": "VTU Belagavi",
        "year_of_passing": 2005,
        
      }
    ],
    "subjects": [
      "Database Management Systems",
      "Operating System",
      "Computer Graphics",
      "Computer Networks",
      "Data Science",
      "Mobile Computing/Communication",
      "Cyber Security"
    ],
    "achievements": [
      "Published Patent: An Environment Friendly Life Saving System in Vehicle",
      "Published Patent: Android Document sharing system using Blockchain",
      "Published Patent: Smart Traffic Signal For Blind People Using IoT",
      "Program Coordinator and NBA Coordinator"
    ]
  },
  {
    "name": "Dr. Radha B. Kalaskar",
    "email": "radhabk@pdaengg.com",
    "department": "Computer Science and Engineering",
    "facultyId": "CSE005",
    "qualification": [
      {
        "degree": "Ph.D in Networking",
        "institution": "VTU, Belagavi",
        "year_of_passing": 2022,
        
      },
      {
        "degree": "M.Tech in Computer Science and Engineering",
        "institution": "JNTU, Hyderabad",
        "year_of_passing": 2013,
        
      },
      {
        "degree": "B.E in Computer Science and Engineering",
        "institution": "IEI, Kolkata",
        "year_of_passing": 2008,
        
      }
    ],
    "subjects": [
      "Wireless Sensor Networks",
      "Internet of Things",
      "Advanced Operating System",
      "Principles of Programming Using C",
      "Data Structures",
      "Analysis and Design of Algorithms",
      "Data Base Management Systems"
    ],
    "achievements": [
      "36 Years of total experience",
      "Published 22 research papers",
      "Resource Person for FDP on IoT and Big Data",
      "Vice-Principal (Administration) Jan 2024 - July 2024"
    ]
  },
  {
    "name": "Dr. Sayyada Fahmeeda Sultana",
    "email": "sayyadafahmeeda@pdaengg.com",
    "department": "Computer Science and Engineering",
    "facultyId": "CSE006",
    "qualification": [
      {
        "degree": "Ph.D in Multimedia Security",
        "institution": "Visvesvaraya Technological University",
        "year_of_passing": 2020,

      },
      {
        "degree": "M.Tech in Computer Science and Engineering",
        "institution": "Visvesvaraya Technological University",
        "year_of_passing": 2008,

      },
      {
        "degree": "B.E in Computer Science and Engineering",
        "institution": "Visvesvaraya Technological University",
        "year_of_passing": 2006,

      }
    ],
    "subjects": [
      "Big Data Analytics",
      "Computer Networks",
      "Operating Systems",
      "Data Structures",
      "Multimedia and Virtual Reality",
      "Machine Learning",
      "Database Management Systems"
    ],
    "achievements": [
      "NPTEL Star 2024",
      "Top Performing Mentor NPTEL 2019",
      "Program and NBA Coordinator of CSE Department",
      "IPR Coordinator of PDA College"
    ]
  },
  {
    "name": "Dr. Jayashree Agarkhed",
    "email": "jayashreeptl@pdaengg.com",
    "department": "Computer Science and Engineering",
    "facultyId": "CSE007",
    "qualification": [
      {
        "degree": "Ph.D. in Faculty of Electrical and Electronics Engineering",
        "institution": "Visvesvaraya Technological University Belagavi",
        "year_of_passing": 2013,

      },
      {
        "degree": "M.Tech in Computer Science and Engineering",
        "institution": "Visvesvaraya Technological University Belagavi",
        "year_of_passing": 2003,

      },
      {
        "degree": "B.E in Electronics & Instrumentation",
        "institution": "Gulbarga University Gulbarga",
        "year_of_passing": 1999,

      }
    ],
    "subjects": [
      "Artificial Intelligence",
      "Artificial Intelligence & Machine Learning",
      "Data Communication",
      "Advanced database Management System",
      "Advanced Data Structures and Algorithms"
    ],
    "achievements": [
      "Director Faculty Skill Development Center",
      "Published 201 research publications (Journals + Conferences)",
      "Fellow member of Institution of Engineers (IEI) and IETE",
      "Member of Board of Studies at multiple universities"
    ]
  },
  {
    "name": "Dr. Shridevi Soma",
    "email": "shridevisoma@pdaengg.com",
    "department": "Computer Science & Engineering",
    "facultyId": "CSE008",
    "qualification": [
      {
        "degree": "Ph.D. (CSE)",
        "institution": "Gulbarga University, Gulbarga",
        "year_of_passing": 2016,
        
      },
      {
        "degree": "M.Tech. in Computer Science & Engineering",
        "institution": "Visveswaraya Technological University, Belagavi",
        "year_of_passing": 2010,
       
      },
      {
        "degree": "B.E in Computer Science & Engineering",
        "institution": "Visveswaraya Technological University, Belagavi",
        "year_of_passing": 2002,
        
      }
    ],
    "subjects": [
      "Data Structures",
      "Software Engineering",
      "Database Management Systems",
      "Cloud Computing",
      "Machine Learning",
      "Internet of Things",
      "Digital Image Processing"
    ],
    "achievements": [
      "Received Grant of Rs.40 Lakhs from VGST for Cloud Computing Lab",
      "Dean Research & Development (2021-2023)",
      "Published 46 International Journal papers",
      "Additional Controller of Examination"
    ]
  },
  {
    "name": "Dr. Anuradha T",
    "email": "anuradhat@pdaengg.com",
    "department": "Computer Science and Engineering",
    "facultyId": "CSE009",
    "qualification": [
      {
        "degree": "Ph.D in Computer Networking",
        "institution": "Gulbarga University Kalaburagi",
        "year_of_passing": 2018,
       
      },
      {
        "degree": "M.Tech in Computer Science and Engineering",
        "institution": "Visvesvaraya Technological University, Belgaum",
        "year_of_passing": 2007,
        
      },
      {
        "degree": "B.E in Computer Science and Engineering",
        "institution": "Visvesvaraya Technological University, Belgaum",
        "year_of_passing": 2005,
       
      }
    ],
    "subjects": [
      "Problem Solving in C Programming",
      "Big Data Analytics",
      "Blockchain Technology",
      "Wireless Sensor Networks",
      "Mobile Application Development",
      "Machine Learning"
    ],
    "achievements": [
      "Published over 38 research papers",
      "Conducted multiple student training programs on Flutter, Design Thinking, and Image Processing",
      "BoS and BoE member of CSE Department"
    ]
  },
  {
    "name": "Dr. Anita Harsoor",
    "email": "anitaharsoor@pdaengg.com",
    "department": "Computer Science and Engineering",
    "facultyId": "CSE010",
    "qualification": [
      {
        "degree": "Ph.D in Digital Image Processing",
        "institution": "Gulbarga University, Gulbarga",
        "year_of_passing": 2016,
        
      },
      {
        "degree": "M.Tech in Information Technology",
        "institution": "Karnataka University, Mysore",
        "year_of_passing": 2010,
       
      },
      {
        "degree": "B.E in Computer Science and Engineering",
        "institution": "Allahabad University, Allhabad",
        "year_of_passing": 2007,
       
      }
    ],
    "subjects": [
      "Programming in C",
      "Data Structures",
      "Java and Advanced Java",
      "Python Programming",
      "Digital Image Processing",
      "Internet of Things",
      "Cloud Computing"
    ],
    "achievements": [
      "PG (CSE) Coordinator",
      "Published Patent: Design of Management Friendly Warehouse System",
      "Published Patent: IOT Based Smart Surgery Management System",
      "Published 28 research papers (Journals + Conferences)"
    ]
  }
]

// const seedFaculty=async(req,res)=>{
// try{
//   await Faculty.insertMany(FacultyData);
// const allfaculty=await Faculty.find({})
// res.json(allfaculty)
// }catch(e){
// console.log(e)
// res.send("not working")
// }
// }
export default FacultyData;
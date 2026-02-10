"use client";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Code,
  Github,
  Share,
  NotepadText,
  School,
  TerminalSquare,
  Rocket,
} from "lucide-react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const timer = () => {
      const time = new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
      setCurrentTime(time);
    };
    timer();
    const interval = setInterval(timer, 1000);
    return () => clearInterval(interval);
  }, []);
  const userPic = "./Favour-Omirin.jpg";
  const journey = [
    {
      workplace: "2Thirty Integrated Services",
      position: "Frontend Engineer (Internship)",
      duration: "January 2024 - June 2024",
      impact: [
        "Led frontend development initiatives by designing and implementing highly responsive, user-friendly interfaces that improved usability and ensured consistent performance across multiple screen sizes and devices.",
        "Developed, tested, and maintained scalable web applications using JavaScript, React, and TailwindCSS, focusing on clean component architecture, reusable UI patterns, and maintainable codebases.",
        "Converted design mockups and UI/UX specifications into fully functional web pages, ensuring pixel-perfect implementation, cross-browser compatibility, and adherence to modern web standards.",
        "Collaborated closely with backend developers to integrate APIs, optimize application performance, reduce load times, and deliver seamless end-to-end functionality across the platform.",
      ],
    },
    // {
    //   workplace: "",
    //   position: "",
    //   duration: "",
    //   impact: [],
    // },
  ];

  const languages = [
    {
      name: "JavaScript",
      img: "https://cdn.simpleicons.org/javascript/F7DF1E",
    },
    {
      name: "TypeScript",
      img: "https://cdn.simpleicons.org/typescript/3178C6",
    },
    {
      name: "GitHub",
      img: "https://cdn.simpleicons.org/github/FFFFFF",
    },
    {
      name: "Python",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "React",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "HTML5",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "Vue.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    },
    {
      name: "Next.js",
      img: "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
    },
    {
      name: "CSS3",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "Tailwind CSS",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Chakra UI",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chakraui/chakraui-original.svg",
    },
    {
      name: "Bootstrap",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    },
    {
      name: "Vite",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg",
    },
    {
      name: "Node.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express.js",
      img: "https://cdn.simpleicons.org/express/FFFFFF",
    },
    {
      name: "REST API",
      img: "https://cdn-icons-png.flaticon.com/512/2165/2165004.png",
    },
    {
      name: "MongoDB",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "Firebase",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    },
    {
      name: "Heroku",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
    },
    {
      name: "Render",
      img: "https://cdn.simpleicons.org/render/46E3B7",
    },
    {
      name: "Supabase",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    },
    {
      name: "Figma",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    // {
    //   name: "",
    //   img: "",
    // },
  ];

  const projects = [
    {
      name: "Scissors",
      stack: [
        "TypeScript",
        "Vue.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "REST API",
        "Firebase",
      ],
      about:
        "Scissors is a URL-shortening platform that allows users to generate short, custom URLs and corresponding QR codes. The platform is designed for simplicity and efficiency, making it easy to share shortened links on social media or other channels.",
      link: "https://app-scissors.netlify.app/",
      github: "https://github.com/Modred14/Scissors",
      img: "./scissors.png",
    },
    {
      name: "Valentine Web Generator",
      stack: [
        "Next.js",
        "React",
        "JavaScript",
        "Node.js",
        "Firebase",
        "Cloudinary",
        "Tailwind CSS",
        "Lucide React",
        "Resend",
      ],

      about:
        "Valentine Web Generator is a web platform for generating personalized Valentine pages with music, memories, and heartfelt messages — designed to help you surprise someone special.",
      link: "https://hehe-hmm.netlify.app/",
      github: "https://github.com/Modred14/val-app",
      img: "/val-app.png",
    },
    // {
    //   name: "",
    //   stack: ["", ""],
    //   about: "",
    //   link: "",
    //   github: "",
    //   img: "",
    // },
  ];
  const socials = [
    {
      link: "https://github.com/Modred14",
      icon: "https://cdn.simpleicons.org/github/FFFFFF",
      name: "GitHub",
    },
    {
      link: "mailto:favourdomirin@gmail.com",
      icon: "https://cdn.simpleicons.org/gmail/FFFFFF",
      name: "Email",
    },
    {
      link: "mailto:favourdomirin@gmail.com",
      icon: "https://cdn.simpleicons.org/whatsapp/FFFFFF",
      name: "WhatsApp",
    },
  ];
  const compliments = [
    {
      img: "./user.jpg",
      name: "Emmanuel",
      work: "CEO, 2ThirtyIX Integrated Services",
      message:
        '"He’s a fast learner and strong problem solver, thriving in a high-velocity team. I’d gladly work with him again and recommend him to any employer seeking quick, effective contributors."',
    },
    {
      img: "./avater-client.png",
      name: "David",
      work: "Client",
      message:
        '"Working with him was smooth and professional from start to finish. He understood my requirements quickly, communicated clearly, and delivered exactly what was promised on time."',
    },
    {
      img: "./avat.jpg",
      name: "John",
      work: "Backend Engineer, 2ThirtyIX Integrated Services",
      message:
        '"During our time working together, he consistently delivered clean, reliable frontend solutions and collaborated well with backend workflows. He asks the right questions and executes fast."',
    },
  ];

  const educations = [
    {
      img: "./oaul.png",
      name: "Obafemi Awolowo University",
      course: "BSc. Software Engineering",
      duration: "Oct 2024 - Jul 2029",
      about:
        "Studying core software engineering principles including programming, data structures, algorithms, databases, and software design. Actively building real-world projects with modern web technologies and focusing on practical problem-solving.",
      skills: ["Python", "Version Control", "API"],
      link: "https://oauife.edu.ng/",
    },
    {
      img: "./altschool.png",
      name: "AltSchool Africa",
      course: "Frontend Engineering",
      duration: "Sep 2023 - Aug 2024",
      about:
        "Graduated from AltSchool Africa with a perfect 4.0/4.0 CGPA, reflecting strong technical discipline, consistency, and a commitment to high-quality software engineering.",
      skills: [
        "TypeScript",
        "Version Control",
        "JavaScript",
        "React",
        "HTML5",
        "Vue.js",
        "Next.js",
        "CSS3",
      ],
      link: "https://altschoolafrica.com/",
    },
    // {
    //   img: "",
    //   name: "",
    //   course: "",
    //   duration: "",
    //   about:
    //     "",
    //          skills: [

    //   ],
    //   link: "",
    // },
  ];
  const getName = () => {
    const names = ["Favour Omirin", "Modred", "Favour"];
    const [index, setIndex] = useState(0);
    useState(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % names.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);
    return <span id="isname">{names[index]}</span>;
  };

  return (
    <div className="flex justify-center bg-black text-gray-100">
      <div className="w-full bg-black/50 backdrop-blur-2xl fixed z-100">
        <div className="grid grid-cols-2 items-center py-3 px-6 w-full ">
          <a href="#">
            <div className="flex gap-2 items-center">
              {" "}
              <img
                src={userPic}
                alt="Favour Omirin Image"
                loading="lazy"
                className="w-8 rounded-full"
              />
              <div>
                <p className="text-xl">Modred.dev</p>
              </div>
            </div>
          </a>
          <div className="flex justify-end font-serif">{currentTime}</div>
        </div>
      </div>

      <div className="md:max-w-250 sm:px-10 px-5 p-20">
        <div className="grid place-items-center">
          <div className="flex flex-col lg:gap-1 lg:flex-row ">
            <div className="grid lg:block place-items-center">
              <img
                src={userPic}
                alt="Favour Omirin Image"
                loading="lazy"
                className="lg:w-56.5 w-42 pb-4 rounded-full"
              />
              <div className="flex gap-10 pb-8 pt-4">
                {socials.map((social) => {
                  return (
                    <div className="">
                      <a href={social.link} target="_blank">
                        <img
                          src={social.icon}
                          alt={social.name}
                          className="w-8 hover:scale-120 transition-all duration-300"
                        />
                        {"  "}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full grid place-items-center lg:place-items-start lg:pl-7 ">
              <p className="justify-center text-4xl lg:text-6xl font-extrabold pb-3">
                I am {getName()}
              </p>
              <p className="justify-center text-center text-xl font-medium text-gray-400 pb-5">
                Software Engineer | Full Stack Developer
              </p>
              <p className="text-xl">
                Solution-driven software engineer with over 3 years of
                experience building scalable web, backend, and
                blockchain-powered applications. I primarily work with the MERN
                stack, turning ideas into real products, from full-stack
                platforms to automation tools, by solving practical problems and
                engineering systems that work in the real world. Passionate
                about tackling complex challenges and delivering impactful,
                production-ready solutions.
              </p>
            </div>
          </div>
        </div>
        <section id="journey">
          <div className="pt-14">
            <div className="flex">
              <div className="flex gap-4 mb-4 flex-2 items-center">
                <p className="border border-blue-400 text-blue-400 p-2 rounded-xl bg-blue-500/20">
                  <Briefcase />
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                  Professional Experience
                </p>
              </div>
            </div>
            <div
              className="bg-gradient-to-r from-black via-blue-400 to-black border-0"
              style={{ height: "1px" }}
            ></div>
          </div>{" "}
          <div className="pt-8">
            {journey.map((journeys) => {
              return (
                <>
                  <div className="pb-5">
                    <div className="lg:flex lg:justify-between">
                      <div>
                        <p className="font-bold text-2xl">
                          {journeys.workplace}
                        </p>
                        <p className="text-blue-400 lg:pb-5 pb-0 text-lg font-semibold">
                          {journeys.position}
                        </p>
                      </div>
                      <p className="text-gray-400 pt-2 pb-5">
                        {journeys.duration}
                      </p>
                    </div>
                    <div>
                      {journeys.impact.map((impacts) => {
                        return (
                          <div className="flex gap-3 text-lg">
                            <div className="text-blue-300">●</div>
                            {impacts}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </section>
        <section id="projects">
          <div className="pt-14">
            <div className="flex">
              <div className="flex gap-4 mb-4 flex-2 items-center">
                <p className="border border-blue-400 text-blue-400 p-2 rounded-xl bg-blue-500/20">
                  <Code />
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                  Featured Projects
                </p>
              </div>
            </div>
            <div
              className="bg-gradient-to-r from-black via-blue-400 to-black border-0"
              style={{ height: "0.5px" }}
            ></div>
          </div>{" "}
          <div className="pt-12 grid md:grid-cols-2 gap-8 items-stretch">
            {projects.map((project) => {
              return (
                <div>
                  <div className="h-full flex flex-col hover:scale-102 transition-all duration-500 bg-blue-950/20 rounded-2xl border border-blue-400/10">
                    <div className="w-full overflow-hidden">
                      <img
                        src={project.img}
                        alt={project.name}
                        className="w-full h-full object-cover rounded-t-2xl"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-2xl font-bold pb-3">{project.name}</p>
                      <div className="flex flex-wrap gap-2 w-full">
                        {project.stack.map((stacks) => {
                          return (
                            <div className="border p-1 px-1.5 rounded-md text-sm text-teal-300 bg-teal-400/20 border-teal-400/30">
                              {stacks}
                            </div>
                          );
                        })}
                        <div className="py-3">{project.about}</div>
                        <div className="mt-auto  items-end flex w-full justify-between">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400/90  text-sm flex gap-2 items-center"
                          >
                            <div className="duration-500 animate-bounce">
                              <Share size="15" />
                            </div>
                            <div>Live Demo</div>
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400/90 text-sm flex gap-1 items-center"
                          >
                            <div className="duration-500 animate-pulse">
                              <Github size="15" />
                            </div>
                            <div>GitHub</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              );
            })}
          </div>
        </section>
        <section id="technologies">
          <div className="pt-14">
            <div className="flex">
              <div className="flex gap-4 mb-4 flex-2 items-center">
                <p className="border border-blue-400 text-blue-400 p-2 rounded-xl bg-blue-500/20">
                  <TerminalSquare />
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                  Technologies
                </p>
              </div>
            </div>
            <div
              className="bg-gradient-to-r from-black via-blue-400 to-black border-0"
              style={{ height: "1.5px" }}
            ></div>
            <div className="grid pt-12 grid-cols-2 w-full md:grid-cols-6 gap-6">
              {languages.map((language) => {
                return (
                  <>
                    <div className="grid border border-blue-400/10 rounded-2xl bg-blue-950/20 p-7 justify-items-center hover:bg-blue-950/40 transition-all duration-250">
                      <img
                        src={language.img}
                        className="w-10"
                        alt={language.name}
                      />
                      <p className="text-xs pt-3">{language.name}</p>
                    </div>
                  </>
                );
              })}
            </div>{" "}
          </div>{" "}
        </section>
        <section id="education">
          <div className="pt-14">
            <div className="flex">
              <div className="flex gap-4 mb-4 flex-2 items-center">
                <p className="border border-blue-400 text-blue-400 p-2 rounded-xl bg-blue-500/20">
                  <School />
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                  Education
                </p>
              </div>
            </div>
            <div
              className="bg-gradient-to-r from-black via-blue-400 to-black border-0"
              style={{ height: "0.5px" }}
            ></div>
          </div>
          <div className="pt-12 grid md:grid-cols-2 gap-8 items-stretch">
            {educations.map((education) => {
              return (
                <div>
                  <div className="h-full flex flex-col hover:scale-102 transition-all duration-500 bg-blue-950/20 rounded-2xl border border-blue-400/10">
                    {" "}
                    <div className="p-5 pt-7">
                      <div className="flex flex-2 gap-3 items-center">
                        <div>
                          <img
                            src={education.img}
                            className="w-12 rounded-xl"
                            alt={education.name}
                          />
                        </div>
                        <div>
                          <p className="text-2xl font-semibold">
                            {education.name}
                          </p>
                          <p className="text-blue-400 pb-1 text-lg font-semibold">
                            {education.course}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {education.duration}
                      </p>
                      <div className="py-5">{education.about}</div>
                      <div className="flex">
                        <div className="flex flex-wrap gap-2 w-full">
                          {education.skills.map((skill) => {
                            return (
                              <div className="border p-1 px-1.5 rounded-md text-sm text-teal-300 bg-teal-400/20 border-teal-400/30">
                                {skill}
                              </div>
                            );
                          })}
                        </div>
                        <a
                          href={education.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400/90 items-end text-sm flex gap-2"
                        >
                          <div className="duration-500 animate-pulse">
                            <Share size="15" />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section id="reviews">
          <div className="pt-14">
            <div className="flex">
              <div className="flex gap-4 mb-4 flex-2 items-center">
                <p className="border border-blue-400 text-blue-400 p-2 rounded-xl bg-blue-500/20">
                  <NotepadText />
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                  Testimonials
                </p>
              </div>
            </div>
            <div
              className="bg-gradient-to-r from-black via-blue-400 to-black border-0"
              style={{ height: "1.0px" }}
            ></div>
          </div>
          <div className="pt-12 grid md:grid-cols-2 gap-8 items-stretch">
            {compliments.map((compliment) => {
              return (
                <div>
                  <div className="h-full flex flex-col hover:scale-102 transition-all duration-500 bg-blue-950/20 rounded-2xl border border-blue-400/10">
                    {" "}
                    <div className="p-5 pt-7">
                      <div className="flex flex-2 gap-5 items-center">
                        <div>
                          <img
                            src={compliment.img}
                            className="w-10 rounded-full"
                            alt={compliment.name}
                          />
                        </div>
                        <div>
                          {" "}
                          <p className="text-xl font-semibold pb-0.5">
                            {compliment.name}
                          </p>
                          <p className="text-sm">{compliment.work}</p>
                        </div>
                      </div>{" "}
                      <div className="pt-4">{compliment.message}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <div className="pt-14">
          <section className=" transition-all duration-500 bg-blue-950/20 border border-blue-400/10">
            <div className="pt-14">
              <div className="flex">
                <div className="flex gap-4 px-4 mb-4 flex-2 items-center justify-center">
                  <p className="border border-blue-400 text-blue-400 p-2 rounded-xl bg-blue-500/20">
                    <Rocket />
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                    Open to collaboration
                  </p>
                </div>
              </div>
              <div
                className="bg-gradient-to-r from-black via-blue-400 to-black border-0"
                style={{ height: "1.0px" }}
              ></div>
            </div>
            <div className="pt-8 px-10 lg:px-20 flex text-center text-xl">
              Ready to bring your ideas to life? I'm always excited to
              collaborate on innovative projects and help transform your vision
              into reality.
            </div>
            <div className="flex gap-10 justify-center pb-18 pt-7">
              {socials.map((social) => {
                return (
                  <div className="">
                    <a href={social.link} target="_blank">
                      <img
                        src={social.icon}
                        alt={social.name}
                        className="w-8 hover:scale-120 transition-all duration-300"
                      />
                      {"  "}
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

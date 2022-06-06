import Head from "next/head";
import Image from "next/image";
import { IconType } from "react-icons";
import {
  SiGo,
  SiIntellijidea,
  SiJava,
  SiNeovim,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiTypescript,
  SiVisualstudiocode,
} from "react-icons/si";
import PageTitle from "../components/PageTitle";
import { albums } from "../data/music";
import avatar from "../public/images/avatar.jpg";

interface TechItemProps {
  name: string;
  Icon: IconType;
}

const TechItem: React.FC<TechItemProps> = ({ name, Icon }) => {
  return (
    <li className="gap-x-2 flex items-center">
      <Icon /> {name}
    </li>
  );
};

const About: React.FC = ({}) => {
  return (
    <>
      <Head>
        <title>About Me - Parsa Mesgarha</title>
      </Head>
      <div className="prose dark:prose-invert">
        <PageTitle name="About Me" />
        <div className="relative sm:flex sm:flex-row-reverse">
          <div className="mx-auto w-60 h-60 sm:w-full sm:h-full ">
            <Image className="rounded-full" src={avatar} alt="Parsa Mesgarha" />
          </div>
          <div className="prose dark:prose-invert mt-5 sm:mr-3 sm:mt-0">
            <p>
              If you&apos;re interested to learn more about me for some reason,
              here&apos;s a list of things that might paint a picture of the
              type of person I am.
            </p>
            <p>
              These things bring joy to my life, and there could be someone out
              there who has similar interests. If thats the case, feel free to
              reach out as I like meeting new people!
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-3 mt-8">Things I like</h2>
          <ul>
            <li>
              <a
                href="https://github.com/pzrsa?tab=stars"
                rel="prefetch noreferrer"
                target="_blank"
              >
                Open source projects
              </a>
              . It&apos;s fascinating that random people all over the internet
              are able to come together to change the world.
            </li>
            <li>
              Reading non-fiction and fiction books on my Kindle. Currently
              reading{" "}
              <a
                href="https://en.wikipedia.org/wiki/The_Obstacle_Is_the_Way"
                rel="prefetch noreferrer"
                target="_blank"
              >
                The Obstacle Is the Way
              </a>{" "}
              by Ryan Holiday.
            </li>
            <li>
              Mechanical keyboards. I love the fact that I could build something
              with parts tailored to my preference. I use a keyboard daily, so
              it makes sense for me to invest in tools that inspire me to use
              them more.
            </li>
            <li>
              Doing typing tests on{" "}
              <a
                href="https://monkeytype.com/"
                rel="prefetch noreferrer"
                target="_blank"
              >
                monkeytype
              </a>
              . I used to type with just 3 fingers, but now use 9 which has been
              a great decision despite the frustration in the beginning. My
              current personal record is{" "}
              <a
                href="/images/wpm.png"
                rel="prefetch noreferrer"
                target="_blank"
              >
                120wpm
              </a>
              .
            </li>
            <li>
              Mechanical watches and G-Shock&apos;s. I own a Seiko SNZG13K1 and
              a G-Shock GA-B2100-1A1, both of which I bought for under £100. I
              just love how minimal they are which makes me feel good wearing
              them.
            </li>
            <li>
              Vi keybinds, I can&apos;t live without them as it simply makes
              interacting with the computer a joy.
            </li>
            <li>
              Consuming informational content at 2x speed.{" "}
              <a
                href="https://chrome.google.com/webstore/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk?hl=en"
                rel="prefetch noreferrer"
                target="_blank"
              >
                Video Speed Controller
              </a>{" "}
              has completely changed the way I watch videos. I of course watch
              movies and shows at normal speed, I&apos;m not a psycho.
            </li>
            <li>
              Building things from scratch as opposed to buying it from the
              shelf. It&apos;s much more fulfilling to enjoy the journey. When
              something is built, it even has your own battle scars from making
              some mistakes.
            </li>
          </ul>
          <h2 className="text-2xl font-bold mb-3 mt-8">Technologies</h2>
          <ul className="not-prose gap-y-3 grid grid-cols-2 sm:grid-cols-3 justify-between">
            <TechItem name="TypeScript" Icon={SiTypescript} />
            <TechItem name="Node.js" Icon={SiNodedotjs} />
            <TechItem name="Next.js" Icon={SiNextdotjs} />
            <TechItem name="Go" Icon={SiGo} />
            <TechItem name="Java" Icon={SiJava} />
            <TechItem name="PostgreSQL" Icon={SiPostgresql} />
            <TechItem name="Neovim" Icon={SiNeovim} />
            <TechItem name="IntelliJ" Icon={SiIntellijidea} />
            <TechItem name="VSCode" Icon={SiVisualstudiocode} />
          </ul>
          <h2 className="text-2xl font-bold mb-3 mt-8">Setup</h2>
          <ul>
            <li>M1 MacBook Pro 13&quot;.</li>
            <li>
              <a
                href="https://youtu.be/RqktmDE-TGA"
                rel="prefetch noreferrer"
                target="_blank"
              >
                KBD67 Lite R3
              </a>
              .
            </li>
            <li>MX Master 3.</li>
            <li>Lenovo P27h-20 27&quot; Monitor.</li>
            <li>Ergo Desks Liberty Standing Desk.</li>
            <li>IKEA JÄRVFJÄLLET Chair.</li>
            <li>Sony WH-1000XM4 Headphones.</li>
            <li>DeltaHub Minimalistic Desk Pad.</li>
            <li>Twelve South Curve MacBook Stand.</li>
          </ul>
          <h2 className="text-2xl font-bold mb-3 mt-8">Music</h2>
          <div className="grid grid-cols-2 gap-y-6 gap-x-6 sm:grid-cols-3 fold:grid-cols-1">
            {albums.map((album) => (
              <a
                href={album.url}
                className="group"
                key={album.title}
                rel="prefetch noreferrer"
                target="_blank"
              >
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg cursor-pointer">
                  <Image
                    alt={album.title}
                    src={album.image}
                    layout="fill"
                    className="group-hover:opacity-75 transition-all"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

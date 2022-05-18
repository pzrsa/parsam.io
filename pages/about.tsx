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
import avatar from "../public/images/avatar.jpg";
import styles from "../styles/modules/About.module.css";
import utilStyles from "../styles/utils.module.css";

interface TechItemProps {
  name: string;
  Icon: IconType;
}

const TechItem: React.FC<TechItemProps> = ({ name, Icon }) => {
  return (
    <li>
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
      <header className={styles.header}>
        <h1 className={utilStyles.heading2Xl}>About Me</h1>
        <div className={styles.me}>
          <div>
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
          <Image
            className={utilStyles.rounded}
            src={avatar}
            height={700}
            width={700}
            objectFit="cover"
            alt="Parsa Mesgarha"
          />
        </div>
      </header>
      <div>
        <h2 className={utilStyles.headingLg}>Things I like</h2>
        <ul>
          <li>
            <a
              href="https://github.com/pzrsa?tab=stars"
              rel="prefetch noreferrer"
              target="_blank"
            >
              Open source projects
            </a>
            . It&apos;s fascinating that random people all over the internet are
            able to come together to change the world.
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
            with parts tailored to my preference. I use a keyboard daily, so it
            makes sense for me to invest in tools that inspire me to use them
            more.
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
            . I&apos;ve now thankfully moved over to using 9 fingers for typing
            after only using 3 previously. Wasn&apos;t easy but 100% worth the
            frustration in the beginning. My current highest WPM is 116 (95%
            accuracy).
          </li>
          <li>
            I enjoy speaking with enthuastic people just trying to share their
            interests. If the person has a personal website, then we most likely
            would bond.
          </li>
          <li>
            Mechanical watches. I own a Seiko SNZG13K1 that I bought for £100,
            and to this day I just love how clean and classic it looks. Although
            I wear an Apple Watch daily, I enjoy putting the Seiko on every now
            and then which does feel good.
          </li>
          <li>
            Vi keybinds, I can&apos;t live without them as it simply makes
            programming a joy.
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
        </ul>
        <h2 className={utilStyles.headingLg}>Technologies</h2>
        <ul>
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
        <h2 className={utilStyles.headingLg}>Setup</h2>
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
          <li>Sony WH-1000XM4 Wireless Noise Cancelling Headphones.</li>
          <li>DeltaHub Minimalistic Desk Pad.</li>
          <li>Twelve South Curve MacBook Stand.</li>
        </ul>
      </div>
    </>
  );
};

export default About;

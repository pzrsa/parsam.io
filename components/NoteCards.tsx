import Image from "next/image";
import Link from "next/link";
import { Post } from "../lib/types";
import Date from "./Date";

interface NoteCardsProps {
  notes: Post[];
}

const NoteCards: React.FC<NoteCardsProps> = ({ notes }) => {
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Link key={note.slug} href={`/notes/${note.slug}`}>
            <a className="group">
              <div className="aspect-w-4 aspect-h-6 overflow-hidden rounded-lg cursor-pointer">
                <Image
                  alt={note.title}
                  src={`/images/notes/covers/${note.image}`}
                  layout="fill"
                  className="group-hover:opacity-75 transition-all"
                />
              </div>

              <div className="group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-all">
                <h2 className="mt-2 text-xl sm:text-2xl font-bold">
                  {note.title}
                </h2>
                <p className="font-mono text-neutral-600 dark:text-neutral-400">
                  {note.author} • <Date dateString={note.date} />
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NoteCards;

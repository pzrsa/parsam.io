import Image from "next/legacy/image";
import Link from "next/link";
import { Post } from "../lib/types";

interface BookCardProps {
  note: Post;
}

const BookCard: React.FC<BookCardProps> = ({ note }) => {
  return (
    <Link href={`/notes/${note.slug}`} className="group">
      <div className="aspect-w-6 aspect-h-9 overflow-hidden rounded-lg cursor-pointer">
        <Image
          alt={note.title}
          src={`/images/notes/covers/${note.slug}.jpg`}
          layout="fill"
          className="group-hover:opacity-75 transition-all"
        />
      </div>
      <div className="group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-all">
        <h2 className="mt-2 text-xl sm:text-2xl font-bold">{note.title}</h2>
        <p className="font-mono text-neutral-600 dark:text-neutral-400">
          {note.author} • {note.genre}
        </p>
      </div>
    </Link>
  );
};

export default BookCard;

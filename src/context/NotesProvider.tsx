import useLocalStorage from "@/hooks/useLocalStorage";
import { type ReactNode, useMemo, type FC } from "react";
import { NoteData, RawNote, Tag } from "types";
import { NotesContext } from "./NotesContext";

type Props = {
	children: ReactNode;
};

const NotesProvider: FC<Props> = ({ children }) => {
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
	const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

	const notesWithTags = useMemo(
		() =>
			notes.map(note => ({
				...note,
				tags: tags.filter(tag => note.tagIds.includes(tag.id)),
			})),
		[notes, tags]
	);
	const createNote = ({ tags, ...data }: NoteData) => {
		setNotes(prev => [
			...prev,
			{
				...data,
				tagIds: tags.map(tag => tag.id),
				id: crypto.randomUUID(),
			},
		]);
	};
	const updateNote = (id: string, { tags, ...data }: NoteData) => {
		setNotes(prevNotes =>
			prevNotes.map(note => {
				if (note.id === id)
					return {
						...note,
						...data,
						tagIds: tags.map(tag => tag.id),
					};
				return note;
			})
		);
	};
	const deleteNote = (id: string) =>
		setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
	const createTag = (data: Tag) => {
		setTags(prev => [...prev, data]);
	};

	return (
		<NotesContext.Provider
			value={{
				notes: notesWithTags,
				createNote,
				updateNote,
				deleteNote,
				createTag,
				tags,
			}}>
			{children}
		</NotesContext.Provider>
	);
};
export default NotesProvider;

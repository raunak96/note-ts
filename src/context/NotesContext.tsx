import { createContext, useContext } from "react";
import { Note, NoteData, Tag } from "types";

type NoteContext = {
	notes: Note[];
	tags: Tag[];
	createNote: (data: NoteData) => void;
	updateNote: (id: string, data: NoteData) => void;
	createTag: (data: Tag) => void;
};
export const NotesContext = createContext<NoteContext>({
	notes: [],
	tags: [],
	createNote: (data: NoteData) => {},
	updateNote: (id: string, data: NoteData) => {},
	createTag: (data: Tag) => {},
});

export const useNotesContext = () => useContext(NotesContext);

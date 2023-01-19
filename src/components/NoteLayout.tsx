import { useNotesContext } from "@/context/NotesContext";
import {
	Navigate,
	Outlet,
	useOutletContext,
	useParams,
} from "react-router-dom";
import { Note } from "types";

const NoteLayout = () => {
	const { notes } = useNotesContext();
	const { id } = useParams();
	const note = notes.find(note => note.id === id);

	if (!note) return <Navigate to="/" replace />;
	return <Outlet context={note} />;
};

export const useNote = () => useOutletContext<Note>();

export default NoteLayout;

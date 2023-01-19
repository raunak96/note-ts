import { NoteForm } from "@/components";
import { useNotesContext } from "@/context/NotesContext";

const CreateNotePage = () => {
	const { createNote } = useNotesContext();
	return (
		<>
			<h1 className="mb-4">New Note</h1>
			<NoteForm onSubmit={createNote} />
		</>
	);
};
export default CreateNotePage;

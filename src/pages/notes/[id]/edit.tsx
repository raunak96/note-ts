import { NoteForm } from "@/components";
import { useNote } from "@/components/NoteLayout";
import { useNotesContext } from "@/context/NotesContext";

const EditNotePage = () => {
	const note = useNote();
	const { updateNote } = useNotesContext();

	return (
		<>
			<h1 className="mb-4">Edit Note</h1>
			<NoteForm
				onSubmit={data => updateNote(note.id, data)}
				title={note.title}
				markdown={note.markdown}
				tags={note.tags}
			/>
		</>
	);
};
export default EditNotePage;

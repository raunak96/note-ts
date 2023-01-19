import { NoteForm } from "@/components";
import { type FC } from "react";
import { NoteData, Tag } from "types";

const CreateNote = () => {
	return (
		<>
			<h1 className="mb-4">New Note</h1>
			<NoteForm />
		</>
	);
};
export default CreateNote;

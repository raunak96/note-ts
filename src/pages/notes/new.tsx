import NoteForm from "@/components/NoteForm";
import { type FC } from "react";
import { NoteData } from "types";

type Props = {
	onSubmit: (data: NoteData) => void;
};
const CreateNote: FC<Props> = ({ onSubmit }) => {
	return (
		<>
			<h1 className="mb-4">New Note</h1>
			<NoteForm onSubmit={onSubmit} />
		</>
	);
};
export default CreateNote;

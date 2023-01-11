import { NoteForm } from "@/components";
import { type FC } from "react";
import { NoteData, Tag } from "types";

type Props = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (data: Tag) => void;
	availableTags: Tag[];
};
const CreateNote: FC<Props> = ({ onSubmit, onAddTag, availableTags }) => {
	return (
		<>
			<h1 className="mb-4">New Note</h1>
			<NoteForm
				onSubmit={onSubmit}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</>
	);
};
export default CreateNote;

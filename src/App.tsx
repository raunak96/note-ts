import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { NoteData, RawNote, Tag } from "types";
import useLocalStorage from "./hooks/useLocalStorage";
import { useMemo } from "react";
import CreateNote from "./pages/notes/new";
import HomePage from "./pages/notes";

const App = () => {
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
	const createTag = (data: Tag) => {
		setTags(prev => [...prev, data]);
	};
	return (
		<Container className="my-4">
			<Routes>
				<Route path="notes">
					<Route
						index
						element={
							<HomePage
								notes={notesWithTags}
								availableTags={tags}
							/>
						}
					/>
					<Route
						path="new"
						element={
							<CreateNote
								onSubmit={createNote}
								onAddTag={createTag}
								availableTags={tags}
							/>
						}
					/>
					<Route path=":id">
						<Route index element={<h1>Show</h1>} />
						<Route path="edit" element={<h1>Edit</h1>} />
					</Route>
				</Route>
				<Route path="*" element={<Navigate to="/notes" />} />
			</Routes>
		</Container>
	);
};

export default App;

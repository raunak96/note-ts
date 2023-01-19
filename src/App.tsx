import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import CreateNote from "@/pages/notes/new";
import HomePage from "@/pages/notes";
import NotePage from "@/pages/notes/[id]";
import NoteLayout from "./components/NoteLayout";

const App = () => {
	return (
		<Container className="my-4">
			<Routes>
				<Route path="notes">
					<Route index element={<HomePage />} />
					<Route path="new" element={<CreateNote />} />
					<Route path=":id" element={<NoteLayout />}>
						<Route index element={<NotePage />} />
						<Route path="edit" element={<h1>Edit</h1>} />
					</Route>
				</Route>
				<Route path="*" element={<Navigate to="/notes" />} />
			</Routes>
		</Container>
	);
};

export default App;

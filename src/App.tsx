import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import CreateNote from "@/pages/notes/new";

const App = () => {
	return (
		<Container className="my-4">
			<Routes>
				<Route path="notes">
					<Route index element={<h1>Home</h1>} />
					<Route path="new" element={<CreateNote />} />
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

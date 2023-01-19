import { NoteCard } from "@/components";
import { useNotesContext } from "@/context/NotesContext";
import { useState, useMemo } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { SimplifiedNote, Tag } from "types";

const HomePage = () => {
	const { notes, tags: availableTags } = useNotesContext();
	const [title, setTitle] = useState<string>("");
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

	const filteredNotes: SimplifiedNote[] = useMemo(() => {
		return notes.filter(
			note =>
				(title === "" ||
					note.title.toLowerCase().includes(title.toLowerCase())) &&
				(selectedTags.length === 0 ||
					selectedTags.every(tag =>
						note.tags.some(noteTag => noteTag.id === tag.id)
					))
		);
	}, [selectedTags, notes, title]);

	return (
		<>
			<Row className="my-4 align-items-center">
				<Col>
					<h1>Home Page</h1>
				</Col>
				<Col xs="auto">
					<Link to="/notes/new">
						<Button variant="primary">Create Note</Button>
					</Link>
				</Col>
			</Row>
			<Form>
				<Row className="mb-4">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								required
								value={title}
								onChange={e => setTitle(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<ReactSelect
								isMulti
								value={selectedTags.map(tag => ({
									label: tag.label,
									value: tag.id,
								}))}
								options={availableTags.map(tag => ({
									value: tag.id,
									label: tag.label,
								}))}
								onChange={tags => {
									setSelectedTags(
										tags.map(tag => ({
											label: tag.label,
											id: tag.value,
										}))
									);
								}}
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			<Row xs={1} sm={2} lg={3} xl={4} className="g-4 mt-4">
				{filteredNotes.map(note => (
					<Col key={note.id}>
						<NoteCard note={note} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default HomePage;

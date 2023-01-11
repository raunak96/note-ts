import { NoteCard } from "@/components";
import { type FC, useState, useMemo } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { SimplifiedNote, Tag } from "types";

type Props = {
	availableTags: Tag[];
	notes: SimplifiedNote[];
};
const HomePage: FC<Props> = ({ availableTags, notes }) => {
	const [title, setTitle] = useState<string>("");
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

	const filteredNotes = useMemo(() => {
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
					<Stack gap={2} direction="horizontal">
						<Link to="/notes/new">
							<Button variant="primary">Create</Button>
						</Link>
						<Button variant="outline-secondary">Edit Tags</Button>
					</Stack>
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
			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
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
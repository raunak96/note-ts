import { useNotesContext } from "@/context/NotesContext";
import { type FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelectCreatable from "react-select/creatable";
import { Tag } from "types";

const NoteForm = () => {
	const { createNote, createTag, tags: availableTags } = useNotesContext();
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

	const navigate = useNavigate();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createNote({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags,
		});
		(e.target as HTMLFormElement).reset();
		navigate("..");
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control required ref={titleRef} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<ReactSelectCreatable
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
								onCreateOption={label => {
									const newTag: Tag = {
										id: crypto.randomUUID(),
										label,
									};
									createTag(newTag);
									setSelectedTags(prev => [...prev, newTag]);
								}}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control
						required
						placeholder="Body should be in markdown format"
						as="textarea"
						rows={15}
						ref={markdownRef}
					/>
				</Form.Group>
				<Stack
					direction="horizontal"
					gap={2}
					className="justify-content-end">
					<Button type="submit" variant="primary">
						Save
					</Button>
					{/* Link .. goes one step up in url hierarchy. For eg: If curr route is /notes/new, then .. goes to /notes similar to cd .. in bash */}
					<Link to="..">
						<Button type="button" variant="outline-secondary">
							Cancel
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	);
};
export default NoteForm;

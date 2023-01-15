import { FC } from "react";
import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SimplifiedNote } from "types";
import styles from "@/styles/NoteCard.module.css";
type Props = {
	note: SimplifiedNote;
};
const NoteCard: FC<Props> = ({ note: { id, title, tags } }) => {
	return (
		<Card
			as={Link}
			to={`/notes/${id}`}
			className={`text-reset text-decoration-none ${styles.card}`}>
			<Card.Body>
				<Stack
					gap={2}
					className="align-items-center justify-content-center h-100">
					<span className="fs-5">{title}</span>
					{tags.length > 0 && (
						<Stack
							direction="horizontal"
							gap={1}
							className="justify-content-center flex-wrap">
							{tags.map(tag => (
								<Badge key={tag.id} className="text-truncate">
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Stack>
			</Card.Body>
		</Card>
	);
};
export default NoteCard;

import { useState } from "react";
import { ChangeEvent } from "react";
import { Grid, TextField, IconButton, Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import "./App.css";

interface InputSet {
	id: number;
	name?: string;
	surname?: string;
}

const emptyData = { id: 0, name: "", surname: "" };

function App() {
	const [inputSets, setInputSets] = useState<InputSet[]>([emptyData]);
	const [hovered, setHovered] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [id, setId] = useState(1);
	const [backgroundColor, setBackgroundColor] = useState<string>("#fff");
	const [savedData, setSavedData] = useState<InputSet[]>([]);
	const [hasData, setHasData] = useState(false);

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		id: number,
		field: "name" | "surname"
	) => {
		const value = e.target.value;
		setInputSets((prevInputSets) =>
			prevInputSets.map((inputSet) =>
				inputSet.id === id ? { ...inputSet, [field]: value } : inputSet
			)
		);
	};

	const addInputSet = () => {
		setId((state) => state + 1);
		const lastInputSet = inputSets[inputSets.length - 1];
		if (!(lastInputSet.name || lastInputSet.surname)) {
			setError("Please fill inputs correctly");
			return;
		} else {
			setError(null);
		}

		setInputSets((prevInputSets) => [...prevInputSets, { id }]);
	};

	const removeInputSet = (id: number) => {
		setInputSets((prevInputSets) =>
			prevInputSets.filter((inputSet) => inputSet.id !== id)
		);
	};

	const handleMouseEnter = (id: number) => {
		if (id !== inputSets[inputSets.length - 1].id) {
			setHovered(id);
		}
	};

	const handleMouseLeave = () => {
		setHovered(null);
	};

	const themeButton = () => {
		const newBackgroundColor =
			backgroundColor === "#333" ? "#ffffff" : "#333";
		setBackgroundColor(newBackgroundColor);

		document.body.style.backgroundColor = newBackgroundColor;
	};

	const handleSave = () => {
		const hasEmptyFields = inputSets.some((inputSet) => !inputSet.name && !inputSet.surname);

		if (hasEmptyFields) {
			setError('Please fill inputs correctly');
			return;
		}
		
		setSavedData([...inputSets]);
		setHasData(true);
		setError(null);
	};

	const handleDelete = () => {
		setSavedData([]);
	};

	return (
		<Grid
			container
			spacing={2}
			direction="column"
			sx={{ alignItems: "center", backgroundColor }}
		>
			<Button
				variant="outlined"
				style={{ marginLeft: "330px" }}
				onClick={themeButton}
			>
				🌗
			</Button>
			{error && (
				<p style={{ color: "red", marginLeft: "200px" }}>{error}</p>
			)}
			{inputSets.map((inputSet, index) => (
				<Grid
					container
					item
					spacing={2}
					key={`${inputSet.id}-${index}`}
					onMouseEnter={() => handleMouseEnter(inputSet.id)}
					onMouseLeave={handleMouseLeave}
				>
					<Grid item>
						<TextField
							id={`name-${inputSet.id}`}
							label="Name"
							variant="outlined"
							value={inputSet.name || ""}
							onChange={(event) =>
								handleInputChange(event, inputSet.id, "name")
							}
							onFocus={() => setError(null)}
							error={
								error !== null &&
								inputSet === inputSets[inputSets.length - 1]
							}
							InputProps={{
								style: {
									color:
										backgroundColor === "#333"
											? "#fff"
											: "#000",
								},
							}}
						/>
					</Grid>
					<Grid item>
						<TextField
							id={`surname-${inputSet.id}`}
							label="Surname"
							variant="outlined"
							value={inputSet.surname || ""}
							onChange={(event) =>
								handleInputChange(event, inputSet.id, "surname")
							}
							onFocus={() => setError(null)}
							error={
								error !== null &&
								inputSet === inputSets[inputSets.length - 1]
							}
							InputProps={{
								style: {
									color:
										backgroundColor === "#333"
											? "#fff"
											: "#000",
								},
							}}
						/>
					</Grid>
					<Grid item>
						{hovered === inputSet.id && (
							<IconButton
								onClick={() => removeInputSet(inputSet.id)}
								style={{ outline: "none" }}
							>
								<ClearIcon fontSize="large" color="error" />
							</IconButton>
						)}
					</Grid>
					<Grid item>
						{index === inputSets.length - 1 && (
							<IconButton
								onClick={addInputSet}
								style={{ outline: "none" }}
							>
								<AddCircleOutlineOutlinedIcon fontSize="large" />
							</IconButton>
						)}
					</Grid>
				</Grid>
			))}
			<Grid item>
				<Button
					style={{ marginLeft: "270px" }}
					variant="outlined"
					onClick={handleSave}
				>
					Save
				</Button>
			</Grid>
			{hasData && (
				<div className="wrapper">
					<h2>Saved Data:</h2>
					<div className="border">
						{savedData.map((savedItem) => (
							<p
								style={{
									color:
										backgroundColor === "#333"
											? "#fff"
											: "#000",
								}}
								className="border-outline"
								key={savedItem.id}
							>
								<span style={{ color: "red" }}>Name: </span>
								&nbsp;&nbsp;
								{savedItem.name}&nbsp;&nbsp;&nbsp;
								<span style={{ color: "red" }}>Surname: </span>
								&nbsp;&nbsp;
								{savedItem.surname}
							</p>
						))}
						<Button onClick={handleDelete}>Delete List</Button>
					</div>
				</div>
			)}
		</Grid>
	);
}

export default App;

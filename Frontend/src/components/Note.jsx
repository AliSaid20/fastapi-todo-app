import { useState, useEffect } from "react"
import { Box, Button, TextField, Typography, Container } from "@mui/material"
import axios from "axios"
import List from "./List";



const Note = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchItems, setSearchItems] = useState([]);


  // Fetch notes from backend when component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/notes/");
      setSearchItems(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
   


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = async () => {
    if (inputValue.trim()) {
      try {
        const response = await axios.post("http://localhost:8000/notes/", {
          content: inputValue.trim(),
        });

        // Add new note from backend response
        setSearchItems([...searchItems, response.data]);
        setInputValue("");
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const handleDeleteItem = async (id) => {

    try {
      await axios.delete(`http://localhost:8000/notes/${id}`);
      setSearchItems(searchItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };



  return (
    <Box>
    {/* Heading */}
    <Typography
      variant="h3"
      align="center"
      className="Heading"
      sx={{ mt: 4 }}
    >
      TO DO LIST 
    </Typography>

    {/* Input Box */}
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box display="flex" gap={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Note"
          value={inputValue}
          onChange={handleInputChange}
          sx={{
            bgcolor: "white",
            borderRadius: 1,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddItem}
          sx={{
            bgcolor: "black",
            color: "white",
            ":hover": { bgcolor: "gray" },
          }}
        >
          OK
        </Button>
      </Box>
    </Container>



  

    {/* Reminder List */}
    <List items={searchItems} deleteItem={handleDeleteItem} />
  </Box>
  )
}

export default Note

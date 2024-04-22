import { useState, useEffect } from "react";
import "./App.css";
import { PostType } from "./models/post.interface";
import { Post } from "./api/apis";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

function App() {
  const [data, setData] = useState<PostType[]>([]);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  // this will initiate the index for the first time and apply changes accordingly
  const handleCellClick = (index: number) => {
    setSelectedCell(index);
  };

  // apply keyboard event to track the actual index data
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { key } = e;
    let newSelectedCell: number | null = null;

    if (selectedCell !== null) {
      switch (key) {
        case "ArrowUp":
          newSelectedCell = Math.max(0, selectedCell - 5);
          break;
        case "ArrowDown":
          newSelectedCell = Math.min(data.length - 1, selectedCell + 5);
          break;
        case "ArrowLeft":
          newSelectedCell = Math.max(0, selectedCell - 1);
          break;
        case "ArrowRight":
          newSelectedCell = Math.min(data.length - 1, selectedCell + 1);
          break;
        default:
          break;
      }
    }

    //set the selected cell data for the active role of the respective selected cell
    setSelectedCell(newSelectedCell);
  };

  useEffect(() => {
    Post.getPosts()
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {};
  }, []);

  return (
    <TableContainer
      component={Paper}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="container"
    >
      <Table>
        <TableBody>
          {[0, 1, 2, 3].map((row) => (
            <TableRow key={row}>
              {[0, 1, 2, 3, 4].map((col) => {
                const index = row * 5 + col;
                return (
                  <TableCell
                    key={col}
                    onClick={() => handleCellClick(index)}
                    style={{
                      backgroundColor:
                        selectedCell === index ? "#fff" : "black",
                      width: "200px",
                      height: "120px",
                      border: "5px solid #fff",
                    }}
                  >
                    {selectedCell === index && (
                      <img
                        src={data[index]?.image}
                        alt={data[index]?.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;

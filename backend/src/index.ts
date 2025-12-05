import express, { Request, Response } from 'express';
import cors from "cors"



const app = express();
const port = process.env.PORT || 5000;


app.use(express.json())
app.use(cors())


app.get('/', (req: Request, res: Response) => {
  res.send({
    serverStatus: "Server is Running :)"
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

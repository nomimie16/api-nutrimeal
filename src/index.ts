import express from 'express';
import cors from 'cors';
import DBClient from './client';
import { recettesRouter } from './recettes/recettes.router';

export const app = express();
const port = process.env.PORT || 3000;
const prisma = DBClient.getInstance().prisma;

app.use(cors());       
app.use(express.json()); 
app.use('/', recettesRouter);

export const server = app.listen(port, () => {
  console.log(`API Nutrimeal démarrée sur le port ${port}`);
});

export function stopServer() {
  server.close();
}




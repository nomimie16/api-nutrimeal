import { Router } from 'express';
import { getRecettes,  getRecettesbyCategorie, getRecettesbyId, getIngrediens, getValeursNutritionnelles } from './recettes.controller';
import { get } from 'http';


export const recettesRouter = Router();

// Route pour obtenir la liste des recettes
recettesRouter.get('/recettes', getRecettes);
recettesRouter.get('/recettes/categorie/:categorie', getRecettesbyCategorie);
recettesRouter.get(/^\/recettes\/(\d+)$/, getRecettesbyId);
recettesRouter.get('/recette/:id/ingredients', getIngrediens);
recettesRouter.get('/recettes/:id/nutrition', getValeursNutritionnelles); 
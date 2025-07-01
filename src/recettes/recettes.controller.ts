// import express from 'express';
import { PrismaClient } from '@prisma/client';
import{ Request, Response } from 'express';

const prisma = new PrismaClient();


export const getRecettes =  async(_req: Request , res: Response) =>  {
  try {
    const recettes = await prisma.recette.findMany({
      include: {
        ingredients: true,
        instructions: true,
        valeursNutritionnelles: true,
      },
    });
    res.json(recettes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Recupere les recettes par categorie
export const getRecettesbyCategorie =  async(_req: Request , res: Response) =>  {
    const categorie = _req.params.categorie;
    
    try {
        const recettes = await prisma.recette.findMany({
        where: { categorie },
        include: {
            ingredients: true,
            instructions: true,
            valeursNutritionnelles: true,
        },
        });
    
        // if (recettes.length === 0) {
        // return res.status(404).json({ error: 'Aucune recette trouvée pour cette catégorie' });
        // }
    
        res.json(recettes);
    } catch (error) {
        console.error('Erreur lors de la récupération des recettes par catégorie :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// Recupere une recette par id (Express 5.x syntaxe RegExp)
export const getRecettesbyId =  async(_req: Request , res: Response) =>  {
  const recetteId = parseInt(_req.params[0]);

  // if (isNaN(recetteId)) {
  //   return res.status(400).json({ error: 'ID invalide' });
  // }

  try {
    const recette = await prisma.recette.findUnique({
      where: { id: recetteId },
      include: {
        ingredients: true,
        instructions: true,
        valeursNutritionnelles: true,
      },
    });

    // if (!recette) {
    //   return res.status(404).json({ error: 'Recette non trouvée' });
    // }

    res.json(recette);
  } catch (error) {
    console.error('Erreur lors de la récupération de la recette :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


// Recupere les ingrediens d'une recette
export const getIngrediens =  async(_req: Request , res: Response) =>  {

  const ingredients = await prisma.ingredient.findMany({
    distinct: ['nom'],
    select: { nom: true },
  });
  res.json(ingredients);
};


// Recupere la valeur nutritionelle
export const getValeursNutritionnelles =  async(_req: Request , res: Response) =>  {

  const id = parseInt(_req.params.id);
  const nutrition = await prisma.valeursNutritionnelles.findFirst({
    where: { id: id },
  });
  res.json(nutrition);
};

export const createRecette =  async(_req: Request , res: Response) =>  {

  try {
    const { titre, description, image_url, categorie, ingredients, instructions, valeurNutritionnelle } = _req.body;

    const createdRecette = await prisma.recette.create({
      data: {
        titre,
        description,
        image_url,
        categorie,
        ingredients: {
          create: ingredients,
        },
        instructions: {
          create: instructions,
        },
        valeursNutritionnelles: {
          create: valeurNutritionnelle,
        }
      },
      include: {
        ingredients: true,
        instructions: true,
        valeursNutritionnelles: true,
      },
    });

    res.status(201).json(createdRecette);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
};
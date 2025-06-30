const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());           // Autoriser les requêtes Cross-Origin (pratique pour Flutter en dev)
app.use(express.json());   // Pour parser le JSON des requêtes POST/PUT

app.get('/recettes', async (req, res) => {
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
});

// Recupere une recette par id
app.get('/recettes/:id', async (req, res) => {
  const recetteId = parseInt(req.params.id);

  if (isNaN(recetteId)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  try {
    const recette = await prisma.recette.findUnique({
      where: { id: recetteId },
      include: {
        ingredients: true,
        instructions: true,
        valeursNutritionnelles: true,
      },
    });

    if (!recette) {
      return res.status(404).json({ error: 'Recette non trouvée' });
    }

    res.json(recette);
  } catch (error) {
    console.error('Erreur lors de la récupération de la recette :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// Recupere les ingrediens d'une recette
app.get('/ingredients', async (req, res) => {
  const ingredients = await prisma.ingredient.findMany({
    distinct: ['nom'],
    select: { nom: true },
  });
  res.json(ingredients);
});

// Recupere la valeur
app.get('/recettes/:id/nutrition', async (req, res) => {
  const id = parseInt(req.params.id);
  const nutrition = await prisma.valeursNutritionnelles.findFirst({
    where: { recetteId: id },
  });
  res.json(nutrition);
});


app.post('/recettes', async (req, res) => {
  try {
    const { titre, description, image_url, ingredients, instructions, valeurNutritionnelle } = req.body;

    const createdRecette = await prisma.recette.create({
      data: {
        titre,
        description,
        image_url,
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
        valeurs_nutritionnelles: true,
      },
    });

    res.status(201).json(createdRecette);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Nutrimeal démarrée sur le port ${PORT}`);
});

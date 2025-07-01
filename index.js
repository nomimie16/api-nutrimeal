const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());       
app.use(express.json());   

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

// Recupere les recettes par categorie
app.get('/recettes/categorie/:categorie', async (req, res) => {
    const categorie = req.params.categorie;
    
    try {
        const recettes = await prisma.recette.findMany({
        where: { categorie },
        include: {
            ingredients: true,
            instructions: true,
            valeursNutritionnelles: true,
        },
        });
    
        if (recettes.length === 0) {
        return res.status(404).json({ error: 'Aucune recette trouvée pour cette catégorie' });
        }
    
        res.json(recettes);
    } catch (error) {
        console.error('Erreur lors de la récupération des recettes par catégorie :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Recupere une recette par id (Express 5.x syntaxe RegExp)
app.get(/^\/recettes\/(\d+)$/, async (req, res) => {
  const recetteId = parseInt(req.params[0]);

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


// Recupere la valeur nutritionelle
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

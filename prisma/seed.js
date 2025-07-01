const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const recettes = [
  {
    titre: "Lasagnes végétariennes",
    description: "Des lasagnes savoureuses aux légumes de saison.",
    image_url: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
    nb_vues: 0,
    note: 4.5,
    temps_preparation: 45,
    categorie : "plat",
    ingredients: [
      { nom: "Pâtes à lasagnes", quantite: 200, unite: "g" },
      { nom: "Courgette", quantite: 2, unite: "pièces" },
      { nom: "Tomates concassées", quantite: 400, unite: "g" },
      { nom: "Mozzarella", quantite: 150, unite: "g" },
      { nom: "Basilic", quantite: 1, unite: "c. à soupe" }
    ],
    instructions: [
      { etape: "Préchauffer le four à 180°C." },
      { etape: "Couper les légumes en dés et les faire revenir." },
      { etape: "Ajouter les tomates concassées et le basilic." },
      { etape: "Monter les lasagnes en couches." },
      { etape: "Cuire au four pendant 35 minutes." }
    ],
    valeurNutritionnelle: {
      calories: 480,
      proteines: 18,
      glucides: 50,
      lipides: 22
    }
  },
  {
    titre: "Smoothie banane-fraise",
    description: "Une boisson rafraîchissante et riche en vitamines.",
    image_url: "https://images.pexels.com/photos/4443476/pexels-photo-4443476.jpeg",
    temps_preparation: 10,
    nb_vues: 0,
    note: 4.2,
    categorie : "boisson",

    ingredients: [
      { nom: "Banane", quantite: 1, unite: "pièce" },
      { nom: "Fraises", quantite: 150, unite: "g" },
      { nom: "Lait végétal", quantite: 200, unite: "ml" },
      { nom: "Miel", quantite: 1, unite: "c. à soupe" }
    ],
    instructions: [
      { etape: "Éplucher la banane et laver les fraises." },
      { etape: "Mixer tous les ingrédients ensemble." },
      { etape: "Servir bien frais." }
    ],
    valeurNutritionnelle: {
      calories: 210,
      proteines: 3,
      glucides: 35,
      lipides: 5
    }
  },
  {
    titre: "Soupe de potiron",
    description: "Une soupe onctueuse parfaite pour l’automne.",
    image_url: "https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg",
    temps_preparation: 30,
    nb_vues: 0,
    note: 4.8,
    categorie : "plat",
    ingredients: [
      { nom: "Potiron", quantite: 600, unite: "g" },
      { nom: "Oignon", quantite: 1, unite: "pièce" },
      { nom: "Crème fraîche", quantite: 50, unite: "ml" },
      { nom: "Sel", quantite: 1, unite: "pincée" },
      { nom: "Poivre", quantite: 1, unite: "pincée" }
    ],
    instructions: [
      { etape: "Éplucher et couper les légumes." },
      { etape: "Faire revenir l’oignon, puis ajouter le potiron." },
      { etape: "Couvrir d’eau et cuire 25 min." },
      { etape: "Mixer avec la crème, saler, poivrer." }
    ],
    valeurNutritionnelle: {
      calories: 170,
      proteines: 3,
      glucides: 18,
      lipides: 9
    }
  },
  {
    titre: "Salade César au poulet",
    description: "Une salade fraîche et gourmande avec une sauce crémeuse.",
    image_url: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
    temps_preparation: 20,
    nb_vues: 10,
    note: 4.6,
    categorie: "entrée",
    ingredients: [
      { nom: "Blancs de poulet", quantite: 200, unite: "g" },
      { nom: "Salade romaine", quantite: 1, unite: "pièce" },
      { nom: "Parmesan râpé", quantite: 30, unite: "g" },
      { nom: "Croûtons", quantite: 50, unite: "g" },
      { nom: "Sauce César", quantite: 50, unite: "ml" }
    ],
    instructions: [
      { etape: "Faire griller le poulet et le couper en morceaux." },
      { etape: "Laver la salade et la couper." },
      { etape: "Mélanger la salade avec la sauce César." },
      { etape: "Ajouter le poulet, les croûtons et le parmesan." }
    ],
    valeurNutritionnelle: {
      calories: 350,
      proteines: 35,
      glucides: 15,
      lipides: 18
    }
  },
  {
    titre: "Pâtes à la carbonara",
    description: "Un classique italien riche et crémeux.",
    image_url: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
    temps_preparation: 25,
    nb_vues: 15,
    note: 4.9,
    categorie: "plat",
    ingredients: [
      { nom: "Spaghetti", quantite: 200, unite: "g" },
      { nom: "Lardons", quantite: 150, unite: "g" },
      { nom: "Crème fraîche", quantite: 100, unite: "ml" },
      { nom: "Œufs", quantite: 2, unite: "pièces" },
      { nom: "Parmesan râpé", quantite: 50, unite: "g" },
      { nom: "Poivre", quantite: 1, unite: "pincée" }
    ],
    instructions: [
      { etape: "Cuire les pâtes al dente." },
      { etape: "Faire revenir les lardons sans matière grasse." },
      { etape: "Mélanger la crème, les œufs et le parmesan." },
      { etape: "Mélanger les pâtes chaudes avec le mélange, ajouter les lardons et poivrer." }
    ],
    valeurNutritionnelle: {
      calories: 680,
      proteines: 30,
      glucides: 75,
      lipides: 25
    }
  },
  {
    titre: "Tarte aux pommes",
    description: "Une tarte traditionnelle aux pommes fondantes.",
    image_url: "https://images.pexels.com/photos/3223494/pexels-photo-3223494.jpeg",
    temps_preparation: 45,
    nb_vues: 25,
    note: 4.7,
    categorie: "dessert",
    ingredients: [
      { nom: "Pâte brisée", quantite: 1, unite: "rouleau" },
      { nom: "Pommes", quantite: 5, unite: "pièces" },
      { nom: "Sucre", quantite: 80, unite: "g" },
      { nom: "Beurre", quantite: 30, unite: "g" },
      { nom: "Cannelle", quantite: 1, unite: "c. à café" }
    ],
    instructions: [
      { etape: "Préchauffer le four à 180°C." },
      { etape: "Étaler la pâte dans un moule." },
      { etape: "Éplucher et couper les pommes en fines tranches." },
      { etape: "Disposer les pommes sur la pâte, saupoudrer de sucre et cannelle." },
      { etape: "Parsemer de petits morceaux de beurre." },
      { etape: "Cuire 35 minutes jusqu’à ce que la pâte soit dorée." }
    ],
    valeurNutritionnelle: {
      calories: 290,
      proteines: 3,
      glucides: 45,
      lipides: 12
    }
  }
  
];

async function main() {
  for (const recette of recettes) {
    await prisma.recette.create({
      data: {
        titre: recette.titre,
        description: recette.description,
        image_url: recette.image_url,
        temps_preparation: recette.temps_preparation,
        nb_vues: recette.nb_vues,
        note: recette.note,
        categorie : recette.categorie,
        valeursNutritionnelles: {
          create: recette.valeurNutritionnelle
        },
        ingredients: {
          create: recette.ingredients,
        },
        instructions: {
          create: recette.instructions,
        },
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

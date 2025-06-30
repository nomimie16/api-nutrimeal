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
    image_url: "https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg",
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

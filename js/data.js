// ============================================================
//  data.js  –  SenThiof-JSON
//  Architecture hybride :
//  - Données initiales chargées depuis db.json (fetch)
//  - Toutes les modifications sauvegardées dans localStorage
//  La logique de l'application reste identique à la version originale.
// ============================================================

const NOMS_TABLES = ["utilisateurs", "produits", "transactions", "paniers", "stocks"];

// ---------- Initialisation : charge db.json une seule fois ----------
const _pretAUtiliser = (async function initialiserDB() {
  if (localStorage.getItem("senthiofjson_init") === "true") {
    return; // déjà initialisé, on garde les données localStorage existantes
  }

  try {
    const reponse = await fetch("db.json");
    const donnees = await reponse.json();

    NOMS_TABLES.forEach(table => {
      const valeur = donnees[table] || [];
      localStorage.setItem("senthiofjson_" + table, JSON.stringify(valeur));
    });

    localStorage.setItem("senthiofjson_init", "true");
    console.log("✅ Base de données initialisée depuis db.json");
  } catch (erreur) {
    console.error("❌ Impossible de charger db.json :", erreur);
    // Filet de sécurité : on initialise des tables vides pour éviter un crash total
    NOMS_TABLES.forEach(table => {
      if (!localStorage.getItem("senthiofjson_" + table)) {
        localStorage.setItem("senthiofjson_" + table, "[]");
      }
    });
  }
})();

// ---------- Helpers internes ----------
function lire(cle) {
  return JSON.parse(localStorage.getItem("senthiofjson_" + cle) || "[]");
}
function ecrire(cle, valeur) {
  localStorage.setItem("senthiofjson_" + cle, JSON.stringify(valeur));
}
function prochainId(liste) {
  return liste.length === 0 ? 1 : Math.max(...liste.map(e => e.id || 0)) + 1;
}
async function simuler(valeur) {
  await _pretAUtiliser; // attend que db.json soit chargé avant toute opération
  return valeur;
}

// ---------- Utilisateurs ----------
async function getUtilisateurs() {
  await _pretAUtiliser;
  return lire("utilisateurs");
}

async function connecterUtilisateur(email, motdepasse) {
  await _pretAUtiliser;
  const users = lire("utilisateurs");
  const user = users.find(u =>
    u.email.toLowerCase() === email.toLowerCase() &&
    u.motdepasse === motdepasse
  );
  return user || null;
}

async function ajouterUtilisateur(utilisateur) {
  await _pretAUtiliser;
  const users = lire("utilisateurs");
  const nouveau = { ...utilisateur, id: prochainId(users) };
  users.push(nouveau);
  ecrire("utilisateurs", users);
  return nouveau;
}

async function supprimerUtilisateur(id) {
  await _pretAUtiliser;
  const users = lire("utilisateurs").filter(u => u.id !== id);
  ecrire("utilisateurs", users);
  return {};
}

// ---------- Produits ----------
async function getProduits() {
  await _pretAUtiliser;
  return lire("produits");
}

async function ajouterProduit(produit) {
  await _pretAUtiliser;
  const produits = lire("produits");
  const nouveau = { ...produit, id: prochainId(produits) };
  produits.push(nouveau);
  ecrire("produits", produits);
  return nouveau;
}

async function modifierProduit(id, produit) {
  await _pretAUtiliser;
  const produits = lire("produits").map(p => p.id === id ? { ...p, ...produit, id } : p);
  ecrire("produits", produits);
  return produit;
}

async function supprimerProduit(id) {
  await _pretAUtiliser;
  const produits = lire("produits").filter(p => p.id !== id);
  ecrire("produits", produits);
  return {};
}

// ---------- Transactions ----------
async function getTransactions() {
  await _pretAUtiliser;
  return lire("transactions");
}

async function ajouterTransaction(transaction) {
  await _pretAUtiliser;
  const transactions = lire("transactions");
  const nouvelle = { ...transaction, id: prochainId(transactions) };
  transactions.push(nouvelle);
  ecrire("transactions", transactions);
  return nouvelle;
}

async function modifierTransaction(id, miseAJour) {
  await _pretAUtiliser;
  const transactions = lire("transactions").map(t => t.id === id ? { ...t, ...miseAJour } : t);
  ecrire("transactions", transactions);
  return miseAJour;
}

async function supprimerTransaction(id) {
  await _pretAUtiliser;
  const transactions = lire("transactions").filter(t => t.id !== id);
  ecrire("transactions", transactions);
  return {};
}

// ---------- Panier ----------
async function getPanier() {
  await _pretAUtiliser;
  return lire("paniers");
}

async function ajouterAuPanierAPI(article) {
  await _pretAUtiliser;
  const paniers = lire("paniers");
  const nouveau = { ...article, id: prochainId(paniers) };
  paniers.push(nouveau);
  ecrire("paniers", paniers);
  return nouveau;
}

async function supprimerArticlePanier(id) {
  await _pretAUtiliser;
  const paniers = lire("paniers").filter(a => a.id !== id);
  ecrire("paniers", paniers);
  return {};
}

async function viderPanier() {
  await _pretAUtiliser;
  ecrire("paniers", []);
  return [];
}

// ---------- Stocks ----------
async function getStocks() {
  await _pretAUtiliser;
  return lire("stocks");
}

async function modifierStock(id, miseAJour) {
  await _pretAUtiliser;
  const stocks = lire("stocks").map(s => s.id === id ? { ...s, ...miseAJour } : s);
  ecrire("stocks", stocks);
  return miseAJour;
}

// ---------- Réinitialisation (utile pour debug / reset complet) ----------
async function reinitialiserDepuisJSON() {
  localStorage.removeItem("senthiofjson_init");
  NOMS_TABLES.forEach(table => localStorage.removeItem("senthiofjson_" + table));
  const reponse = await fetch("db.json");
  const donnees = await reponse.json();
  NOMS_TABLES.forEach(table => {
    localStorage.setItem("senthiofjson_" + table, JSON.stringify(donnees[table] || []));
  });
  localStorage.setItem("senthiofjson_init", "true");
  console.log("🔄 Données réinitialisées depuis db.json");
}

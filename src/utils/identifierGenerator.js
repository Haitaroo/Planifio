// Fonction pour générer un hash simple à partir d'une chaîne
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertit en entier 32 bits
  }
  return Math.abs(hash);
}

// Fonction pour générer un identifiant unique basé sur les informations du budget et des dépenses
export function generateUniqueIdentifier(budget) {
  const { name, limit, remainingBudget, country, expenses, categories } = budget;
  
  // Créer une chaîne représentant toutes les dépenses
  const expensesString = expenses.map(expense => 
    `${expense.name}-${expense.amount}-${expense.category}-${expense.date}`
  ).join('|');
  
  // Créer une chaîne représentant toutes les catégories
  const categoriesString = categories.join('|');
  
  // Combiner toutes les informations
  const combinedString = `${name}-${limit}-${remainingBudget}-${country}-${categoriesString}-${expensesString}`;
  
  // Générer le hash
  const hash = simpleHash(combinedString);
  
  // Convertir le hash en une chaîne de caractères alphanumériques
  const alphanumeric = hash.toString(36).toUpperCase();
  
  // Assurer que la chaîne a au moins 12 caractères
  const paddedAlphanumeric = alphanumeric.padStart(12, '0');
  
  // Ajouter des tirets pour une meilleure lisibilité
  return `${paddedAlphanumeric.substr(0, 4)}-${paddedAlphanumeric.substr(4, 4)}-${paddedAlphanumeric.substr(8, 4)}`;
}

// Fonction pour vérifier si un identifiant est valide
export function isValidIdentifier(identifier) {
  const regex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return regex.test(identifier);
}
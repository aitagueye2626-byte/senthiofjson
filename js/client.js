function getClientPage() {
  return `
    <div id="dashboardClient">
      <nav class="barre-navigation">
        <div class="logo-barre">
          <span>🐟</span> <span>SenThiof-JSON - Client</span>
        </div>
        <div class="menu-barre">
          <span id="nomUtilisateurClient"></span>
          <button onclick="seDeconnecter()">🔓 Déconnexion</button>
        </div>
      </nav>

      <main class="contenu" style="padding:20px;">

        <div class="section-tableau">
          <h2>Mes Commandes</h2>
          <div class="table-container" style="max-height:250px;overflow-y:auto;">
            <table>
              <thead>
                <tr>
                  <th>Date</th><th>Produit</th><th>Qté</th><th>Montant</th><th>Statut</th>
                </tr>
              </thead>
              <tbody id="corpsTableauClient"></tbody>
            </table>
          </div>
        </div>

        <div class="section-tableau">
          <h2>🛒 Mon Panier</h2>
          <div class="table-container" style="max-height:200px;overflow-y:auto;">
            <table>
              <thead>
                <tr>
                  <th>Produit</th><th>Qté</th><th>Prix</th><th>Total</th><th>Action</th>
                </tr>
              </thead>
              <tbody id="corpsPanier"></tbody>
            </table>
          </div>
          <div style="margin-top:10px;text-align:right;font-weight:bold;">
            Total panier : <span id="totalPanier">0 FCFA</span>
          </div>
          <button class="bouton-connexion" style="margin-top:10px;background:#4caf50;" onclick="validerCommande()">
            ✅ Valider la commande
          </button>
        </div>

        <div class="section-tableau">
          <h2>Ajouter au panier</h2>
          <div class="champ">
            <label>Produit</label>
            <select id="produit"></select>
          </div>
          <div class="champ">
            <label>Quantité (kg)</label>
            <input type="number" id="quantiteCmd" placeholder="5" min="1" />
          </div>
          <button class="bouton-connexion" onclick="ajouterAuPanier()">
            ➕ Ajouter
          </button>
        </div>

      </main>
    </div>
  `;
}

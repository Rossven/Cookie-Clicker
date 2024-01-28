class Game {
  demandRate = 0;
  material = 2000;
  money = 100000000;
  price = 10;
  currentKurabiye = 0;
  manufacturedKurabiye = 50000;
  soldKurabiye = 0;
  unitMaterialCost = 100;

  // manufacture rate
  lastManufacturedCount = 0;
  lastManufacturedRate = 0;
  lastManufacturedRateTs = Date.now();

  // price of the material
  materialCost = 500;
  materialCostLastUpdated = Date.now();

  // generators
  autoGenerators = {
    errandBoy: 0,
    errandBoyCost: 1000,
    errandBoyManufactureRate: 1,
    foreman: 0,
    foremanCost: 5000,
    foremanManufactureRate: 6,
    master: 0,
    masterCost: 20000,
    masterManufactureRate: 15
  };
  autoGeneratorsLastGeneratedAt = Date.now();

  // auto buyer
  hasAutoBuyer = false;
  isAutoBuyerActive = false;
  autoBuyerCost = 15000;

  makeKurabiye = (count = 1) => {
    if (this.canMakeKurabiye(count)) {
      this.currentKurabiye += count;
      this.manufacturedKurabiye += count;
      this.material -= this.unitMaterialCost * count;
    }
  };

  update = () => {
    // generate new goods
    if (Date.now() - this.autoGeneratorsLastGeneratedAt > 1000) {
      this.makeKurabiye(
        this.autoGenerators.errandBoy *
        this.autoGenerators.errandBoyManufactureRate
      );
      this.makeKurabiye(
        this.autoGenerators.foreman * this.autoGenerators.foremanManufactureRate
      );
      this.makeKurabiye(
        this.autoGenerators.master * this.autoGenerators.masterManufactureRate
      );
      this.autoGeneratorsLastGeneratedAt = Date.now();
    }

    // auto buyer
    if (
      this.isAutoBuyerActive &&
      this.material <
      this.autoGenerators.errandBoy * 100 + this.autoGenerators.master * 1500 + this.autoGenerators.foreman * 600 &&
      this.canBuyMaterial()
    ) {
      this.buyMaterial();
    }

    // update material cost
    if (Date.now() - this.materialCostLastUpdated > 10000) {
      this.materialCost = Math.floor(Math.random() * 300 + 300);
      this.materialCostLastUpdated = Date.now();
    }

    // update manufacture rate
    if (Date.now() - this.lastManufacturedRateTs > 5000) {
      this.lastManufacturedRateTs = Date.now();
      this.lastManufacturedRate = Math.floor(
        (this.manufacturedKurabiye - this.lastManufacturedCount) / 5
      );
      this.lastManufacturedCount = this.manufacturedKurabiye;
    }

    // update demand
    this.updateDemand();

    // consumers purchase goods
    if (this.currentKurabiye > 0 && Math.random() * 100 < this.demandRate) {
      this.purchaseKurabiye();
    }
  };

  updateDemand = () => {
    let rate;
    if (this.price <= 40) {
      rate = (2 / Math.sqrt(this.price)) * 100;
    } else {
      const maxRate = (2 / Math.sqrt(40)) * 100;
      // 40tl 20%
      // 60tl 0%
      rate = (maxRate * (60 - this.price)) / 20;
    }
    this.demandRate = Math.floor(Math.max(0, rate));
  };

  purchaseKurabiye = () => {
    this.currentKurabiye -= 1;
    this.money += this.price;
  };

  startAutoBuyer = () => {
    if (this.hasAutoBuyer) {
      this.isAutoBuyerActive = true;
    }
  };
  stopAutoBuyer = () => {
    this.isAutoBuyerActive = false;
  };

  didUnlockAutoBuyer = () => {
    return this.manufacturedKurabiye > 2000;
  };

  canBuyAutoBuyer = () => {
    return this.didUnlockAutoBuyer() && this.money >= this.autoBuyerCost;
  };

  canBuyAutoGenerator = type => {
    switch (type) {
      case "ERRAND_BOY":
        return this.money >= this.autoGenerators.errandBoyCost;
      case "FOREMAN":
        return this.money >= this.autoGenerators.foremanCost;
      case "MASTER":
        return this.money >= this.autoGenerators.masterCost;
      default:
        return false;
    }
  };

  canBuyMaterial = () => {
    return this.money >= this.materialCost;
  };

  canMakeKurabiye = (count = 1) => {
    return this.material >= this.unitMaterialCost * count;
  };

  canDecreasePrice = () => {
    return this.price > 1;
  };

  buyMaterial = () => {
    if (!this.canBuyMaterial()) {
      return;
    }
    this.materialCost += Math.floor(Math.random() * 20 + 10);
    this.materialCostLastUpdated = Date.now();

    this.material += 10000;
    this.money -= this.materialCost;
  };

  buyAutoBuyer = () => {
    if (!this.canBuyAutoBuyer()) {
      return;
    }
    this.money -= this.autoBuyerCost;
    this.hasAutoBuyer = true;
    this.isAutoBuyerActive = true;
  };

  buyAutoGenerator = type => {
    if (!this.canBuyAutoGenerator(type)) {
      return;
    }
    switch (type) {
      case "ERRAND_BOY":
        this.autoGenerators.errandBoy++;
        this.money -= this.autoGenerators.errandBoyCost;
        this.autoGenerators.errandBoyCost += Math.floor(
          (this.autoGenerators.errandBoyCost / 100) * 10
        );
        return; 
      case "FOREMAN":
        this.autoGenerators.foreman++;
        this.money -= this.autoGenerators.foremanCost;
        this.autoGenerators.foremanCost += Math.floor(
          (this.autoGenerators.foremanCost / 100) * 10
        );
        return;
      case "MASTER":
        this.autoGenerators.master++;
        this.money -= this.autoGenerators.masterCost;
        this.autoGenerators.masterCost += Math.floor(
          (this.autoGenerators.masterCost / 100) * 10
        );
        return;
      default:
        return false;
    }
  };

  increasePrice = () => {
    this.price += 1;
  };

  decreasePrice = () => {
    if (this.price === 1) {
      return;
    }
    this.price -= 1;
  };
}

export default Game;

import React from "react";
import "./App.css";
import Game from "./game";
import Cookie from "./assets/images/cookie.png";

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.game = new Game();
  }

  componentDidMount() {
    setInterval(() => {
      this.game.update();
      this.setState({});
    }, 100);
  }

  update = () => {
    this.game.update();
  };

  render() {
    return (
      <div className="App">
        <header className="Apphead">Cookie Clicker Game</header>

        <div style={{ marginBottom: "20px" }}>
          Toplam Kurabiye: {this.game.manufacturedKurabiye} <br />
          
          <img
            src={Cookie}
            onClick={() => this.game.makeKurabiye()}
            disabled={!this.game.canMakeKurabiye()}
            height={"100px"}
            width={"100px"}
            className="cookie-button"
            draggable={false}
            alt="cookie"
          >
          </img>
          {/* <button
            className="button-yogur"
            style={{ marginTop: "10px" }}
            disabled={!this.game.canMakeKurabiye()}
            onClick={() => this.game.makeKurabiye()}
          >
            Kurabiye Pisir!
          </button> */}
        </div>
        <div>
          <div>İşletme</div>
          <hr />
          <div>
            <table>
              <tr>
                <td style={{ width: "150px" }}>Kasadaki para:</td>
                <td>{this.game.money}₺</td>
              </tr>
              <tr>
                <td>Stoktaki adet:</td>
                <td>{this.game.currentKurabiye}</td>
              </tr>
              <tr>
                <td>Fiyat:</td>
                <td>
                  {this.game.price}₺
                  <button
                    disabled={!this.game.canDecreasePrice()}
                    style={{ marginLeft: "20px" }}
                    onClick={this.game.decreasePrice}
                  >
                    -
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={this.game.increasePrice}
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td>Halkın talebi:</td>
                <td>%{this.game.demandRate}</td>
              </tr>
            </table>
          </div>
          <div style={{ marginTop: "16px" }}>
            <div>Üretim</div>
            <hr />
            <table>
              <tr>
                <td style={{ width: "150px" }}>Kurabiye / dakika:</td>
                <td>{this.game.lastManufacturedRate}</td>
              </tr>
              <tr>
                <td>Malzeme:</td>
                <td>
                  {this.game.material} gr
                  <button
                    style={{ marginLeft: "10px" }}
                    disabled={!this.game.canBuyMaterial()}
                    onClick={this.game.buyMaterial}
                  >
                    Satin Al! ({this.game.materialCost}₺)
                  </button>
                </td>
              </tr>
              <tr>
                <td>Satınalma müdürü:</td>
                <td>
                  {this.game.hasAutoBuyer ? (
                    <React.Fragment>
                      {this.game.isAutoBuyerActive ? "Aktif" : "Durdu"}
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={
                          this.game.isAutoBuyerActive
                            ? this.game.stopAutoBuyer
                            : this.game.startAutoBuyer
                        }
                      >
                        {this.game.isAutoBuyerActive ? "Durdur" : "Devam et"}
                      </button>
                    </React.Fragment>
                  ) : (
                    <span>
                      Yok
                      {this.game.didUnlockAutoBuyer() && (
                        <button
                          style={{ marginLeft: "10px" }}
                          disabled={!this.game.canBuyAutoBuyer()}
                          onClick={this.game.buyAutoBuyer}
                        >
                          Satin Al! ({this.game.autoBuyerCost}₺)
                        </button>
                      )}
                    </span>
                  )}
                </td>
              </tr>
            </table>
            <div style={{ marginTop: "16px" }}>
              <div>Çalışan:</div>
              <hr />
              <table>
                <tr>
                  <td>Çırak:</td>
                  <td style={{ width: "50px", textAlign: "center" }}>
                    {this.game.autoGenerators.errandBoy}
                  </td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      disabled={!this.game.canBuyAutoGenerator("ERRAND_BOY")}
                      onClick={() => this.game.buyAutoGenerator("ERRAND_BOY")}
                    >
                      Satın Al! ({this.game.autoGenerators.errandBoyCost}₺)
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Kalfa:</td>
                  <td style={{ width: "50px", textAlign: "center" }}>
                    {this.game.autoGenerators.foreman}
                  </td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      disabled={!this.game.canBuyAutoGenerator("FOREMAN")}
                      onClick={() => this.game.buyAutoGenerator("FOREMAN")}
                    >
                      Satın Al! ({this.game.autoGenerators.foremanCost}₺)
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Usta:</td>
                  <td style={{ width: "50px", textAlign: "center" }}>
                    {this.game.autoGenerators.master}
                  </td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      disabled={!this.game.canBuyAutoGenerator("MASTER")}
                      onClick={() => this.game.buyAutoGenerator("MASTER")}
                    >
                      Satın Al! ({this.game.autoGenerators.masterCost}₺)
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;



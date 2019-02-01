import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import './sass/app-style.scss';
import * as moment from 'moment';
import 'moment-precise-range-plugin/moment-precise-range';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataInicio: '',
      dataFim: '',
      diferenca: 'Aguardando...',
      diferencaDias: 'Aguardando...'
    };
    
    this.calculaDiferenca = this.calculaDiferenca.bind(this)
  }

  setCampo(nomeCampo, event) {
    this.setState({[nomeCampo]: event.target.value});
  }

  calculaDiferenca(event) {
    event.preventDefault();
    let dataInicio = this.state.dataInicio;
    let dataFim = this.state.dataFim;
    let diferenca = moment(dataInicio, "DD/MM/YYYY").preciseDiff(moment(dataFim, "DD/MM/YYYY"), true);
    let diferencaDias = moment(dataFim, "DD/MM/YYYY").diff(moment(dataInicio, "DD/MM/YYYY"), "days");

    let diferencaToString = this.getStringDiferenca(diferenca);

    this.setState({diferenca: diferencaToString});
    this.setState({diferencaDias: diferencaDias + " dia(s)"});
  }

  getStringDiferenca(diferenca) {
    return diferenca.years + " ano(s), " +
          diferenca.months + " mes(es), " +
          diferenca.days + " dia(s), " +
          diferenca.hours + " hora(s), " +
          diferenca.minutes + " minuto(s), " +
          diferenca.seconds + " segundo(s)";

  }

  render() {
    return (
      <main className="container">
        <div className="columns">
          <div className="column is-centered">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">
                  Cálculo diferença entre datas
                </p>
              </div>
              <div className="card-content">
                <div className="content">
                  <form>
                    <div className="field">
                      <label className="label" htmlFor="dataInicio">Data de início</label>
                      <div className="control">
                        <InputMask
                          maskChar={null}
                          className="input"
                          id="dataInicio"
                          value={this.state.dataInicio} 
                          onChange={this.setCampo.bind(this, 'dataInicio')} mask="99/99/9999"/>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="dataFim">Data fim</label>
                      <div className="control">
                      <InputMask
                          maskChar={null}
                          className="input"
                          id="dataFim"
                          value={this.state.dataFim} 
                          onChange={this.setCampo.bind(this, 'dataFim')} mask="99/99/9999"/>
                      </div>
                    </div>
                    
                    <button className="button is-info" onClick={this.calculaDiferenca}>Calcular diferença</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div>
              <p><strong>Diferença: </strong>{this.state.diferenca}</p>
              <p><strong>Diferença(em dias): </strong>{this.state.diferencaDias}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;

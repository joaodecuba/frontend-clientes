import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CriarCliente extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            cliente: {
                nome: "",
                salario: "",
                dataNascimento: "",
                ativo: "true"
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/clientes" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Usuário</legend>
                        <div className="cliente-insert">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.cliente.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="cliente-insert">
                            <label htmlFor="salario">Salário </label>
                            <br />
                            <input
                                type="text"
                                id="salario"
                                name="salario"
                                placeholder="Salário"
                                required
                                value={this.state.cliente.salario}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="cliente-insert">
                            <label htmlFor="dataNascimento">Data de Nascimento </label>
                            <br />
                            <input
                                type="date"
                                id="dataNascimento"
                                name="dataNascimento"
                                placeholder="Data de Nascimento"
                                required
                                value={this.state.cliente.dataNascimento}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <div className="cliente-insert">
                            <label>
                                <input
                                    type="radio"
                                    name="ativo"
                                    value="true"
                                    checked={this.state.cliente.ativo === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Ativo
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="ativo"
                                    checked={this.state.cliente.ativo === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                        </label>
                        </div>
 
 
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            cliente: { ...prevState.cliente, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch("https://backend-cliente-jpl.herokuapp.com/cliente", {
            method: "post",
            body: JSON.stringify(this.state.cliente),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default CriarCliente;
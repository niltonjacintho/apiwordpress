import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Interface } from 'readline';

interface TipoUsuario {
  id: number;
  name: string;
  email: string;
  slug: string;
}


@Injectable()
export class AppService {
  url = 'https://rb1-condominio.com.br/extranet-teste/wp-json/wp/v2/users';
  username = 'admin';
  password = '1hro 8TLx UR6y iWyi bT5E mFMW';

  token = `${this.username}:${this.password}`;
  encodedToken = Buffer.from(this.token).toString('base64');
  dadosLocais: TipoUsuario[] = [];
  constructor(
    private http: HttpService, //axios: Axios,
  ) {
    this.dadosLocais = []
    this.updateDadosLocais(false);
  }

  getHello(): string {
    return 'Hello World!dsfsdfsd';
  }

  async updateDadosLocais(force: boolean): Promise<string> {
    if (force) {
      this.dadosLocais = [];
    }
    console.log('updateDadosLocais', this.dadosLocais.length);
    while (this.dadosLocais.length == 0) {
      await this.atualizaDadosLocaisUsuarios();
    }
    return Promise.resolve('done');
  }

  async atualizaDadosLocaisUsuarios() {
    console.log('entrou em uodater')
    const config = {
      method: 'get',
      url: this.url,
      headers: { Authorization: 'Basic ' + this.encodedToken },
    };

    var data = [];
    const d = await axios(config)
      .then(function (response) {
        response.data.forEach(element => {
          var t: TipoUsuario = {
            id: element.id,
            name: element.name,
            slug: element.slug,
            email: '',
          };
          data.push(t);
        });
      })
      .catch(function (error) {
        // this.dadosLocais = [];
        console.log(error);
      });
    this.dadosLocais = data;
  }

  excluirDadosLocaisUsuarios(idUsuario: number) {
    var tempLocal: TipoUsuario[] = [];
    for (let id = 0; id < this.dadosLocais.length; id++) {
      const element = this.dadosLocais[id];
      if (element.id != idUsuario) {
        tempLocal.push(element);
      };
    }
    this.dadosLocais = tempLocal
  }



  getUsuarios(): Promise<any> {
    return Promise.resolve(JSON.stringify(this.dadosLocais));
  }

  async removerUsuarios(id: number): Promise<any> {
    let result;
    await fetch(`${this.url}/${id}?reassign=false&force=true`, {
      method: 'DELETE',
      headers: { Authorization: 'Basic ' + this.encodedToken },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.json}`);
        }
        result = response;
        this.excluirDadosLocaisUsuarios(id);
      })
      .catch((error) => {
        console.error('Error:', error);
        result = error;
      });
    return result;
  }
}

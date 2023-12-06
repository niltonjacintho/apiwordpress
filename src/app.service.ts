import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JsonDB, Config } from 'node-json-db';

interface TipoUsuario {
  id: number;
  name: string;
  email: string;
  slug: string;
}


@Injectable()
export class AppService {
  db = new JsonDB(new Config("./diogodb/data", true, false, '/'));
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
    this.updateDadosLocais();
  }

  async getHello(): Promise<string> {
    await this.db.push("/test1", "super test");

    // When pushing new data for a DataPath that doesn't exist, it automatically creates the hierarchy
    await this.db.push("/test2/my/test", 5);

    // You can also push objects directly
    await this.db.push("/test3", { test: "test", json: { test: ["test"] } });

    // If you don't want to override the data but to merge them
    // The merge is recursive and works with Object and Array.
    await this.db.push("/test3", {
      new: "cool",
      json: {
        important: 5
      }
    }, false);
    console.log('vai salvar');

    await this.db.save(true).then((result) => {
      console.log(result);
    });
    return 'Hello World!dsfsdfsd';
  }

  async updateDadosLocais(): Promise<string> {
    while (this.dadosLocais.length == 0) {
      await this.atualizaDadosLocaisUsuarios();
    }
    return Promise.resolve('done');
  }

  async atualizaDadosLocaisUsuarios() {
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

  removerUsuarios(id: number): Promise<any> {
    let result;
    fetch(`${this.url}/${id}?reassign=false&force=true`, {
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

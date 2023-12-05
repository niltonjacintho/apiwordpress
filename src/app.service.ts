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

  constructor(
    private http: HttpService, //axios: Axios,
  ) { }

  getHello(): string {
    return 'Hello World!dsfsdfsd';
  }

  getUsuarios(): Promise<any> {
    const config = {
      method: 'get',
      url: this.url,
      headers: { Authorization: 'Basic ' + this.encodedToken },
    };

    return axios(config)
      .then(function (response) {
        let result: TipoUsuario[] = [];
        response.data.forEach(element => {
          var t: TipoUsuario = {
            id: element.id,
            name: element.name,
            slug: element.slug,
            email: '',
          };
          console.log('t', t)
          result.push(t);
        });
        console.log(result)
        return JSON.stringify(result);
      })
      .catch(function (error) {
        console.log(error);
      });
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
        console.log('Post deleted successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        result = error;
      });
    return result;
  }
}

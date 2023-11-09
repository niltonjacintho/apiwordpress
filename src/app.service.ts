import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  url = 'https://rb1-condominio.com.br/extranet-teste/wp-json/wp/v2/users';
  username = 'admin';
  password = '1hro 8TLx UR6y iWyi bT5E mFMW';

  token = `${this.username}:${this.password}`;
  encodedToken = Buffer.from(this.token).toString('base64');

  constructor(
    private http: HttpService, //axios: Axios,
  ) {}

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
        return JSON.stringify(response.data);
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

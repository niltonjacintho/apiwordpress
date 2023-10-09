import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getUsuarios() {
    const url =
      'https://rb1-condominio.com.br/extranet-teste/wp-json/wp/v2/users';
    return this.http
      .get(url)
      .pipe(
        map((res) => res.data),
        //   map((bpi) => bpi?.USD),
        //   map((usd) => {
        //     return usd?.rate;
        //   }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
    // const x = fetch(url, {
    //   headers: new Headers({
    //     //   'access-control-allow-credentials':' true',
    //     'access-control-allow-headers': 'Authorization, X-WP-Nonce, Content-Disposition, Content-MD5, Content-Type',
    //     //   'access-control-allow-methods':'GET',
    //     'access-control-allow-origin': '*',
    //     //   'access-control-expose-headers':'X-WP-Total, X-WP-TotalPages, Link, Link',
    //     //   'allow': 'GET',
    //     //   'cf-cache-status':'DYNAMIC',
    //     //   'cf-ray': '80ce3203a7e9a796-EZE',
    //     //   'connection': 'keep-alive',
    //     //   'content-type': 'application/json; charset=UTF-8',
    //     //   'date': 'Tue, 26 Sep 2023 20:18:19 GMT',
    //     //   'server': 'cloudflare',
    //     //   'transfer-encoding': 'chunked',
    //     //   'vary': 'Accept-Encoding',
    //     //   'x-content-type-options':'nosniff',
    //     //   'x-litespeed-cache-control':'no-cache',
    //     //   'x-litespeed-tag':'6dc_HTTP.200',
    //     //   'x-robots-tag':'noindex',
    //     //   'x-wp-total':'1',
    //     //   'x-wp-totalpages':'1'
    //   })
    // });
  }
}

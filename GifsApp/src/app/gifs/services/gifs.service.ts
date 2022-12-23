import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'OW4B2QKmttRKLCJUPfTUtggHyiuf0Np9';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  constructor(private http: HttpClient) { 
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    if(localStorage.getItem('resultados')){
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  }

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query:string){
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    const params = new HttpParams()
                  .set('api_key', this.apiKey)
                  .set('limit', '100')
                  .set('q', query);
    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params} ).subscribe((resp) => {
      this.resultados=resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })
  }
}

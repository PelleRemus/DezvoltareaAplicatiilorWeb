import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article';

@Injectable()
export class ArticlesService {

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    getArticles(index: number) {
        return this.http.get<Article[]>(this.baseUrl + `api/Articles/GetArticles/${index}`);
    }

    getArticle(articleId: string) {
        return this.http.get<Article>(this.baseUrl + `api/Articles/GetArticle/${articleId}`);
    }
    
    postArticle(article: Article) {
        return this.http.post<any>(this.baseUrl + `api/Articles/PostArticle`, article);
    }

    incrementViews(article: Article) {
        return this.http.put<any>(this.baseUrl + `api/Articles/IncrementViews/${article.id}`, article);
    }

    putArticle(article: Article) {
        return this.http.put<any>(this.baseUrl + `api/Articles/PutArticle`, article);
    }

    deleteArticle(articleId: string) {
        return this.http.delete<any>(this.baseUrl + `api/Articles/DeleteArticle/${articleId}`);
    }
}

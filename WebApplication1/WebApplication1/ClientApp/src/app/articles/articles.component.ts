import { Component, AfterContentChecked } from '@angular/core';
import { Article, difficulties, languages } from '../models/article';
import { ArticlesService } from '../services/articles.service';
import { HttpRequestInterceptor } from '../services/http-request-interceptor';
import { Token } from '../shared/security.models';

@Component({
    selector: 'articles-component',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements AfterContentChecked {
    public articles: Article[];
    public sortedArticles: Article[];
    public token: Token;
    public Types = [
        ['Order by date(newest)', 'Order by date(oldest)'],
        ['Difficulty: Any', 'Difficulty: Easy', 'Difficulty: Medium', 'Difficulty: Hard'],
        ['Language: Any', 'Language: C#', 'Language: HTML CSS', 'Language: JS TS']
    ];
    selectedTypes = ['Order by date(newest)', 'Difficulty: Any', 'Language: Any'];

    constructor(private articlesService: ArticlesService,
                private httpRequestInterceptor: HttpRequestInterceptor) {
        this.token = httpRequestInterceptor.getToken();
    }

    ngAfterContentChecked() {
        if (!this.articles)
            this.articlesService.getArticles(0).subscribe(res => {
                this.articles = res;
            });
        else {
            this.orderByDate();
            this.selectByDifficulty();
            this.selectByLanguage();
        }
    }

    changeType(i, value) {
        this.selectedTypes[i] = value;
    }

    orderByDate() {
        this.sortedArticles = this.articles;
        if (this.selectedTypes[0] === 'Order by date(newest)')
            this.sortedArticles.sort(this.compareDatesAsc);
        if (this.selectedTypes[0] === 'Order by date(oldest)')
            this.sortedArticles.sort(this.compareDatesDesc);
    }

    selectByDifficulty() {
        if (this.selectedTypes[1] === 'Difficulty: Easy')
            this.sortedArticles = this.sortedArticles.filter(article => article.difficulty === difficulties.Easy);
        if (this.selectedTypes[1] === 'Difficulty: Medium')
            this.sortedArticles = this.sortedArticles.filter(article => article.difficulty === difficulties.Medium);
        if (this.selectedTypes[1] === 'Difficulty: Hard')
            this.sortedArticles = this.sortedArticles.filter(article => article.difficulty === difficulties.Hard);
    }

    selectByLanguage() {
        if (this.selectedTypes[2] === 'Language: C#')
            this.sortedArticles = this.sortedArticles.filter(article => article.language === languages.CSharp);
        if (this.selectedTypes[2] === 'Language: HTML CSS')
            this.sortedArticles = this.sortedArticles.filter(article => article.language === languages.HTML_CSS);
        if (this.selectedTypes[2] === 'Language: JS TS')
            this.sortedArticles = this.sortedArticles.filter(article => article.language === languages.JS_TS);
    }

    compareDatesAsc(article1: Article, article2: Article) {
        if (article1.date > article2.date)
            return 1;
        if (article1.date < article2.date)
            return -1;
        return 0;
    }

    compareDatesDesc(article1: Article, article2: Article) {
        if (article1.date > article2.date)
            return -1;
        if (article1.date < article2.date)
            return 1;
        return 0;
    }
}

import { Component } from '@angular/core';
import { Article } from '../models/article';
import { ArticlesService } from '../services/articles.service';
import { Router } from '@angular/router';

@Component({
    selector: 'add-article-component',
    templateUrl: './add-article.component.html',
    styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent {
    article = new Article();
    titleNotValid: boolean;
    contentNotValid: boolean;
    difficultyNotValid: boolean;
    languageNotValid: boolean;

    constructor(private articlesService: ArticlesService,
                private router: Router) { }

    postArticle() {
        if (!this.article.title)
            this.titleNotValid = true;
        else
            this.titleNotValid = false;
        if (!this.article.content)
            this.contentNotValid = true;
        else
            this.contentNotValid = false;
        if (!this.article.difficulty)
            this.difficultyNotValid = true;
        else
            this.difficultyNotValid = false;
        if (!this.article.language)
            this.languageNotValid = true;
        else
            this.languageNotValid = false;

        if (!this.titleNotValid && !this.contentNotValid && !this.difficultyNotValid && !this.languageNotValid) {
            this.article.date = new Date();
            this.article.views = 0;
            this.articlesService.postArticle(this.article).subscribe(res => {
                this.router.navigate(['/articles']);
            });
        }
    }
}

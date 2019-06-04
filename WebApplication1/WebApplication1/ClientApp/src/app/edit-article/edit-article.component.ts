import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticlesService } from '../services/articles.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'edit-article-component',
    templateUrl: './edit-article.component.html',
    styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
    articleId: string;
    article: Article;
    titleNotValid: boolean;
    contentNotValid: boolean;

    constructor(private articlesService: ArticlesService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
        this.articleId = this.route.snapshot.params['articleId'];
        this.articlesService.getArticle(this.articleId).subscribe(res => {
            this.article = res;
        });
    }

    editArticle() {
        if (!this.article.title)
            this.titleNotValid = true;
        else
            this.titleNotValid = false;
        if (!this.article.content)
            this.contentNotValid = true;
        else
            this.contentNotValid = false;

        if (!this.titleNotValid && !this.contentNotValid) {
            this.articlesService.putArticle(this.article).subscribe(res => {
                this.router.navigate(['/articles']);
            });
        }
    }
}

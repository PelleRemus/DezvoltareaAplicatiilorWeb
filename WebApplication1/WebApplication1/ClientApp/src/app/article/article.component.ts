import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticlesService } from '../services/articles.service';
import { CommentsService } from '../services/comments.service';

import { Article } from '../models/article';
import { Comment } from '../models/comment';
import { Token } from '../shared/security.models';

@Component({
    selector: 'article-component',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    articleId: string;
    article: Article;
    comments: Comment[];
    comment = new Comment();
    token: Token;
    sum = 0;
    nr = 0;
    wantsToAddComment: boolean;
    rateNotValid: boolean;
    nameNotValid: boolean;
    contentNotValid: boolean;

    constructor(
        private articlesService: ArticlesService,
        private commentsService: CommentsService,
        private route: ActivatedRoute,
        private router: Router) {

        this.token = JSON.parse(localStorage.getItem("token") as string);
    }

    ngOnInit() {
        this.articleId = this.route.snapshot.params['articleId'];
        this.articlesService.getArticle(this.articleId).subscribe(res => {
            this.article = res;
            this.articlesService.incrementViews(this.article).subscribe(res => { });

            this.commentsService.getComments(this.articleId).subscribe(result => {
                this.comments = result;
                this.getRating();
            });
        });
    }

    getRating() {
        this.sum = 0;
        this.nr = 0;
        for (let comm of this.comments) {
            if (comm.rate) {
                this.sum += comm.rate;
                this.nr++;
            }
        }
        this.article.rating = this.sum / this.nr;
    }

    deleteArticle() {
        for (let comm of this.comments) {
            this.commentsService.deleteComment(comm.id).subscribe(res => { });
        }
        this.articlesService.deleteArticle(this.articleId).subscribe(res => {
            this.router.navigate(['/']);
        });
    }

    commentFormToggler() {
        this.wantsToAddComment = !this.wantsToAddComment;
    }

    addComment() {
        if (!this.comment.user)
            this.nameNotValid = true;
        else
            this.nameNotValid = false;
        if (this.comment.rate < 1 || this.comment.rate > 10)
            this.rateNotValid = true;
        else
            this.rateNotValid = false;
        if (!this.comment.content)
            this.contentNotValid = true;
        else
            this.contentNotValid = false;

        if (!this.nameNotValid && !this.rateNotValid && !this.contentNotValid) {
            this.comment.articleId = this.articleId;
            this.comment.date = new Date();

            this.commentsService.postComment(this.comment).subscribe(res => { });
            this.comments.push(this.comment);
            this.comment = new Comment();
            this.wantsToAddComment = false;
            this.getRating();
        }
    }

    deleteComment(comment: Comment) {
        this.commentsService.deleteComment(comment.id).subscribe(res => {
            this.comments.splice(this.comments.indexOf(comment), 1);
            this.getRating();
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticlesService } from '../services/articles.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    popular: Article[];
    bestRated: Article[];
    debated: Article[];
    index = [0, 0, 0];
    width = 0;

    constructor(private articlesService: ArticlesService) { }

    ngOnInit() {
        this.articlesService.getArticles(1).subscribe(res => {
            this.popular = res;
        });
        this.articlesService.getArticles(2).subscribe(res => {
            this.bestRated = res;
        });
        this.articlesService.getArticles(3).subscribe(res => {
            this.debated = res;
        });
    }

    prev(i: number) {
        this.resize();
        this.index[i]--;
    }

    next(i: number) {
        this.resize();
        this.index[i]++;
    }

    resize() {
        let sliders = document.querySelectorAll('.slider');
        let slide = sliders[0].querySelector('.slide-container');
        this.width = slide.getBoundingClientRect().width;
    }
}

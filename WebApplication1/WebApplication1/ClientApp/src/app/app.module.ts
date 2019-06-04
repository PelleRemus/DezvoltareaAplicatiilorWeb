import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { LogInComponent } from './log-in/log-in.component';

import { ArticlesService } from './services/articles.service';
import { CommentsService } from './services/comments.service';
import { HttpRequestInterceptor } from './services/http-request-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ArticlesComponent,
    ArticleComponent,
    AddArticleComponent,
    EditArticleComponent,
    LogInComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'articles', component: ArticlesComponent },
      { path: 'article/:articleId', component: ArticleComponent },
      { path: 'add-article', component: AddArticleComponent },
      { path: 'edit-article/:articleId', component: EditArticleComponent },
      { path: 'log-in', component: LogInComponent }
    ])
  ],
  exports: [
    AngularMaterialModule
  ],
  providers: [
      ArticlesService,
      CommentsService,
      HttpRequestInterceptor,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRequestInterceptor,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

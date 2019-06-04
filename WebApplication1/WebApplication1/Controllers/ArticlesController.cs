using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]/[action]")]
    public class ArticlesController : ControllerBase
    {
        private readonly WebApplication1Context context;

        public ArticlesController(WebApplication1Context _context)
        {
            context = _context;
        }

        [AllowAnonymous]
        [HttpGet("{index}")]
        public IEnumerable<Article> GetArticles([FromRoute]int index)
        {
            List<Article> articlesList = context.Articles.ToList();
            switch (index)
            {
                case 0:
                    break;
                case 1:
                    articlesList.Sort(delegate (Article a, Article b)
                    {
                        return b.Views.CompareTo(a.Views);
                    });
                    break;
                case 2:
                    articlesList.Sort(delegate (Article a, Article b)
                    {
                        float rating1 = GetRating(a.ID);
                        float rating2 = GetRating(b.ID);
                        return rating2.CompareTo(rating1);
                    });
                    break;
                case 3:
                    articlesList.Sort(delegate (Article a, Article b)
                    {
                        CommentsController commentsController = new CommentsController(context);
                        int length1 = commentsController.GetComments(a.ID).ToArray().Length;
                        int length2 = commentsController.GetComments(b.ID).ToArray().Length;
                        return length2.CompareTo(length1);
                    });
                    break;
            }
            return articlesList;
        }
        
        [AllowAnonymous]
        [HttpGet("{articleId}")]
        public Article GetArticle([FromRoute]Guid articleId)
        {
            return context.Articles.FirstOrDefault(x => x.ID == articleId);
        }
        
        [AllowAnonymous]
        [HttpPut]
        public void PutArticle([FromBody]Article article)
        {
            Article dbArticle = context.Articles.FirstOrDefault(x => x.ID == article.ID);
            dbArticle.Clone(article);
            context.SaveChanges();
        }
        
        [HttpPost]
        public void PostArticle([FromBody]Article article)
        {
            article.ID = Guid.NewGuid();
            context.Articles.Add(article);
            context.SaveChanges();
        }
        
        [HttpDelete("{articleId}")]
        public void DeleteArticle([FromRoute]Guid articleId)
        {
            context.Articles.Remove(context.Articles.FirstOrDefault(x => x.ID == articleId));
            context.SaveChanges();
        }

        public float GetRating(Guid articleId)
        {
            CommentsController commentsController = new CommentsController(context);
            Comment[] comments = commentsController.GetComments(articleId).ToArray();
            int sum = 0, nr = 0;
            foreach (Comment comment in comments)
            {
                if (comment.Rate != null)
                {
                    sum += (int)comment.Rate;
                    nr++;
                }
            }
            if (nr == 0)
                return 0;
            return sum / nr;
        }
    }
}

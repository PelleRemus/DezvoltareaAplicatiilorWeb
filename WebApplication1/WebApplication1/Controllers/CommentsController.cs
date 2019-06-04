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
    public class CommentsController : ControllerBase
    {
        private readonly WebApplication1Context context;

        public CommentsController(WebApplication1Context _context)
        {
            context = _context;
        }
        
        [AllowAnonymous]
        [HttpGet("{articleId}")]
        public IEnumerable<Comment> GetComments([FromRoute]Guid articleId)
        {
            List<Comment> comments = context.Comments.Where(x => x.ArticleID == articleId).ToList();
            comments.Sort(delegate (Comment a, Comment b)
            {
                return b.Date.CompareTo(a.Date);
            });
            return comments;
        }

        [HttpPut]
        public void PutComment([FromBody]Comment comment)
        {
            Comment dbComment = context.Comments.FirstOrDefault(x => x.Id == comment.Id);
            dbComment.Clone(comment);
            context.SaveChanges();
        }
        
        [AllowAnonymous]
        [HttpPost]
        public void PostComment([FromBody]Comment comment)
        {
            comment.Id = Guid.NewGuid();
            context.Comments.Add(comment);
            context.SaveChanges();
        }
        
        [HttpDelete("{commentId}")]
        public void DeleteComment([FromRoute]Guid commentId)
        {
            context.Comments.Remove(context.Comments.FirstOrDefault(x => x.Id == commentId));
            context.SaveChanges();
        }
    }
}
